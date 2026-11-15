import { NextResponse } from "next/server";
import { eventService } from "@/services";
import { requireRole } from "@/lib/api/guard";
import { eventCreateSchema, eventUpdateSchema } from "@/lib/validation/admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const event = await eventService.findById(id);
      return event
        ? NextResponse.json(event)
        : NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    const events = await eventService.findAll();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar eventos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const parsed = eventCreateSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", issues: parsed.error.issues },
        { status: 422 },
      );
    }
    const event = await eventService.create(parsed.data);
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar evento" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const body = await request.json().catch(() => ({}));
    const { id } = body as { id?: string };
    if (!id) return NextResponse.json({ error: "id é obrigatório" }, { status: 422 });
    const parsed = eventUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", issues: parsed.error.issues },
        { status: 422 },
      );
    }
    const data = parsed.data;
    const event = await eventService.update(id, data);
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar evento" }, { status: 500 });
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
    await eventService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir evento" }, { status: 500 });
  }
}
