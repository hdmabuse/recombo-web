import { NextRequest, NextResponse } from "next/server";
import { importService } from "@/services";

export async function POST(request: NextRequest) {
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
    return NextResponse.json({ error: "Erro ao processar importação" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(importService.getTemplateInfo());
}
