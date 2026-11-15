import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { syncArtworkForCapture } from "@/lib/captures/artwork";

export const dynamic = "force-dynamic";

/**
 * Sincronização de capturas — chamada por scripts/sync-captures.mjs.
 *
 * Autenticação: Bearer token definido em CAPTURE_SYNC_TOKEN (servidor).
 * Não toca em campos de curadoria (status, nota, acesso) de capturas existentes.
 */
const bodySchema = z.object({
  items: z
    .array(
      z.object({
        snapshotId: z.string().min(1),
        url: z.string().url(),
        title: z.string().max(500).optional().nullable(),
        capturedAt: z.string().optional().nullable(),
        tags: z.array(z.string()).optional(),
      }),
    )
    .min(1)
    .max(2000),
});

export async function POST(request: NextRequest) {
  const expected = process.env.CAPTURE_SYNC_TOKEN || "";
  if (!expected) {
    return NextResponse.json(
      { error: "CAPTURE_SYNC_TOKEN não configurado no servidor." },
      { status: 503 },
    );
  }

  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (token !== expected) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Payload inválido.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  let created = 0;
  let updated = 0;

  for (const item of parsed.data.items) {
    const capturedAt = item.capturedAt ? new Date(item.capturedAt) : null;

    const existing = await prisma.capture.findUnique({
      where: { snapshotId: item.snapshotId },
      select: { id: true },
    });

    if (existing) {
      await prisma.capture.update({
        where: { snapshotId: item.snapshotId },
        data: {
          url: item.url,
          title: item.title || null,
          capturedAt,
          tags: item.tags ?? [],
        },
      });
      updated += 1;
    } else {
      await prisma.capture.create({
        data: {
          snapshotId: item.snapshotId,
          url: item.url,
          title: item.title || null,
          capturedAt,
          tags: item.tags ?? [],
        },
      });
      created += 1;
    }
  }

  // Capturas já publicadas viram obras do acervo (idempotente).
  const pending = await prisma.capture.findMany({
    where: { status: "published", artworkId: null },
    take: 100,
  });
  for (const capture of pending) {
    await syncArtworkForCapture(capture);
  }

  return NextResponse.json({
    ok: true,
    created,
    updated,
    total: parsed.data.items.length,
    artworks: pending.length,
  });
}
