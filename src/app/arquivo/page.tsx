"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useArchive } from "@/lib/hooks";
import { ArchiveView } from "@/components/composite/archive/ArchiveView";

function ArquivoPageInner() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedType, setSelectedType] = useState<string | null>(searchParams.get("type"));
  const [selectedYear, setSelectedYear] = useState<string | null>(searchParams.get("year"));
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { data, pagination, filters, loading, refetch } = useArchive({
    type: selectedType,
    year: selectedYear,
  });

  useEffect(() => {
    refetch();
  }, [selectedType, selectedYear, refetch]);

  const handleSearch = useCallback(() => {
    refetch(1);
  }, [refetch]);

  const handleTypeChange = useCallback((type: string | null) => {
    setSelectedType(type);
  }, []);

  const handleYearChange = useCallback((year: string | null) => {
    setSelectedYear(year);
  }, []);

  return (
    <ArchiveView
      artworks={data}
      loading={loading}
      total={pagination.total}
      search={search}
      selectedType={selectedType}
      selectedYear={selectedYear}
      availableYears={filters.years}
      isFiltersOpen={isFiltersOpen}
      onSearchChange={setSearch}
      onSearchSubmit={handleSearch}
      onTypeChange={handleTypeChange}
      onYearChange={handleYearChange}
      onToggleFilters={() => setIsFiltersOpen((v) => !v)}
      onClearFilters={() => {
        setSearch("");
        setSelectedType(null);
        setSelectedYear(null);
      }}
    />
  );
}

export default function ArquivoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50" />}>
      <ArquivoPageInner />
    </Suspense>
  );
}
