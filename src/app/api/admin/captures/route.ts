import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { archiveboxBaseUrl } from "@/lib/archivebox";

export const dynamic = "force-dynamic";

const COLLECTION = process.env.ARCHIVEBOX_TAG || "col:recombo";

/**
 * GET: capturas já sincronizadas no banco.
 *
 * O ArchiveBox vive na rede local do coletivo (192.168.x), inacessível a partir
 * do droplet. Por isso o servidor NÃO fala com ele: a sincronização é feita por
 * `scripts/sync-captures.mjs`, rodando na máquina que enxerga o ArchiveBox.
 */
export async function GET() {
  try {
    const rows = await prisma.capture.findMany({
      orderBy: [{ capturedAt: "desc" }, { createdAt: "desc" }],
      take: 500,
    });

    const items = rows.map((c) => ({
      snapshotId: c.snapshotId,
      url: c.url,
      title: c.title || "",
      archivedTitle: null,
      capturedAt: c.capturedAt?.toISOString() ?? null,
      size: 0,
      tags: c.tags,
      note: c.note ?? "",
      status: c.status,
      accessLevel: c.accessLevel,
      license: c.license,
      artworkId: c.artworkId,
    }));

    return NextResponse.json({
      source: "database",
      collection: COLLECTION,
      archivebox: archiveboxBaseUrl(),
      warning: items.length === 0 ? "Nenhuma captura sincronizada ainda." : null,
      stats: {
        total: items.length,
        inbox: items.filter((i) => i.status === "inbox").length,
        selected: items.filter((i) => i.status === "selected").length,
        published: items.filter((i) => i.status === "published").length,
        rejected: items.filter((i) => i.status === "rejected").length,
      },
      items,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "erro desconhecido";
    return NextResponse.json({ error: `Falha ao ler o banco: ${message}` }, { status: 500 });
  }
}

const itemSchema = z.object({
  snapshotId: z.string().min(1),
  url: z.string().url(),
  title: z.string().max(500).optional().nullable(),
  note: z.string().max(5000).optional().nullable(),
  capturedAt: z.string().optional().nullable(),
  status: z.enum(["inbox", "selected", "published", "rejected"]),
  accessLevel: z.enum(["public", "private", "restricted"]),
  license: z.string().max(120).default("LUCR"),
  tags: z.array(z.string()).optional(),
});

const bodySchema = z.object({ items: z.array(itemSchema).min(1).max(500) });

/** POST: grava as decisões de curadoria (upsert por snapshotId). */
export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  try {
    await prisma.$transaction(
      parsed.data.items.map((item) =>
        prisma.capture.upsert({
          where: { snapshotId: item.snapshotId },
          create: {
            snapshotId: item.snapshotId,
            url: item.url,
            title: item.title || null,
            note: item.note || null,
            capturedAt: item.capturedAt ? new Date(item.capturedAt) : null,
            status: item.status,
            accessLevel: item.accessLevel,
            license: item.license,
            tags: item.tags ?? [],
          },
          update: {
            title: item.title || null,
            note: item.note || null,
            status: item.status,
            accessLevel: item.accessLevel,
            license: item.license,
            tags: item.tags ?? [],
          },
        }),
      ),
    );

    return NextResponse.json({ saved: parsed.data.items.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "erro desconhecido";
    return NextResponse.json({ error: `Falha ao gravar: ${message}` }, { status: 500 });
  }
}
