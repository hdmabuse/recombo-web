import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { stripSystemFields } from "@/lib/sanitize";

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
    const clean = stripSystemFields(data);
    return prisma.artist.create({
      data: {
        ...clean,
        slug: slugify(clean.name),
        birthDate: clean.birthDate ? new Date(clean.birthDate) : null,
      },
    });
  },

  async update(id: string, data: any) {
    return prisma.artist.update({ where: { id }, data: stripSystemFields(data) });
  },

  async delete(id: string) {
    await prisma.artist.delete({ where: { id } });
  },
};
