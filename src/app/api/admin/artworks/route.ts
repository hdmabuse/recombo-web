import { NextResponse } from "next/server";
import { artworkService } from "@/services";
import { requireRole } from "@/lib/api/guard";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (id) {
      const artwork = await artworkService.findById(id);
      return artwork
        ? NextResponse.json(artwork)
        : NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    if (slug) {
      const artwork = await artworkService.findBySlug(slug);
      return artwork
        ? NextResponse.json(artwork)
        : NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    const artworks = await artworkService.findAll();
    return NextResponse.json(artworks);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar obras" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const body = await request.json();
    const artwork = await artworkService.create(body);
    return NextResponse.json(artwork);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar obra" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const artwork = await artworkService.update(id, data);
    return NextResponse.json(artwork);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar obra" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await requireRole(["admin"]);
  if (session instanceof NextResponse) return session;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }
    await artworkService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir obra" }, { status: 500 });
  }
}
