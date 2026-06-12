import { NextRequest, NextResponse } from "next/server";
import { importService } from "@/services";
import { requireRole } from "@/lib/api/guard";

export async function POST(request: NextRequest) {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const result = await importService.importCSV(file);

    return NextResponse.json({
      message: `Importação concluída: ${result.success} sucesso, ${result.failed} falhas`,
      ...result,
    });
  } catch (error) {
    console.error("Import error:", error);
    const message = error instanceof Error ? error.message : "Erro ao processar importação";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(importService.getTemplateInfo());
}
