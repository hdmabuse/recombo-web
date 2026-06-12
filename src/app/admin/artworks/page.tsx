"use client";

import { useState, useCallback, useMemo } from "react";
import { useArtworks } from "@/lib/hooks";
import { ArtworksView } from "@/components/composite/admin/ArtworksView";

const ITEMS_PER_PAGE = 20;

export default function ArtworksPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { artworks, loading, refetch, remove } = useArtworks();

  const filteredArtworks = useMemo(
    () =>
      artworks.filter((artwork) => {
        const matchesSearch =
          artwork.title.toLowerCase().includes(search.toLowerCase()) ||
          artwork.artists.some((a) => a.artist.name.toLowerCase().includes(search.toLowerCase()));
        const matchesStatus = filterStatus === "all" || artwork.status === filterStatus;
        const matchesType = filterType === "all" || artwork.type === filterType;
        return matchesSearch && matchesStatus && matchesType;
      }),
    [artworks, search, filterStatus, filterType],
  );

  const totalPages = Math.ceil(filteredArtworks.length / ITEMS_PER_PAGE);
  const paginatedArtworks = filteredArtworks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const showingFrom = filteredArtworks.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const showingTo = Math.min(currentPage * ITEMS_PER_PAGE, filteredArtworks.length);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm("Tem certeza que deseja excluir esta obra?")) return;
      await remove(id);
    },
    [remove],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setFilterStatus(value);
    setCurrentPage(1);
  }, []);

  const handleTypeChange = useCallback((value: string) => {
    setFilterType(value);
    setCurrentPage(1);
  }, []);

  return (
    <ArtworksView
      artworks={paginatedArtworks}
      loading={loading}
      search={search}
      filterStatus={filterStatus}
      filterType={filterType}
      currentPage={currentPage}
      totalPages={totalPages}
      showingFrom={showingFrom}
      showingTo={showingTo}
      totalFiltered={filteredArtworks.length}
      onSearchChange={handleSearchChange}
      onStatusChange={handleStatusChange}
      onTypeChange={handleTypeChange}
      onPageChange={setCurrentPage}
      onDelete={handleDelete}
      onClearFilters={() => {
        setSearch("");
        setFilterStatus("all");
        setFilterType("all");
        setCurrentPage(1);
      }}
    />
  );
}
