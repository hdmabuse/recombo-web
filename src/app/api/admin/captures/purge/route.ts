import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/api/guard";

export const dynamic = "force-dynamic";

/**
 * Apaga definitivamente as capturas descartadas.
 *
 * Antes de apagar, grava uma lápide (CaptureDismissal) por snapshotId — sem isso
 * a sincronização (a cada 15 min) recriaria cada uma como "caixa de entrada".
 */
export async function POST() {
  const session = await requireRole(["admin", "editor"]);
  if (session instanceof NextResponse) return session;

  try {
    const rejected = await prisma.capture.findMany({
      where: { status: "rejected" },
      select: { snapshotId: true },
    });

    if (rejected.length === 0) {
      return NextResponse.json({ purged: 0 });
    }

    const ids = rejected.map((r) => r.snapshotId);

    await prisma.$transaction([
      prisma.captureDismissal.createMany({
        data: ids.map((snapshotId) => ({ snapshotId })),
        skipDuplicates: true,
      }),
      prisma.capture.deleteMany({ where: { snapshotId: { in: ids } } }),
    ]);

    console.log(`[captures] ${ids.length} descartadas apagadas`);
    return NextResponse.json({ purged: ids.length });
  } catch (error) {
    console.error("[captures] falha ao apagar descartadas:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
