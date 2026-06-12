import { NextResponse } from "next/server";
import { fieldDefinitionService } from "@/services";
import { requireRole } from "@/lib/api/guard";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const entity = searchParams.get("entity") || undefined;
    const fields = await fieldDefinitionService.findByEntity(entity);
    return NextResponse.json(fields);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar campos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const body = await request.json();
    const field = await fieldDefinitionService.create(body);
    return NextResponse.json(field);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar campo" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const field = await fieldDefinitionService.update(id, data);
    return NextResponse.json(field);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar campo" }, { status: 500 });
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
    await fieldDefinitionService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir campo" }, { status: 500 });
  }
}
