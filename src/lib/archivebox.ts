/**
 * Cliente do ArchiveBox — SOMENTE SERVIDOR.
 *
 * Este módulo importa um token de API. Nunca o importe em Client Components
 * e nunca exponha ARCHIVEBOX_TOKEN com prefixo NEXT_PUBLIC_.
 */

const BASE = (process.env.ARCHIVEBOX_URL || "http://192.168.68.110:8030").replace(/\/$/, "");
const TOKEN = process.env.ARCHIVEBOX_TOKEN || "";

export type ArchiveBoxSnapshot = {
  id: string;
  url: string;
  title: string | null;
  status: string;
  archive_size: number | null;
  bookmarked_at: string | null;
  created_at: string;
  tags: string[];
  archive_path: string | null;
};

type Page<T> = { items: T[]; total_items?: number };

export function isConfigured(): boolean {
  return Boolean(TOKEN);
}

export function archiveboxBaseUrl(): string {
  return BASE;
}

async function call<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`ArchiveBox respondeu ${res.status} em ${path}`);
  }
  return (await res.json()) as T;
}

/** Lista os snapshots de uma tag (ex.: col:recombo), paginando. */
export async function listSnapshots(tag: string, limit = 200): Promise<ArchiveBoxSnapshot[]> {
  const out: ArchiveBoxSnapshot[] = [];
  let offset = 0;

  while (out.length < limit) {
    const page = await call<Page<ArchiveBoxSnapshot>>(
      `/api/v1/core/snapshots?tag=${encodeURIComponent(tag)}&limit=100&offset=${offset}`,
    );
    const batch = page.items ?? [];
    out.push(...batch);
    offset += batch.length;
    if (batch.length === 0 || offset >= (page.total_items ?? 0)) break;
  }

  return out.slice(0, limit);
}
