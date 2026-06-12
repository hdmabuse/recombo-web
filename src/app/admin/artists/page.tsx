"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Trash2, Edit, Eye } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  slug: string;
  pseudonym: string | null;
  photo: string | null;
  roles: string[];
  createdAt: string;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchArtists();
  }, []);

  async function fetchArtists() {
    const res = await fetch("/api/admin/artists");
    const data = await res.json();
    setArtists(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este artista?")) return;

    const res = await fetch(`/api/admin/artists?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchArtists();
    }
  }

  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(search.toLowerCase()) ||
      artist.pseudonym?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Artistas</h1>
        <Link
          href="/admin/artists/new"
          className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Novo Artista
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-md border border-zinc-200 bg-white p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar artistas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-zinc-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredArtists.map((artist) => (
          <div
            key={artist.id}
            className="overflow-hidden rounded-md border border-zinc-200 bg-white transition-shadow hover:shadow-md"
          >
            {artist.photo && (
              <div className="aspect-square bg-zinc-100">
                <img src={artist.photo} alt={artist.name} className="h-full w-full object-cover" />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-zinc-900">{artist.name}</h3>
              {artist.pseudonym && <p className="text-sm text-zinc-500">aka {artist.pseudonym}</p>}
              {artist.roles.length > 0 && (
                <p className="mt-1 text-xs text-zinc-400">{artist.roles.join(", ")}</p>
              )}
              <div className="mt-3 flex items-center justify-end gap-1 border-t border-zinc-100 pt-3">
                <Link
                  href={`/artista/${artist.slug}`}
                  target="_blank"
                  className="p-1 text-zinc-400 hover:text-zinc-600"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <Link
                  href={`/admin/artists/${artist.id}/edit`}
                  className="p-1 text-zinc-400 hover:text-amber-600"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(artist.id)}
                  className="p-1 text-zinc-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredArtists.length === 0 && (
          <div className="col-span-full py-8 text-center text-zinc-500">
            Nenhum artista encontrado
          </div>
        )}
      </div>
    </div>
  );
}
