import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { isConfigured, listSnapshots, archiveboxBaseUrl } from "@/lib/archivebox";

export const dynamic = "force-dynamic";

const COLLECTION = process.env.ARCHIVEBOX_TAG || "col:recombo";

/** GET: snapshots do ArchiveBox + decisões de curadoria já salvas. */
export async function GET() {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "ARCHIVEBOX_TOKEN não configurado no servidor." },
      { status: 503 },
    );
  }

  try {
    const snapshots = await listSnapshots(COLLECTION);
    const ids = snapshots.map((s) => s.id);

    // Se a migração ainda não rodou, a mesa abre em modo leitura (tudo como inbox).
    let saved: Awaited<ReturnType<typeof prisma.capture.findMany>> = [];
    let warning: string | null = null;
    try {
      saved = await prisma.capture.findMany({ where: { snapshotId: { in: ids } } });
    } catch {
      warning = "Tabela de capturas ausente: rode `npx prisma migrate dev --name add_captures`.";
    }
    const byId = new Map(saved.map((c) => [c.snapshotId, c]));

    const items = snapshots.map((s) => {
      const c = byId.get(s.id);
      return {
        snapshotId: s.id,
        url: s.url,
        title: c?.title || s.title || "",
        archivedTitle: s.title,
        capturedAt: s.bookmarked_at || s.created_at,
        size: s.archive_size ?? 0,
        tags: s.tags ?? [],
        note: c?.note ?? "",
        status: c?.status ?? "inbox",
        accessLevel: c?.accessLevel ?? "restricted",
        license: c?.license ?? "LUCR",
        artworkId: c?.artworkId ?? null,
      };
    });

    return NextResponse.json({
      collection: COLLECTION,
      archivebox: archiveboxBaseUrl(),
      warning,
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
    return NextResponse.json({ error: `Falha ao ler o ArchiveBox: ${message}` }, { status: 502 });
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
