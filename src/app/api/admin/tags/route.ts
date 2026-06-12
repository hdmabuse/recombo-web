import { NextResponse } from "next/server";
import { tagService } from "@/services";
import { requireRole } from "@/lib/api/guard";

export async function GET() {
  try {
    const tags = await tagService.findAll();
    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar tags" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const body = await request.json();
    const tag = await tagService.create(body);
    return NextResponse.json(tag);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar tag" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const tag = await tagService.update(id, data);
    return NextResponse.json(tag);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar tag" }, { status: 500 });
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
    await tagService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir tag" }, { status: 500 });
  }
}
