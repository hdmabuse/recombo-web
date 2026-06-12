import { prisma } from "@/lib/prisma";
import { stripSystemFields } from "@/lib/sanitize";

export const eventService = {
  async findAll() {
    return prisma.event.findMany({ orderBy: { dateStart: "desc" } });
  },

  async findById(id: string) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        artworks: { include: { artwork: true } },
        participants: { include: { artist: true } },
      },
    });
  },

  async create(data: any) {
    const clean = stripSystemFields(data);
    const slug =
      clean.slug ||
      clean.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    return prisma.event.create({
      data: {
        ...clean,
        slug,
        dateStart: new Date(clean.dateStart),
        dateEnd: clean.dateEnd ? new Date(clean.dateEnd) : null,
      },
    });
  },

  async update(id: string, data: any) {
    return prisma.event.update({ where: { id }, data: stripSystemFields(data) });
  },

  async delete(id: string) {
    await prisma.event.delete({ where: { id } });
  },
};
