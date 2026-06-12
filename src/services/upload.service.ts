import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";

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

const MAX_SIZE = 500 * 1024 * 1024; // 500MB

export const uploadService = {
  async uploadFile(file: File) {
    const ext = MIME_TO_EXT[file.type];
    if (!ext) {
      throw new Error("Tipo de arquivo não permitido");
    }

    if (file.size > MAX_SIZE) {
      throw new Error("Arquivo muito grande (máximo 500MB)");
    }

    if (!supabase) {
      throw new Error("Supabase não configurado");
    }

    const filename = `${randomUUID()}.${ext}`;

    const { error } = await supabase.storage.from("media").upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      throw new Error("Erro ao enviar arquivo: " + error.message);
    }

    const { data: urlData } = supabase.storage.from("media").getPublicUrl(filename);

    return {
      url: urlData.publicUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
    };
  },
};
