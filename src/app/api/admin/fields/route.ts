import { NextResponse } from "next/server";
import { fieldDefinitionService } from "@/services";
import { requireRole } from "@/lib/api/guard";
import { fieldDefinitionCreateSchema, fieldDefinitionUpdateSchema } from "@/lib/validation/admin";

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
    const parsed = fieldDefinitionCreateSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", issues: parsed.error.issues },
        { status: 422 },
      );
    }
    const field = await fieldDefinitionService.create(parsed.data);
    return NextResponse.json(field);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar campo" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const body = await request.json().catch(() => ({}));
    const { id } = body as { id?: string };
    if (!id) return NextResponse.json({ error: "id é obrigatório" }, { status: 422 });
    const parsed = fieldDefinitionUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", issues: parsed.error.issues },
        { status: 422 },
      );
    }
    const data = parsed.data;
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
