import { prisma } from "@/lib/prisma";
import { ArtworkType } from "@prisma/client";

export const archiveService = {
  async list(params: {
    page: number;
    limit: number;
    type?: string | null;
    year?: string | null;
    tag?: string | null;
    search?: string | null;
    sort?: string;
  }) {
    const { page, limit, type, year, tag, search, sort } = params;
    const where: any = {
      status: "published",
      accessLevel: "public",
    };

    if (type) where.type = type;
    if (year) where.year = parseInt(year);
    if (tag) where.tags = { has: tag };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    let orderBy: any = { year: "desc" };
    if (sort === "year_asc") orderBy = { year: "asc" };
    if (sort === "title_asc") orderBy = { title: "asc" };
    if (sort === "title_desc") orderBy = { title: "desc" };
    if (sort === "created_desc") orderBy = { createdAt: "desc" };

    const [artworks, total, years, allTags] = await Promise.all([
      prisma.artwork.findMany({
        where,
        include: {
          artists: { include: { artist: true } },
          files: { where: { type: "thumbnail" }, take: 1 },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.artwork.count({ where }),
      prisma.artwork.findMany({
        where: { status: "published" },
        select: { year: true },
        distinct: ["year"],
      }),
      prisma.tag.findMany({
        orderBy: { count: "desc" },
        take: 20,
      }),
    ]);

    const yearsList = years
      .map((a) => a.year)
      .filter((y): y is number => y !== null)
      .sort((a, b) => b - a);

    return {
      data: artworks,
      pagination: {
        page,
        perPage: limit,
        total,
        pages: Math.ceil(total / limit),
      },
      filters: {
        types: Object.values(ArtworkType),
        years: yearsList,
        tags: allTags.map((t) => ({ name: t.name, count: t.count })),
      },
    };
  },
};
