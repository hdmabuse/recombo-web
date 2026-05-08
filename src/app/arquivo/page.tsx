"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Music, Video, Image, FileText, X } from "lucide-react";

const MOCK_ARTWORKS = [
  {
    id: "1",
    slug: "call-for-noise",
    title: "Call for Noise",
    year: 2002,
    type: "performance",
    thumbnail: "/placeholder.jpg",
    artists: [{ name: "Coletivo Re:combo" }],
  },
  {
    id: "2",
    slug: "radio-recombo",
    title: "Rádio Re:combo",
    year: 2004,
    type: "audio",
    thumbnail: "/placeholder.jpg",
    artists: [{ name: "H.D. Mabuse" }, { name: "Haidée Lima" }],
  },
  {
    id: "3",
    slug: "constelacoes",
    title: "Constelações",
    year: 2004,
    type: "image",
    thumbnail: "/placeholder.jpg",
    artists: [{ name: "Coletivo Re:combo" }],
  },
  {
    id: "4",
    slug: "mundo-pequeno",
    title: "Mundo Pequeno",
    year: 2006,
    type: "installation",
    thumbnail: "/placeholder.jpg",
    artists: [{ name: "Coletivo Re:combo" }],
  },
  {
    id: "5",
    slug: "pause-and-play",
    title: "Pause and Play",
    year: 2004,
    type: "performance",
    thumbnail: "/placeholder.jpg",
    artists: [{ name: "Coletivo Re:combo" }],
  },
  {
    id: "6",
    slug: "transloc-mixer",
    title: "Transloc Mixer",
    year: 2003,
    type: "audio",
    thumbnail: "/placeholder.jpg",
    artists: [{ name: "Coletivo Re:combo" }],
  },
  {
    id: "7",
    slug: "arte-eletronica",
    title: "Arte Eletrônica",
    year: 2003,
    type: "video",
    thumbnail: "/placeholder.jpg",
    artists: [{ name: "Coletivo Re:combo" }, { name: "Retinantz" }],
  },
  {
    id: "8",
    slug: "chamada-de-ruidos",
    title: "Chamada de Ruídos",
    year: 2002,
    type: "performance",
    thumbnail: "/placeholder.jpg",
    artists: [{ name: "Coletivo Re:combo" }],
  },
];

const TYPE_ICONS = {
  audio: Music,
  video: Video,
  image: Image,
  text: FileText,
  performance: FileText,
  installation: FileText,
};

export default function ArquivoPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filteredArtworks = MOCK_ARTWORKS.filter((artwork) => {
    const matchesSearch = artwork.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = !selectedType || artwork.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Acervo</h1>
          <p className="text-zinc-600">
            Explore as obras, performances e arquivos do coletivo Re:combo
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium text-zinc-700 mb-2 block">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Buscar obras..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="text-sm font-medium text-zinc-700 mb-2 block">
                  Tipo
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      !selectedType
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    Todos
                  </button>
                  {Object.entries(TYPE_ICONS).map(([type, Icon]) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                        selectedType === type
                          ? "bg-zinc-900 text-white"
                          : "text-zinc-600 hover:bg-zinc-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <label className="text-sm font-medium text-zinc-700 mb-2 block">
                  Ano
                </label>
                <div className="space-y-1">
                  {[2002, 2003, 2004, 2005, 2006, 2007, 2008].map((year) => (
                    <button
                      key={year}
                      className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-600 hover:bg-zinc-100"
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-md text-sm"
              >
                <Filter className="w-4 h-4" />
                Filtros
              </button>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-zinc-500">
                {filteredArtworks.length} resultados encontrados
              </p>
            </div>

            {/* Grid */}
            {filteredArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {filteredArtworks.map((artwork) => {
                  const Icon = TYPE_ICONS[artwork.type as keyof typeof TYPE_ICONS] || FileText;
                  return (
                    <Link
                      key={artwork.id}
                      href={`/obra/${artwork.slug}`}
                      className="group bg-white rounded-lg overflow-hidden border border-zinc-200 hover:border-zinc-900 hover:shadow-lg transition-all"
                    >
                      <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
                          <Icon className="w-12 h-12 text-zinc-300" />
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-1 bg-zinc-900/80 text-white text-xs rounded flex items-center gap-1">
                          <Icon className="w-3 h-3" />
                          {artwork.type}
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-zinc-500 mb-1">{artwork.year}</p>
                        <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 mb-2 line-clamp-1">
                          {artwork.title}
                        </h3>
                        <p className="text-xs text-zinc-500">
                          {artwork.artists.map((a) => a.name).join(", ")}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-zinc-500 mb-4">Nenhuma obra encontrada</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedType(null);
                  }}
                  className="text-sm text-zinc-900 hover:underline"
                >
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