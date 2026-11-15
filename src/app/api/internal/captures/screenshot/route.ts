import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadService } from "@/services";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 15 * 1024 * 1024;

/**
 * Recebe a screenshot de uma captura do ArchiveBox e a usa como imagem da obra.
 *
 * Autenticação: Bearer CAPTURE_SYNC_TOKEN (o mesmo do sync de capturas).
 * Chamado por scripts/sync-captures.mjs, que lê o PNG do volume de dados.
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
  if (token !== expected) {
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
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Arquivo precisa ser imagem." }, { status: 422 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Imagem maior que 15MB." }, { status: 413 });
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
    const uploaded = await uploadService.uploadFile(file);

    await prisma.artwork.update({
      where: { id: capture.artworkId },
      data: { thumbnail: uploaded.url },
    });

    const existing = await prisma.artworkFile.findFirst({
      where: { artworkId: capture.artworkId, type: "thumbnail" },
    });
    if (!existing) {
      await prisma.artworkFile.create({
        data: {
          artworkId: capture.artworkId,
          url: uploaded.url,
          filename: file.name || "screenshot.png",
          type: "thumbnail",
          mimeType: file.type,
          size: file.size,
        },
      });
    }

    return NextResponse.json({ ok: true, url: uploaded.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "erro desconhecido";
    return NextResponse.json({ error: `Falha ao enviar imagem: ${message}` }, { status: 500 });
  }
}
