import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
}

export interface ThumbnailResult {
  url: string;
  publicUrl: string;
  metadata: ImageMetadata;
}

const THUMBNAIL_WIDTH = 400;
const THUMBNAIL_HEIGHT = 300;

export async function generateImageThumbnail(
  file: Buffer,
  originalFilename: string,
  artworkId: string,
): Promise<ThumbnailResult | null> {
  if (!supabase) {
    console.warn("Supabase não configurado para gerar thumbnail");
    return null;
  }

  try {
    const thumbnailBuffer = await sharp(file)
      .resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, {
        fit: "cover",
        position: "center",
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    const ext = "jpg";
    const thumbnailFilename = `${artworkId}-thumb-${Date.now()}.${ext}`;
    const thumbnailPath = `thumbnails/${thumbnailFilename}`;

    const { data, error } = await supabase.storage
      .from("recombo")
      .upload(thumbnailPath, thumbnailBuffer, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (error) {
      console.error("Thumbnail upload error:", error);
      return null;
    }

    const { data: urlData } = supabase.storage.from("recombo").getPublicUrl(thumbnailPath);

    const metadata = await sharp(thumbnailBuffer).metadata();

    return {
      url: thumbnailPath,
      publicUrl: urlData.publicUrl,
      metadata: {
        width: metadata.width || THUMBNAIL_WIDTH,
        height: metadata.height || THUMBNAIL_HEIGHT,
        format: metadata.format || "jpeg",
        size: thumbnailBuffer.length,
      },
    };
  } catch (error) {
    console.error("Error generating thumbnail:", error);
    return null;
  }
}

export async function extractImageMetadata(file: Buffer): Promise<ImageMetadata | null> {
  try {
    const metadata = await sharp(file).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: metadata.format || "unknown",
      size: file.length,
    };
  } catch (error) {
    console.error("Error extracting metadata:", error);
    return null;
  }
}

export function getMediaType(mimeType: string): "image" | "audio" | "video" | "document" {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.startsWith("video/")) return "video";
  return "document";
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
