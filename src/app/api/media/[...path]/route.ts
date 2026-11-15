import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join, normalize } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
};

/**
 * Serve imagens gravadas em disco (public/uploads), necessárias porque o Next
 * não publica arquivos adicionados em runtime via /public.
 */
export async function GET(_request: NextRequest, { params }: { params: { path: string[] } }) {
  const relative = normalize(params.path.join("/")).replace(/^([.][.][/\\])+/, "");

  if (relative.includes("..")) {
    return NextResponse.json({ error: "Caminho inválido." }, { status: 400 });
  }

  const ext = relative.split(".").pop()?.toLowerCase() || "";
  const type = MIME[ext];
  if (!type) {
    return NextResponse.json({ error: "Tipo não suportado." }, { status: 415 });
  }

  try {
    const file = await readFile(join(process.cwd(), "public", "uploads", relative));
    return new NextResponse(file, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Imagem não encontrada." }, { status: 404 });
  }
}
