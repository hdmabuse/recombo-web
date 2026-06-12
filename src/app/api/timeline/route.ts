import { NextResponse } from "next/server";
import { timelineService } from "@/services/timeline.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await timelineService.getAll();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar timeline" }, { status: 500 });
  }
}
