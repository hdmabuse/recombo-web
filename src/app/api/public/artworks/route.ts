import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/** Acervo público: apenas obras publicadas e com acesso público. */
export async function GET() {
  try {
    const artworks = await prisma.artwork.findMany({
      where: { status: "published", accessLevel: "public" },
      orderBy: [{ year: "desc" }, { title: "asc" }],
      take: 300,
      include: {
        artists: { include: { artist: { select: { name: true } } } },
      },
    });

    return NextResponse.json({
      count: artworks.length,
      items: artworks.map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        year: a.year,
        type: a.type,
        thumbnail: a.thumbnail,
        artists: a.artists.map((x) => ({ name: x.artist.name })),
        tags: a.tags,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "erro desconhecido";
    return NextResponse.json({ error: `Falha ao ler o acervo: ${message}` }, { status: 500 });
  }
}
