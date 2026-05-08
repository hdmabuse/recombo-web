import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Schema de validação
const artistSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  pseudonym: z.string().optional(),
  bio: z.string().optional(),
  bioShort: z.string().optional(),
  photo: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  roles: z.array(z.string()).optional(),
  period: z.string().optional(),
});

// GET /api/admin/artists - Listar artistas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { pseudonym: { contains: search, mode: "insensitive" } },
      ];
    }
    
    const artists = await prisma.artist.findMany({
      where,
      include: {
        artworks: true,
      },
      orderBy: { name: "asc" },
    });
    
    return NextResponse.json(artists);
  } catch (error) {
    console.error("Error fetching artists:", error);
    return NextResponse.json(
      { error: "Erro ao buscar artistas" },
      { status: 500 }
    );
  }
}

// POST /api/admin/artists - Criar artista
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = artistSchema.parse(body);
    
    // Gerar slug
    const nameForSlug = validatedData.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    const slug = `${nameForSlug}-${Date.now().toString(36)}`;
    
    const artist = await prisma.artist.create({
      data: {
        ...validatedData,
        slug,
      },
    });
    
    return NextResponse.json(artist, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Error creating artist:", error);
    return NextResponse.json(
      { error: "Erro ao criar artista" },
      { status: 500 }
    );
  }
}