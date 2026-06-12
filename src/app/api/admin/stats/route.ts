import { NextResponse } from "next/server";
import { statsService } from "@/services";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const counts = await statsService.getCounts();
    return NextResponse.json(counts);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar estatísticas" }, { status: 500 });
  }
}
