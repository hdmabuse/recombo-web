"use client";

import { useState, useEffect, useCallback } from "react";
import { listArchive, type ArchiveResponse, type ArchiveFilters } from "@/lib/api";

interface UseArchiveReturn {
  data: ArchiveResponse["data"];
  pagination: ArchiveResponse["pagination"];
  filters: ArchiveResponse["filters"];
  loading: boolean;
  error: string | null;
  refetch: (page?: number) => void;
}

export function useArchive(initialFilters?: ArchiveFilters): UseArchiveReturn {
  const [data, setData] = useState<ArchiveResponse["data"]>([]);
  const [pagination, setPagination] = useState({ page: 1, perPage: 12, total: 0, pages: 1 });
  const [filters, setFilters] = useState<ArchiveResponse["filters"]>({
    types: [],
    years: [],
    tags: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (page?: number) => {
      setLoading(true);
      setError(null);
      try {
        const result = await listArchive({
          ...initialFilters,
          page: page || initialFilters?.page || 1,
        });
        setData(result.data);
        setPagination(result.pagination);
        setFilters(result.filters);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar acervo");
      } finally {
        setLoading(false);
      }
    },
    [initialFilters?.search, initialFilters?.type, initialFilters?.year],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, pagination, filters, loading, error, refetch: fetchData };
}
