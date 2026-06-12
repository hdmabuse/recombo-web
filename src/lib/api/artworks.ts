import { apiFetch } from "./client";
import type { ArtworkType, ArtworkStatus } from "@prisma/client";

export interface Artwork {
  id: string;
  title: string;
  slug: string;
  type: ArtworkType;
  year: number | null;
  status: ArtworkStatus;
  thumbnail: string | null;
  artists: { artist: { name: string } }[];
  tags: string[];
  license: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArtworkFilters {
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export async function listArtworks(filters?: ArtworkFilters): Promise<Artwork[]> {
  const params = new URLSearchParams();
  if (filters?.type && filters.type !== "all") params.set("type", filters.type);
  if (filters?.status && filters.status !== "all") params.set("status", filters.status);
  if (filters?.page) params.set("page", String(filters.page));
  if (filters?.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return apiFetch<Artwork[]>(`/api/admin/artworks${qs ? `?${qs}` : ""}`);
}

export async function getArtwork(id: string) {
  return apiFetch(`/api/admin/artworks?id=${id}`);
}

export async function getArtworkBySlug(slug: string) {
  return apiFetch(`/api/admin/artworks?slug=${slug}`);
}

export async function createArtwork(data: Record<string, unknown>) {
  return apiFetch("/api/admin/artworks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateArtwork(data: Record<string, unknown>) {
  return apiFetch("/api/admin/artworks", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteArtwork(id: string): Promise<void> {
  await apiFetch(`/api/admin/artworks?id=${id}`, { method: "DELETE" });
}

// Public archive
export interface ArchiveFilters {
  search?: string;
  type?: string | null;
  year?: string | null;
  page?: number;
  limit?: number;
}

export interface ArchiveResponse {
  data: Artwork[];
  pagination: { page: number; perPage: number; total: number; pages: number };
  filters: { types: string[]; years: number[]; tags: { name: string; count: number }[] };
}

export async function listArchive(filters?: ArchiveFilters): Promise<ArchiveResponse> {
  const params = new URLSearchParams();
  params.set("page", String(filters?.page || 1));
  params.set("limit", String(filters?.limit || 12));
  if (filters?.search) params.set("search", filters.search);
  if (filters?.type) params.set("type", filters.type);
  if (filters?.year) params.set("year", filters.year);
  return apiFetch<ArchiveResponse>(`/api/arquivo?${params.toString()}`);
}
