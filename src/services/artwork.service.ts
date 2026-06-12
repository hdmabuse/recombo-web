import { prisma } from "@/lib/prisma";

export const artworkService = {
  async findAll() {
    return prisma.artwork.findMany({
      include: { artists: { include: { artist: true } } },
      orderBy: { createdAt: "desc" },
    });
  },

  async findById(id: string) {
    return prisma.artwork.findUnique({
      where: { id },
      include: {
        artists: { include: { artist: true } },
        events: { include: { event: true } },
        files: true,
        related: { include: { related: true } },
      },
    });
  },

  async findBySlug(slug: string) {
    return prisma.artwork.findUnique({
      where: { slug },
      include: {
        artists: { include: { artist: true } },
        events: { include: { event: true } },
        files: true,
      },
    });
  },

  async create(data: any) {
    const { artists, ...fields } = data;
    return prisma.artwork.create({
      data: {
        ...fields,
        artists: artists
          ? {
              create: artists.map((a: { artistId: string; role: string }) => ({
                artistId: a.artistId,
                role: a.role,
              })),
            }
          : undefined,
      },
    });
  },

  async update(id: string, data: any) {
    return prisma.artwork.update({
      where: { id },
      data: {
        ...data,
        genres: data.genres || [],
        tags: data.tags || [],
      },
    });
  },

  async delete(id: string) {
    await prisma.artwork.delete({ where: { id } });
  },
};
