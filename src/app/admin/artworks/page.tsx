"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, Search, Filter, MoreVertical, Trash2, Edit, Eye,
  Music, Video, Image, FileText, Wrench, Play, Globe, Code,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { ArtworkType, ArtworkStatus } from "@prisma/client";

interface Artwork {
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

const TYPE_ICONS: Record<string, any> = {
  audio: Music,
  video: Video,
  image: Image,
  text: FileText,
  installation: Wrench,
  performance: Play,
  website: Globe,
  software: Code,
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: "Rascunho", color: "bg-zinc-100 text-zinc-600" },
  published: { label: "Publicado", color: "bg-green-100 text-green-700" },
  archived: { label: "Arquivado", color: "bg-yellow-100 text-yellow-700" },
};

const MOCK_ARTWORKS: Artwork[] = [
  {
    id: "1",
    title: "Call for Noise",
    slug: "call-for-noise",
    type: "performance",
    year: 2002,
    status: "published",
    thumbnail: null,
    artists: [{ artist: { name: "Coletivo Re:combo" } }],
    tags: ["performance", "net.art"],
    license: "LUCR",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-05-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Rádio Re:combo",
    slug: "radio-recombo",
    type: "audio",
    year: 2004,
    status: "published",
    thumbnail: null,
    artists: [{ artist: { name: "H.D. Mabuse" } }, { artist: { name: "Haidée Lima" } }],
    tags: ["audio", "software"],
    license: "LUCR",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-04-15T10:00:00Z",
  },
  {
    id: "3",
    title: "Constelações",
    slug: "constelacoes",
    type: "image",
    year: 2004,
    status: "published",
    thumbnail: null,
    artists: [{ artist: { name: "Coletivo Re:combo" } }],
    tags: ["installation", "sms"],
    license: "LUCR",
    createdAt: "2025-01-05T10:00:00Z",
    updatedAt: "2025-03-20T10:00:00Z",
  },
  {
    id: "4",
    title: "Mundo Pequeno",
    slug: "mundo-pequeno",
    type: "installation",
    year: 2006,
    status: "draft",
    thumbnail: null,
    artists: [{ artist: { name: "Coletivo Re:combo" } }],
    tags: ["mamam", "exposição"],
    license: "LUCR",
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-01T10:00:00Z",
  },
  {
    id: "5",
    title: "Pause and Play",
    slug: "pause-and-play",
    type: "performance",
    year: 2004,
    status: "published",
    thumbnail: null,
    artists: [{ artist: { name: "Coletivo Re:combo" } }],
    tags: ["telepresença", "weimar"],
    license: "LUCR",
    createdAt: "2024-12-20T10:00:00Z",
    updatedAt: "2025-02-10T10:00:00Z",
  },
  {
    id: "6",
    title: "Transloc Mixer",
    slug: "transloc-mixer",
    type: "audio",
    year: 2003,
    status: "published",
    thumbnail: null,
    artists: [{ artist: { name: "Coletivo Re:combo" } }],
    tags: ["walker", "minneapolis"],
    license: "CC-BY",
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2025-01-30T10:00:00Z",
  },
];

export default function AdminArtworksPage() {
  const [artworks] = useState<Artwork[]>(MOCK_ARTWORKS);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter artworks
  const filteredArtworks = artworks.filter((artwork) => {
    const matchesSearch = artwork.title.toLowerCase().includes(search.toLowerCase()) ||
      artwork.artists.some((a) => a.artist.name.toLowerCase().includes(search.toLowerCase()));
    const matchesType = !selectedType || artwork.type === selectedType;
    const matchesStatus = !selectedStatus || artwork.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const paginatedArtworks = filteredArtworks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  
  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedArtworks.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedArtworks.map((a) => a.id));
    }
  };
  
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">Gerenciar Acervo</h1>
              <p className="text-sm text-zinc-500 mt-1">
                {filteredArtworks.length} obras encontradas
              </p>
            </div>
            <Link
              href="/admin/artworks/new"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800"
            >
              <Plus className="w-4 h-4" />
              Nova Obra
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="bg-white rounded-lg border border-zinc-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar por título ou artista..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-zinc-300 rounded-md text-sm"
              />
            </div>
            
            {/* Type Filter */}
            <select
              value={selectedType || ""}
              onChange={(e) => setSelectedType(e.target.value || null)}
              className="px-3 py-2 border border-zinc-300 rounded-md text-sm"
            >
              <option value="">Todos os tipos</option>
              <option value="audio">Áudio</option>
              <option value="video">Vídeo</option>
              <option value="image">Imagem</option>
              <option value="text">Texto</option>
              <option value="installation">Instalação</option>
              <option value="performance">Performance</option>
              <option value="website">Website</option>
              <option value="software">Software</option>
            </select>
            
            {/* Status Filter */}
            <select
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
              className="px-3 py-2 border border-zinc-300 rounded-md text-sm"
            >
              <option value="">Todos os status</option>
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="bg-zinc-900 text-white px-4 py-2 rounded-lg mb-4 flex items-center justify-between">
            <span>{selectedItems.length} selecionados</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-zinc-800 rounded hover:bg-zinc-700">
                Alterar Tags
              </button>
              <button className="px-3 py-1 text-sm bg-zinc-800 rounded hover:bg-zinc-700">
                Alterar Licença
              </button>
              <button className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-500">
                Excluir
              </button>
            </div>
          </div>
        )}
        
        {/* Table */}
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === paginatedArtworks.length && paginatedArtworks.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase">
                  Obra
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase">
                  Ano
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase">
                  Licença
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {paginatedArtworks.map((artwork) => {
                const Icon = TYPE_ICONS[artwork.type] || FileText;
                const statusInfo = STATUS_LABELS[artwork.status];
                
                return (
                  <tr key={artwork.id} className="hover:bg-zinc-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(artwork.id)}
                        onChange={() => toggleSelect(artwork.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-100 rounded flex items-center justify-center">
                          <Icon className="w-5 h-5 text-zinc-400" />
                        </div>
                        <div>
                          <p className="font-medium text-zinc-900">{artwork.title}</p>
                          <p className="text-sm text-zinc-500">
                            {artwork.artists.map((a) => a.artist.name).join(", ")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-zinc-600 capitalize">{artwork.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-zinc-600">{artwork.year}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-zinc-600">{artwork.license}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/obra/${artwork.slug}`}
                          className="p-1 text-zinc-400 hover:text-zinc-600"
                          title="Ver"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/artworks/${artwork.id}/edit`}
                          className="p-1 text-zinc-400 hover:text-zinc-600"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-1 text-zinc-400 hover:text-red-600"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-zinc-200 flex items-center justify-between">
              <p className="text-sm text-zinc-500">
                Página {currentPage} de {totalPages}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded hover:bg-zinc-100 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded text-sm ${
                      currentPage === i + 1
                        ? "bg-zinc-900 text-white"
                        : "hover:bg-zinc-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded hover:bg-zinc-100 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}