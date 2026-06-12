import { NextResponse } from "next/server";
import { uploadService } from "@/services";
import { requireRole } from "@/lib/api/guard";

export async function POST(request: Request) {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const result = await uploadService.uploadFile(file);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao processar arquivo";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
