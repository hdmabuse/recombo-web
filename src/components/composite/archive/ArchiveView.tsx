"use client";

import Link from "next/link";
import { Search, Filter, Music, Video, Image, FileText, X } from "lucide-react";
import { type Artwork } from "@/lib/api";
import { Card } from "@/components/ui";
import { LoadingSkeleton } from "@/components/ui/Loading";

const TYPE_ICONS: Record<string, any> = {
  audio: Music,
  video: Video,
  image: Image,
  text: FileText,
  installation: FileText,
  performance: FileText,
  website: FileText,
  software: FileText,
};

interface ArchiveViewProps {
  artworks: Artwork[];
  loading: boolean;
  total: number;
  search: string;
  selectedType: string | null;
  selectedYear: string | null;
  availableYears: number[];
  isFiltersOpen: boolean;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onTypeChange: (type: string | null) => void;
  onYearChange: (year: string | null) => void;
  onToggleFilters: () => void;
  onClearFilters: () => void;
}

export function ArchiveView({
  artworks,
  loading,
  total,
  search,
  selectedType,
  selectedYear,
  availableYears,
  isFiltersOpen,
  onSearchChange,
  onSearchSubmit,
  onTypeChange,
  onYearChange,
  onToggleFilters,
  onClearFilters,
}: ArchiveViewProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900">Acervo</h1>
          <p className="text-zinc-600">
            Explore as obras, performances e arquivos do coletivo Re:combo
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Buscar obras..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSearchSubmit()}
                    className="w-full rounded-md border border-zinc-200 py-2 pl-9 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Tipo</label>
                <div className="space-y-2">
                  <button
                    onClick={() => onTypeChange(null)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      !selectedType ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    Todos
                  </button>
                  {Object.entries(TYPE_ICONS)
                    .slice(0, 6)
                    .map(([type, Icon]) => (
                      <button
                        key={type}
                        onClick={() => onTypeChange(type)}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          selectedType === type
                            ? "bg-zinc-900 text-white"
                            : "text-zinc-600 hover:bg-zinc-100"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Ano</label>
                <div className="space-y-1">
                  <button
                    onClick={() => onYearChange(null)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      !selectedYear ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    Todos
                  </button>
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => onYearChange(year.toString())}
                      className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        selectedYear === year.toString()
                          ? "bg-zinc-900 text-white"
                          : "text-zinc-600 hover:bg-zinc-100"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-4 lg:hidden">
              <button
                onClick={onToggleFilters}
                className="flex items-center gap-2 rounded-md border border-zinc-200 px-4 py-2 text-sm"
              >
                <Filter className="h-4 w-4" />
                Filtros
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-zinc-500">
                {loading ? "Carregando..." : `${total} resultados encontrados`}
              </p>
            </div>

            {loading ? (
              <LoadingSkeleton />
            ) : artworks.length > 0 ? (
              <div className="stagger-children grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {artworks.map((artwork) => {
                  const Icon = TYPE_ICONS[artwork.type] || FileText;
                  return (
                    <Link
                      key={artwork.id}
                      href={`/obra/${artwork.slug}`}
                      className="group overflow-hidden rounded-lg border border-zinc-200 bg-white transition-all hover:border-zinc-900 hover:shadow-lg"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                        {artwork.thumbnail ? (
                          <img
                            src={artwork.thumbnail}
                            alt={artwork.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
                            <Icon className="h-12 w-12 text-zinc-300" />
                          </div>
                        )}
                        <div className="absolute right-2 top-2 flex items-center gap-1 rounded bg-zinc-900/80 px-2 py-1 text-xs text-white">
                          <Icon className="h-3 w-3" />
                          {artwork.type}
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="mb-1 text-xs text-zinc-500">{artwork.year}</p>
                        <h3 className="mb-2 line-clamp-1 font-semibold text-zinc-900 group-hover:text-zinc-700">
                          {artwork.title}
                        </h3>
                        <p className="text-xs text-zinc-500">
                          {artwork.artists.map((a) => a.artist.name).join(", ")}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="mb-4 text-zinc-500">Nenhuma obra encontrada</p>
                <button onClick={onClearFilters} className="text-sm text-zinc-900 hover:underline">
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
