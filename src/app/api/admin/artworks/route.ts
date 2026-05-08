import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, ArtworkType, AccessLevel, ArtworkStatus } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Schema de validação
const artworkSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  type: z.nativeEnum(ArtworkType),
  year: z.number().min(1900).max(2100).optional(),
  medium: z.string().optional(),
  genres: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  license: z.string().default("LUCR"),
  accessLevel: z.nativeEnum(AccessLevel).default("public"),
  status: z.nativeEnum(ArtworkStatus).default("draft"),
});

// GET /api/admin/artworks - Listar obras
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const year = searchParams.get("year");
    
    const where: any = {};
    
    if (type) where.type = type;
    if (status) where.status = status;
    if (year) where.year = parseInt(year);
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    
    const [artworks, total] = await Promise.all([
      prisma.artwork.findMany({
        where,
        include: {
          artists: {
            include: { artist: true },
          },
          files: {
            where: { type: "thumbnail" },
            take: 1,
          },
        },
        orderBy: { updatedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.artwork.count({ where }),
    ]);
    
    return NextResponse.json({
      data: artworks,
      pagination: {
        page,
        perPage: limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return NextResponse.json(
      { error: "Erro ao buscar obras" },
      { status: 500 }
    );
  }
}

// POST /api/admin/artworks - Criar obra
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validatedData = artworkSchema.parse(body);
    
    // Gerar slug
    const slug = validatedData.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    // Verificar se slug já existe
    const existingSlug = await prisma.artwork.findUnique({
      where: { slug },
    });
    
    const finalSlug = existingSlug 
      ? `${slug}-${Date.now()}`
      : slug;
    
    // Criar obra
    const artwork = await prisma.artwork.create({
      data: {
        ...validatedData,
        slug: finalSlug,
      },
      include: {
        artists: { include: { artist: true } },
      },
    });
    
    return NextResponse.json(artwork, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Error creating artwork:", error);
    return NextResponse.json(
      { error: "Erro ao criar obra" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/artworks - Atualizar obra
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "ID é obrigatório" },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const validatedData = artworkSchema.partial().parse(body);
    
    // Se título mudou, gerar novo slug
    let slug = undefined;
    if (validatedData.title) {
      slug = validatedData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    
    const artwork = await prisma.artwork.update({
      where: { id },
      data: {
        ...validatedData,
        ...(slug && { slug }),
      },
      include: {
        artists: { include: { artist: true } },
      },
    });
    
    return NextResponse.json(artwork);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Error updating artwork:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar obra" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/artworks - Deletar obra
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "ID é obrigatório" },
        { status: 400 }
      );
    }
    
    await prisma.artwork.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting artwork:", error);
    return NextResponse.json(
      { error: "Erro ao deletar obra" },
      { status: 500 }
    );
  }
}