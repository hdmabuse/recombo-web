import { prisma } from "@/lib/prisma";

/**
 * Camada de conteúdo: transforma o registro do banco num view-model de
 * apresentação. Nenhum componente de UI importa Prisma — trocar o layout
 * não exige tocar em dados.
 */
export type ArtworkView = {
  slug: string;
  title: string;
  year: number | null;
  description: string;
  type: string;
  duration: number | null;
  license: string;
  heroImage: string | null;
  files: { id: string; label: string; href: string }[];
  artists: { id: string; name: string; role: string | null }[];
  tags: string[];
  related: { id: string; slug: string; title: string; year: number | null }[];
};

/** Forma mínima aceita pelo mapper (estrutural, para testes sem banco). */
export type ArtworkRecord = {
  slug: string;
  title: string;
  year: number | null;
  description: string | null;
  type: string;
  duration: number | null;
  license: string;
  fileUrl: string | null;
  thumbnail: string | null;
  files: { id: string; filename: string; url: string }[];
  artists: { id: string; role: string | null; artist: { name: string } }[];
  tags: string[];
  related: { id: string; related: { slug: string; title: string; year: number | null } }[];
};

export function toArtworkView(record: ArtworkRecord): ArtworkView {
  return {
    slug: record.slug,
    title: record.title,
    year: record.year ?? null,
    description: record.description ?? "",
    type: record.type,
    duration: record.duration ?? null,
    license: record.license,
    heroImage: record.fileUrl || record.thumbnail || null,
    files: record.files.map((f) => ({ id: f.id, label: f.filename, href: f.url })),
    artists: record.artists.map((a) => ({ id: a.id, name: a.artist.name, role: a.role })),
    tags: record.tags ?? [],
    related: record.related.map((r) => ({
      id: r.id,
      slug: r.related.slug,
      title: r.related.title,
      year: r.related.year,
    })),
  };
}

const include = {
  artists: { include: { artist: true } },
  files: true,
  related: { include: { related: { select: { slug: true, title: true, year: true } } } },
} as const;

export async function getArtworkView(slug: string): Promise<ArtworkView | null> {
  const artwork = await prisma.artwork.findUnique({ where: { slug }, include });
  return artwork ? toArtworkView(artwork as unknown as ArtworkRecord) : null;
}

export async function getArtworkMeta(slug: string) {
  const artwork = await prisma.artwork.findUnique({
    where: { slug },
    select: { title: true, year: true, description: true, thumbnail: true },
  });

  if (!artwork) return null;

  return {
    title: artwork.title,
    year: artwork.year,
    description: artwork.description?.replace(/\s+/g, " ").slice(0, 160) || undefined,
    image: artwork.thumbnail,
  };
}
