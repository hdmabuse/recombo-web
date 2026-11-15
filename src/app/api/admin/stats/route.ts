import { NextResponse } from "next/server";
import { requireRole } from "@/lib/api/guard";
import { statsService } from "@/services";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireRole(["admin", "editor", "viewer"]);
  if (session instanceof NextResponse) return session;

  try {
    const counts = await statsService.getCounts();
    return NextResponse.json(counts);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar estatísticas" }, { status: 500 });
  }
}
