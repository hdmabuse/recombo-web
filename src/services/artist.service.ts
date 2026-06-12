import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export const artistService = {
  async findAll() {
    return prisma.artist.findMany({ orderBy: { name: "asc" } });
  },

  async findById(id: string) {
    return prisma.artist.findUnique({
      where: { id },
      include: {
        artworks: { include: { artwork: true } },
        events: { include: { event: true } },
        interviews: { include: { interview: true } },
      },
    });
  },

  async findBySlug(slug: string) {
    return prisma.artist.findUnique({ where: { slug } });
  },

  async create(data: any) {
    const slug = slugify(data.name);
    return prisma.artist.create({
      data: {
        slug,
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
      },
    });
  },

  async update(id: string, data: any) {
    return prisma.artist.update({ where: { id }, data });
  },

  async delete(id: string) {
    await prisma.artist.delete({ where: { id } });
  },
};
