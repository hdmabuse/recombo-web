import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/flac",
  "audio/aac",
  "video/mp4",
  "video/webm",
  "video/ogg",
];

const MAX_SIZE = 500 * 1024 * 1024; // 500MB

export const uploadService = {
  async uploadFile(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error("Tipo de arquivo não permitido");
    }

    if (file.size > MAX_SIZE) {
      throw new Error("Arquivo muito grande (máximo 500MB)");
    }

    if (!supabase) {
      throw new Error("Supabase não configurado");
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
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
