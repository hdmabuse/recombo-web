import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const ARCHIVE_PAGE_SIZE = 12;

export type ArchiveQuery = {
  q?: string;
  type?: string;
  year?: number;
  tag?: string;
  page: number;
};

export type ArchiveItem = {
  id: string;
  slug: string;
  title: string;
  year: number | null;
  type: string;
  thumbnail: string | null;
  artists: string[];
};

export type ArchiveView = {
  items: ArchiveItem[];
  total: number;
  page: number;
  pages: number;
  years: number[];
  types: string[];
  query: ArchiveQuery;
};

/** Normaliza a query da URL. Pura: dá para testar sem banco. */
export function normalizeArchiveQuery(
  sp: Record<string, string | string[] | undefined> = {},
): ArchiveQuery {
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const q = (first(sp.q) ?? first(sp.search) ?? "").trim().slice(0, 120);
  const type = (first(sp.type) ?? "").trim().slice(0, 40);
  const tag = (first(sp.tag) ?? "").trim().slice(0, 60);
  const rawYear = Number.parseInt(first(sp.year) ?? "", 10);
  const rawPage = Number.parseInt(first(sp.page) ?? "1", 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.min(rawPage, 500) : 1;

  return {
    ...(q ? { q } : {}),
    ...(type ? { type } : {}),
    ...(tag ? { tag } : {}),
    ...(Number.isFinite(rawYear) && rawYear > 1800 && rawYear < 2200 ? { year: rawYear } : {}),
    page,
  };
}

const fetchArchive = unstable_cache(
  async (key: string): Promise<ArchiveView> => {
    const query = JSON.parse(key) as ArchiveQuery;
    const where = {
      status: "published" as const,
      ...(query.type ? { type: query.type as never } : {}),
      ...(query.year ? { year: query.year } : {}),
      ...(query.tag ? { tags: { has: query.tag } } : {}),
      ...(query.q
        ? {
            OR: [
              { title: { contains: query.q, mode: "insensitive" as const } },
              { description: { contains: query.q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [rows, total, years, types] = await Promise.all([
      prisma.artwork.findMany({
        where,
        orderBy: [{ year: "desc" }, { title: "asc" }],
        skip: (query.page - 1) * ARCHIVE_PAGE_SIZE,
        take: ARCHIVE_PAGE_SIZE,
        select: {
          id: true,
          slug: true,
          title: true,
          year: true,
          type: true,
          thumbnail: true,
          artists: { select: { artist: { select: { name: true } } } },
        },
      }),
      prisma.artwork.count({ where }),
      prisma.artwork.findMany({
        where: { status: "published", year: { not: null } },
        distinct: ["year"],
        orderBy: { year: "desc" },
        select: { year: true },
        take: 40,
      }),
      prisma.artwork.findMany({
        where: { status: "published" },
        distinct: ["type"],
        select: { type: true },
      }),
    ]);

    return {
      items: rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        year: r.year,
        type: r.type,
        thumbnail: r.thumbnail,
        artists: r.artists.map((a) => a.artist.name),
      })),
      total,
      page: query.page,
      pages: Math.max(1, Math.ceil(total / ARCHIVE_PAGE_SIZE)),
      years: years.map((y) => y.year).filter((y): y is number => y !== null),
      types: types.map((t) => t.type).sort(),
      query,
    };
  },
  ["archive-view"],
  { revalidate: 300, tags: ["archive"] },
);

export async function getArchiveView(query: ArchiveQuery): Promise<ArchiveView> {
  return fetchArchive(JSON.stringify(query));
}
