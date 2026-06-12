import { NextRequest, NextResponse } from "next/server";
import { archiveService } from "@/services";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const type = searchParams.get("type");
    const year = searchParams.get("year");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "year_desc";

    const result = await archiveService.list({
      page,
      limit,
      type,
      year,
      tag,
      search,
      sort,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return NextResponse.json({ error: "Erro ao buscar obras" }, { status: 500 });
  }
}
