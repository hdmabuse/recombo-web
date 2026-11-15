import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Allowlist de tipos -> extensão derivada do MIME (NUNCA do nome do arquivo).
// SVG removido: é vetor de XSS quando servido de bucket público.
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/ogg": "ogg",
  "audio/flac": "flac",
  "audio/aac": "aac",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/ogg": "ogv",
};

// formatos que o sharp consegue confirmar no conteúdo
const FORMAT_TO_EXT: Record<string, string> = {
  jpeg: "jpg",
  png: "png",
  gif: "gif",
  webp: "webp",
};

const MAX_SIZE = 25 * 1024 * 1024; // 25MB
const MAX_PIXELS = 40_000_000; // ~40MP: evita decompression bomb

export type UploadedFile = {
  url: string;
  filename: string;
  size: number;
  type: string;
  storage: "supabase" | "local";
};

export const uploadService = {
  async uploadFile(file: File): Promise<UploadedFile> {
    const ext = MIME_TO_EXT[file.type];
    if (!ext) {
      throw new Error("Tipo de arquivo não permitido");
    }

    if (file.size > MAX_SIZE) {
      throw new Error("Arquivo muito grande (máximo 25MB)");
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Imagem: confia no conteúdo, não no Content-Type declarado pelo cliente.
    if (file.type.startsWith("image/")) {
      let meta: sharp.Metadata;
      try {
        meta = await sharp(buffer).metadata();
      } catch {
        throw new Error("Arquivo de imagem inválido");
      }

      if (!meta.width || !meta.height) {
        throw new Error("Arquivo de imagem inválido");
      }
      if (meta.width * meta.height > MAX_PIXELS) {
        throw new Error("Imagem com dimensões excessivas");
      }

      const realExt = FORMAT_TO_EXT[meta.format ?? ""];
      if (!realExt) {
        throw new Error("Formato de imagem não permitido");
      }
      if (realExt !== ext) {
        throw new Error("Conteúdo não corresponde ao tipo declarado");
      }
    }

    const filename = `${randomUUID()}.${ext}`;

    if (supabase) {
      try {
        const { error } = await supabase.storage
          .from("media")
          .upload(filename, buffer, {
            contentType: file.type,
            cacheControl: "3600",
            upsert: false,
          });

        if (!error) {
          const { data } = supabase.storage.from("media").getPublicUrl(filename);
          return {
            url: data.publicUrl,
            filename: file.name,
            size: file.size,
            type: file.type,
            storage: "supabase",
          };
        }
        console.warn("[upload] Supabase recusou, usando disco local:", error.message);
      } catch (error) {
        console.warn("[upload] Supabase indisponível, usando disco local:", error);
      }
    }

    const dir = join(process.cwd(), "public", "uploads", "media");
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, filename), buffer);

    return {
      url: `/api/media/media/${filename}`,
      filename: file.name,
      size: file.size,
      type: file.type,
      storage: "local",
    };
  },
};
