"use client";

import { useState, useEffect, useCallback } from "react";
import { listArtworks, deleteArtwork, type Artwork, type ArtworkFilters } from "@/lib/api";

interface UseArtworksReturn {
  artworks: Artwork[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  remove: (id: string) => Promise<void>;
}

export function useArtworks(filters?: ArtworkFilters): UseArtworksReturn {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listArtworks(filters);
      setArtworks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar obras");
    } finally {
      setLoading(false);
    }
  }, [filters?.type, filters?.status, filters?.search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const remove = useCallback(async (id: string) => {
    await deleteArtwork(id);
    setArtworks((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return { artworks, loading, error, refetch: fetchData, remove };
}
