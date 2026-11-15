import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import prisma from "@/lib/prisma";
import { safeEqual } from "@/lib/timing-safe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 20 * 1024 * 1024;
const THUMB = { width: 400, height: 300 };
const FULL_WIDTH = 1600;

/**
 * Recebe a screenshot de uma captura do ArchiveBox, gera duas versões
 * (miniatura 400x300 e imagem até 1600px) e usa a miniatura como capa da obra.
 *
 * Autenticação: Bearer CAPTURE_SYNC_TOKEN.
 */
export async function POST(request: NextRequest) {
  const expected = process.env.CAPTURE_SYNC_TOKEN || "";
  if (!expected) {
    return NextResponse.json(
      { error: "CAPTURE_SYNC_TOKEN não configurado no servidor." },
      { status: 503 },
    );
  }

  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!safeEqual(token, expected)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Envie multipart/form-data." }, { status: 400 });
  }

  const snapshotId = String(form.get("snapshotId") || "");
  const file = form.get("file");

  if (!snapshotId || !(file instanceof File)) {
    return NextResponse.json({ error: "snapshotId e file são obrigatórios." }, { status: 422 });
  }
  // o id entra no nome do arquivo: só aceita o formato do ArchiveBox
  if (!/^[a-zA-Z0-9-]{16,64}$/.test(snapshotId)) {
    return NextResponse.json({ error: "snapshotId inválido." }, { status: 422 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Arquivo precisa ser imagem." }, { status: 422 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Imagem maior que 20MB." }, { status: 413 });
  }

  const capture = await prisma.capture.findUnique({ where: { snapshotId } });
  if (!capture) {
    return NextResponse.json({ error: "Captura não encontrada." }, { status: 404 });
  }
  if (!capture.artworkId) {
    return NextResponse.json(
      { error: "Captura ainda não gerou obra — publique primeiro." },
      { status: 409 },
    );
  }

  try {
    const input = Buffer.from(await file.arrayBuffer());
    const image = sharp(input, { failOn: "none" }).rotate();

    const fullBuffer = await image
      .clone()
      .resize({ width: FULL_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: 85, mozjpeg: true })
      .toBuffer();

    const thumbBuffer = await image
      .clone()
      .resize(THUMB.width, THUMB.height, { fit: "cover", position: "center" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();

    const dir = join(process.cwd(), "public", "uploads", "captures");
    await mkdir(dir, { recursive: true });

    const fullName = `${snapshotId}-full.jpg`;
    const thumbName = `${snapshotId}-thumb.jpg`;
    await writeFile(join(dir, fullName), fullBuffer);
    await writeFile(join(dir, thumbName), thumbBuffer);

    const fullUrl = `/api/media/captures/${fullName}`;
    const thumbUrl = `/api/media/captures/${thumbName}`;

    await prisma.artwork.update({
      where: { id: capture.artworkId },
      data: { thumbnail: thumbUrl, fileUrl: fullUrl },
    });

    await upsertFile(capture.artworkId, "thumbnail", thumbUrl, thumbName, thumbBuffer.length);
    await upsertFile(capture.artworkId, "original", fullUrl, fullName, fullBuffer.length);

    return NextResponse.json({ ok: true, thumbnail: thumbUrl, original: fullUrl });
  } catch (error) {
    console.error("[screenshot] falha ao processar:", error);
    return NextResponse.json({ error: "Erro interno ao processar imagem." }, { status: 500 });
  }
}

async function upsertFile(
  artworkId: string,
  type: "thumbnail" | "original",
  url: string,
  filename: string,
  size: number,
) {
  const existing = await prisma.artworkFile.findFirst({
    where: { artworkId, type },
    select: { id: true },
  });

  if (existing) {
    await prisma.artworkFile.update({
      where: { id: existing.id },
      data: { url, filename, size, mimeType: "image/jpeg" },
    });
    return;
  }

  await prisma.artworkFile.create({
    data: { artworkId, url, filename, type, mimeType: "image/jpeg", size },
  });
}
