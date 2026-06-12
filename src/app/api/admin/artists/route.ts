import { NextResponse } from "next/server";
import { artistService } from "@/services";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (id) {
      const artist = await artistService.findById(id);
      return artist
        ? NextResponse.json(artist)
        : NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    if (slug) {
      const artist = await artistService.findBySlug(slug);
      return artist
        ? NextResponse.json(artist)
        : NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    const artists = await artistService.findAll();
    return NextResponse.json(artists);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar artistas" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const artist = await artistService.create(body);
    return NextResponse.json(artist);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar artista" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const artist = await artistService.update(id, data);
    return NextResponse.json(artist);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar artista" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }
    await artistService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir artista" }, { status: 500 });
  }
}
