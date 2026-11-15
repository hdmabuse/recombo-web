import { z } from "zod";
import {
  ArtworkType,
  ArtworkStatus,
  AccessLevel,
  EventType,
  TagCategory,
  FieldType,
} from "@prisma/client";

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

// ---------------------------------------------------------------------------
// Eventos, tags e campos customizados (whitelist explícita)
// ---------------------------------------------------------------------------
export const eventCreateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(300),
  slug: z.string().max(300).optional(),
  description: z.string().optional(),
  program: z.string().optional(),
  type: z.nativeEnum(EventType),
  dateStart: z.coerce.date(),
  dateEnd: z.coerce.date().nullable().optional(),
  venue: z.string().max(300).optional(),
  address: z.string().max(300).optional(),
  city: z.string().max(200).optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  coordinates: z.record(z.unknown()).nullable().optional(),
  photos: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  press: z.array(z.string()).optional(),
});

export const eventUpdateSchema = eventCreateSchema.partial();

export const tagCreateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100),
  slug: z.string().max(100).optional(),
  category: z.nativeEnum(TagCategory).nullable().optional(),
  color: z.string().max(20).nullable().optional(),
});

export const tagUpdateSchema = tagCreateSchema.partial();

export const fieldDefinitionCreateSchema = z.object({
  entity: z.string().min(1).max(50),
  name: z.string().min(1).max(100),
  label: z.string().min(1).max(200),
  type: z.nativeEnum(FieldType),
  required: z.boolean().optional(),
  options: z.array(z.string()).nullable().optional(),
  defaultValue: z.string().max(500).nullable().optional(),
  order: z.number().int().optional(),
  visible: z.boolean().optional(),
});

export const fieldDefinitionUpdateSchema = fieldDefinitionCreateSchema.partial();
