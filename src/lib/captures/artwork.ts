import type { Capture } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

/**
 * Uma captura publicada vira uma obra do acervo (tipo `website`).
 *
 * Campos preenchidos a partir da captura:
 *  - título       → título curado, ou título da página, ou URL
 *  - ano          → ano da captura
 *  - descrição    → nota de curadoria + proveniência (URL e data)
 *  - tags         → tags da captura + "captura"
 *  - licença      → licença da captura (LUCR por padrão)
 *  - acesso/status→ público / publicado
 *  - arquivo      → link clicável para a fonte original
 */
function buildDescription(capture: Capture, title: string): string {
  const when = capture.capturedAt
    ? capture.capturedAt.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "data não registrada";

  const provenance = `Captura de ${capture.url} em ${when}.`;
  const note = (capture.note || "").trim();

  return note ? `${note}\n\n${provenance}` : provenance;
}

function buildTags(capture: Capture): string[] {
  const tags = new Set<string>(["captura"]);
  for (const tag of capture.tags ?? []) {
    if (tag.startsWith("col:")) continue;
    tags.add(tag);
  }
  return [...tags];
}

async function uniqueSlug(base: string, snapshotId: string): Promise<string> {
  const candidate = slugify(base) || "captura";
  const exists = await prisma.artwork.findUnique({ where: { slug: candidate } });
  if (!exists) return candidate;

  const suffixed = `${candidate}-${snapshotId.slice(0, 6).toLowerCase()}`;
  const clash = await prisma.artwork.findUnique({ where: { slug: suffixed } });
  return clash ? `${suffixed}-${Date.now().toString(36)}` : suffixed;
}

/** Cria ou atualiza a obra correspondente à captura. Idempotente. */
export async function syncArtworkForCapture(capture: Capture): Promise<void> {
  const published = capture.status === "published";

  // Captura que deixou de ser publicada: tira a obra do ar (sem apagar).
  if (!published) {
    if (capture.artworkId) {
      await prisma.artwork.update({
        where: { id: capture.artworkId },
        data: { status: "archived" },
      });
    }
    return;
  }

  const title = (capture.title || "").trim() || capture.url;
  const year = capture.capturedAt ? capture.capturedAt.getFullYear() : null;
  const description = buildDescription(capture, title);
  const tags = buildTags(capture);

  if (capture.artworkId) {
    await prisma.artwork.update({
      where: { id: capture.artworkId },
      data: {
        title,
        year,
        description,
        tags,
        license: capture.license,
        accessLevel: "public",
        status: "published",
      },
    });
    return;
  }

  const slug = await uniqueSlug(title, capture.snapshotId);

  const artwork = await prisma.artwork.create({
    data: {
      slug,
      title,
      type: "website",
      medium: "Página web preservada (ArchiveBox)",
      description,
      year,
      tags,
      license: capture.license,
      accessLevel: "public",
      status: "published",
      customFields: {
        origem: "archivebox",
        snapshotId: capture.snapshotId,
        fonteOriginal: capture.url,
        capturadoEm: capture.capturedAt?.toISOString() ?? null,
      },
      files: {
        create: [
          {
            url: capture.url,
            filename: "Fonte original",
            type: "documentation",
            mimeType: "text/html",
            size: 0,
          },
        ],
      },
    },
  });

  await prisma.capture.update({
    where: { snapshotId: capture.snapshotId },
    data: { artworkId: artwork.id },
  });
}
