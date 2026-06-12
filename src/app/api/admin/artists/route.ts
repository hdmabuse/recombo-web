import { NextResponse } from "next/server";
import { artistService } from "@/services";
import { requireRole } from "@/lib/api/guard";
import { artistCreateSchema, artistUpdateSchema } from "@/lib/validation/admin";

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
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const parsed = artistCreateSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", issues: parsed.error.issues },
        { status: 400 },
      );
    }
    const artist = await artistService.create(parsed.data);
    return NextResponse.json(artist);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar artista" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const body = await request.json();
    const id = body?.id;
    if (!id) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }
    const parsed = artistUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", issues: parsed.error.issues },
        { status: 400 },
      );
    }
    const artist = await artistService.update(id, parsed.data);
    return NextResponse.json(artist);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar artista" }, { status: 500 });
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
    await artistService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir artista" }, { status: 500 });
  }
}
