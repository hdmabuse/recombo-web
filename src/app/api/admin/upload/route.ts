import { NextResponse } from "next/server";
import { uploadService } from "@/services";

export async function POST(request: Request) {
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
