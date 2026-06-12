"use client";

import Link from "next/link";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Music,
  Video,
  Image,
  FileText,
  Wrench,
  Play,
  Globe,
  Code,
} from "lucide-react";
import { type Artwork } from "@/lib/api";
import {
  Button,
  Input,
  Select,
  Badge,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Pagination,
  EmptyState,
  LoadingSpinner,
} from "@/components/ui";
import type { ArtworkType, ArtworkStatus } from "@prisma/client";

const TYPE_ICONS: Record<string, React.ElementType> = {
  audio: Music,
  video: Video,
  image: Image,
  text: FileText,
  installation: Wrench,
  performance: Play,
  website: Globe,
  software: Code,
};

const TYPE_LABELS: Record<string, string> = {
  audio: "Áudio",
  video: "Vídeo",
  image: "Imagem",
  text: "Texto",
  installation: "Instalação",
  performance: "Performance",
  website: "Website",
  software: "Software",
};

const STATUS_OPTIONS = [
  { value: "all", label: "Todos os status" },
  { value: "draft", label: "Rascunho" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Arquivado" },
];

const TYPE_OPTIONS = [
  { value: "all", label: "Todos os tipos" },
  ...Object.entries(TYPE_LABELS).map(([value, label]) => ({ value, label })),
];

interface ArtworksViewProps {
  artworks: Artwork[];
  loading: boolean;
  search: string;
  filterStatus: string;
  filterType: string;
  currentPage: number;
  totalPages: number;
  showingFrom: number;
  showingTo: number;
  totalFiltered: number;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  onClearFilters: () => void;
}

export function ArtworksView({
  artworks,
  loading,
  search,
  filterStatus,
  filterType,
  currentPage,
  totalPages,
  showingFrom,
  showingTo,
  totalFiltered,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onPageChange,
  onDelete,
  onClearFilters,
}: ArtworksViewProps) {
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Obras</h1>
        <Link href="/admin/artworks/new">
          <Button>
            <Plus className="h-4 w-4" />
            Nova Obra
          </Button>
        </Link>
      </div>

      <div className="mb-6 rounded-md border border-zinc-200 bg-white p-4">
        <div className="flex flex-wrap gap-4">
          <div className="min-w-[200px] flex-1">
            <Input
              placeholder="Buscar obras..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              icon={<Search className="h-4 w-4 text-zinc-400" />}
            />
          </div>
          <Select
            value={filterStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            options={STATUS_OPTIONS}
            className="w-auto min-w-[160px]"
          />
          <Select
            value={filterType}
            onChange={(e) => onTypeChange(e.target.value)}
            options={TYPE_OPTIONS}
            className="w-auto min-w-[160px]"
          />
        </div>
      </div>

      <Table>
        <Thead>
          <Tr>
            <Th>Tipo</Th>
            <Th>Título</Th>
            <Th>Artistas</Th>
            <Th>Ano</Th>
            <Th>Status</Th>
            <Th className="text-right">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {artworks.length === 0 ? (
            <Tr>
              <Td colSpan={6} className="py-8 text-center text-zinc-500">
                Nenhuma obra encontrada
              </Td>
            </Tr>
          ) : (
            artworks.map((artwork) => {
              const TypeIcon = TYPE_ICONS[artwork.type] || Image;
              const statusColor =
                artwork.status === "published"
                  ? "green"
                  : artwork.status === "archived"
                    ? "yellow"
                    : "default";

              return (
                <Tr key={artwork.id}>
                  <Td>
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100">
                      <TypeIcon className="h-4 w-4 text-zinc-600" />
                    </div>
                  </Td>
                  <Td>
                    <div className="font-medium text-zinc-900">{artwork.title}</div>
                    <div className="text-xs text-zinc-500">{TYPE_LABELS[artwork.type]}</div>
                  </Td>
                  <Td className="text-zinc-600">
                    {artwork.artists.map((a) => a.artist.name).join(", ") || "—"}
                  </Td>
                  <Td className="text-zinc-600">{artwork.year || "—"}</Td>
                  <Td>
                    <Badge variant={statusColor as any}>
                      {artwork.status === "draft"
                        ? "Rascunho"
                        : artwork.status === "published"
                          ? "Publicado"
                          : "Arquivado"}
                    </Badge>
                  </Td>
                  <Td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/obra/${artwork.slug}`}
                        target="_blank"
                        className="p-1 text-zinc-400 transition-colors hover:text-zinc-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/artworks/${artwork.id}/edit`}
                        className="p-1 text-zinc-400 transition-colors hover:text-amber-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => onDelete(artwork.id)}
                        className="p-1 text-zinc-400 transition-colors hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          total={totalFiltered}
          showingFrom={showingFrom}
          showingTo={showingTo}
        />
      </Table>
    </div>
  );
}
