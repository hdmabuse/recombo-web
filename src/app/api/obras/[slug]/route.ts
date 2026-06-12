import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  try {
    const artwork = await prisma.artwork.findUnique({
      where: { slug: params.slug },
      include: {
        artists: { include: { artist: true } },
        events: { include: { event: true } },
        files: true,
        related: { include: { related: true } },
      },
    });

    if (!artwork) {
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    return NextResponse.json(artwork);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar obra" }, { status: 500 });
  }
}
