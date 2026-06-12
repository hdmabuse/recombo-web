import { prisma } from "@/lib/prisma";

export const fieldDefinitionService = {
  async findByEntity(entity?: string) {
    const where = entity ? { entity } : {};
    return prisma.fieldDefinition.findMany({
      where,
      orderBy: { order: "asc" },
    });
  },

  async create(data: any) {
    return prisma.fieldDefinition.create({
      data: {
        ...data,
        required: data.required || false,
        order: data.order || 0,
        visible: data.visible !== false,
      },
    });
  },

  async update(id: string, data: any) {
    return prisma.fieldDefinition.update({ where: { id }, data });
  },

  async delete(id: string) {
    await prisma.fieldDefinition.delete({ where: { id } });
  },
};
