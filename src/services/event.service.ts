import { prisma } from "@/lib/prisma";

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
    const slug =
      data.slug ||
      data.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    return prisma.event.create({
      data: {
        ...data,
        slug,
        dateStart: new Date(data.dateStart),
        dateEnd: data.dateEnd ? new Date(data.dateEnd) : null,
      },
    });
  },

  async update(id: string, data: any) {
    return prisma.event.update({ where: { id }, data });
  },

  async delete(id: string) {
    await prisma.event.delete({ where: { id } });
  },
};
