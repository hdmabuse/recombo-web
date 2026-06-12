import { prisma } from "@/lib/prisma";

export const tagService = {
  async findAll() {
    return prisma.tag.findMany({ orderBy: { count: "desc" } });
  },

  async create(data: any) {
    return prisma.tag.create({ data });
  },

  async update(id: string, data: any) {
    return prisma.tag.update({ where: { id }, data });
  },

  async delete(id: string) {
    await prisma.tag.delete({ where: { id } });
  },
};
