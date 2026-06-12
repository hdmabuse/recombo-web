import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { ArtworkType, ArtworkStatus } from "@prisma/client";

const importRowSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  type: z.nativeEnum(ArtworkType),
  year: z.number().min(1900).max(2100).optional(),
  description: z.string().optional(),
  medium: z.string().optional(),
  genres: z.string().optional(),
  tags: z.string().optional(),
  license: z.string().default("LUCR"),
  artist: z.string().optional(),
  status: z.nativeEnum(ArtworkStatus).default("draft"),
});

function parseCSV(content: string): string[][] {
  const lines = content.trim().split(/\r?\n/);
  return lines.map((line) => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  });
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface ImportResult {
  success: number;
  failed: number;
  errors: { row: number; error: string }[];
}

const MAX_IMPORT_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_IMPORT_ROWS = 5000;

export const importService = {
  async importCSV(file: File): Promise<ImportResult> {
    if (file.size > MAX_IMPORT_BYTES) {
      throw new Error("Arquivo CSV muito grande (máximo 10MB)");
    }

    const content = await file.text();
    const rows = parseCSV(content);

    if (rows.length < 2) {
      throw new Error("Arquivo CSV inválido ou vazio");
    }

    if (rows.length - 1 > MAX_IMPORT_ROWS) {
      throw new Error(`CSV excede o limite de ${MAX_IMPORT_ROWS} linhas`);
    }

    const headers = rows[0].map((h) => h.toLowerCase().trim());
    const dataRows = rows.slice(1);

    const result: ImportResult = { success: 0, failed: 0, errors: [] };

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i];
      if (row.every((cell) => !cell.trim())) continue;

      try {
        const rowData: Record<string, string> = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index] || "";
        });

        const validated = importRowSchema.parse({
          title: rowData.title || rowData.titulo,
          type: rowData.type || rowData.tipo || "text",
          year: rowData.year ? parseInt(rowData.year) : undefined,
          description: rowData.description || rowData.descricao,
          medium: rowData.medium || rowData.meio,
          genres: rowData.genres || rowData.generos,
          tags: rowData.tags || rowData.tags,
          license: rowData.license || rowData.licenca || "LUCR",
          artist: rowData.artist || rowData.artista,
          status: rowData.status || "draft",
        });

        let slug = generateSlug(validated.title);
        const existing = await prisma.artwork.findUnique({ where: { slug } });
        if (existing) {
          slug = `${slug}-${Date.now()}`;
        }

        const genres = validated.genres
          ? validated.genres
              .split(";")
              .map((g) => g.trim())
              .filter(Boolean)
          : [];

        const tags = validated.tags
          ? validated.tags
              .split(";")
              .map((t) => t.trim())
              .filter(Boolean)
          : [];

        await prisma.artwork.create({
          data: {
            title: validated.title,
            slug,
            type: validated.type,
            year: validated.year,
            description: validated.description,
            medium: validated.medium,
            genres,
            tags,
            license: validated.license,
            status: validated.status,
          },
        });

        result.success++;
      } catch (error) {
        result.failed++;
        const errorMessage =
          error instanceof z.ZodError
            ? error.errors.map((e) => e.message).join(", ")
            : "Erro desconhecido";
        result.errors.push({ row: i + 2, error: errorMessage });
      }
    }

    return result;
  },

  getTemplateInfo() {
    return {
      requiredColumns: ["title", "type"],
      optionalColumns: [
        "year",
        "description",
        "medium",
        "genres",
        "tags",
        "license",
        "artist",
        "status",
      ],
      typeOptions: [
        "audio",
        "video",
        "image",
        "text",
        "installation",
        "performance",
        "website",
        "software",
      ],
      licenseOptions: ["LUCR", "CC-BY", "CC-BY-SA", "CC-BY-NC", "CC-BY-NC-SA", "CC-BY-ND", "CC0"],
      statusOptions: ["draft", "published", "archived"],
      example: {
        title: "Minha Obra",
        type: "audio",
        year: "2004",
        description: "Descrição da obra",
        medium: "faixa",
        genres: "eletrônica;experimental",
        tags: "recife;coletivo",
        license: "LUCR",
        status: "published",
      },
    };
  },
};
