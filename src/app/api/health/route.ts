import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/** Healthcheck para monitoramento externo: banco + processo. */
export async function GET() {
  const startedAt = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: "ok",
      db: "up",
      latencyMs: Date.now() - startedAt,
      uptimeSeconds: Math.round(process.uptime()),
    });
  } catch (error) {
    console.error("[health] banco indisponível:", error);
    return NextResponse.json(
      { status: "degraded", db: "down", latencyMs: Date.now() - startedAt },
      { status: 503 },
    );
  }
}
