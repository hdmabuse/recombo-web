import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Recorte público do acervo.
 * Só sai daqui o que foi marcado como published + public na curadoria.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit") || 50), 200);

  try {
    const captures = await prisma.capture.findMany({
      where: { status: "published" },
      orderBy: [{ highlight: "desc" }, { capturedAt: "desc" }],
      take: limit,
      select: {
        snapshotId: true,
        url: true,
        title: true,
        note: true,
        capturedAt: true,
        license: true,
        tags: true,
        highlight: true,
      },
    });

    return NextResponse.json({
      count: captures.length,
      items: captures.map((c) => ({
        id: c.snapshotId,
        url: c.url,
        title: c.title,
        note: c.note,
        capturedAt: c.capturedAt,
        license: c.license,
        tags: c.tags,
        highlight: c.highlight,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "erro desconhecido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
