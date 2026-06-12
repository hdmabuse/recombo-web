import { prisma } from "@/lib/prisma";
import { stripSystemFields } from "@/lib/sanitize";

export const fieldDefinitionService = {
  async findByEntity(entity?: string) {
    const where = entity ? { entity } : {};
    return prisma.fieldDefinition.findMany({
      where,
      orderBy: { order: "asc" },
    });
  },

  async create(data: any) {
    const clean = stripSystemFields(data);
    return prisma.fieldDefinition.create({
      data: {
        ...clean,
        required: clean.required || false,
        order: clean.order || 0,
        visible: clean.visible !== false,
      },
    });
  },

  async update(id: string, data: any) {
    return prisma.fieldDefinition.update({ where: { id }, data: stripSystemFields(data) });
  },

  async delete(id: string) {
    await prisma.fieldDefinition.delete({ where: { id } });
  },
};
