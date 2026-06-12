import { z } from "zod";
import { ArtworkType, ArtworkStatus, AccessLevel } from "@prisma/client";

/**
 * Schemas de validação/whitelist para as rotas admin.
 *
 * Por padrão o Zod REMOVE chaves desconhecidas (.strip()), o que mata o
 * mass-assignment (id/createdBy/etc.) e também descarta campos auxiliares do
 * formulário que não são colunas (ex.: artistIds/artistRoles na obra).
 * Apenas os campos abaixo chegam ao Prisma.
 */

const nullableString = z.string().nullable().optional();

export const artworkCreateSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(500),
  slug: z.string().max(300).optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  type: z.nativeEnum(ArtworkType),
  medium: z.string().max(300).optional(),
  genres: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  year: z.number().int().min(0).max(3000).nullable().optional(),
  thumbnail: z.string().optional(),
  fileUrl: z.string().optional(),
  license: z.string().max(50).optional(),
  accessLevel: z.nativeEnum(AccessLevel).optional(),
  status: z.nativeEnum(ArtworkStatus).optional(),
  customFields: z.record(z.unknown()).optional(),
  artists: z
    .array(
      z.object({
        artistId: z.string().min(1),
        role: z.string().max(100).optional(),
      }),
    )
    .optional(),
});

export const artworkUpdateSchema = artworkCreateSchema.partial();

export const artistCreateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(300),
  slug: z.string().max(300).optional(),
  pseudonym: nullableString,
  bio: nullableString,
  bioShort: nullableString,
  photo: nullableString,
  email: nullableString,
  website: nullableString,
  social: z.record(z.unknown()).nullable().optional(),
  roles: z.array(z.string()).optional(),
  period: nullableString,
  birthDate: nullableString,
  birthPlace: nullableString,
  customFields: z.record(z.unknown()).optional(),
});

export const artistUpdateSchema = artistCreateSchema.partial();
