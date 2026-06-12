"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArtworkType, ArtworkStatus, AccessLevel } from "@prisma/client";
import { DynamicForm } from "@/components/composite/admin/DynamicForm";
import { UploadButton } from "@/components/composite/admin/UploadButton";

interface Artwork {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  type: ArtworkType;
  medium: string | null;
  genres: string[];
  year: number | null;
  yearStart: number | null;
  yearEnd: number | null;
  thumbnail: string | null;
  fileUrl: string | null;
  fileType: string | null;
  fileSize: number | null;
  duration: number | null;
  dimensions: string | null;
  license: string;
  accessLevel: AccessLevel;
  status: ArtworkStatus;
  tags: string[];
  customFields: Record<string, unknown> | null;
}

interface Artist {
  id: string;
  name: string;
}

export default function EditArtworkPage() {
  const router = useRouter();
  const params = useParams();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [customFieldsValues, setCustomFieldsValues] = useState<Record<string, unknown>>({});

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    type: "image" as ArtworkType,
    medium: "",
    genres: "",
    year: "",
    thumbnail: "",
    fileUrl: "",
    license: "LUCR",
    accessLevel: "public" as AccessLevel,
    status: "draft" as ArtworkStatus,
    tags: "",
    artistIds: [] as string[],
    artistRoles: [] as string[],
  });

  useEffect(() => {
    async function fetchData() {
      const [artworkRes, artistsRes] = await Promise.all([
        fetch(`/api/admin/artworks?id=${params.id}`),
        fetch("/api/admin/artists"),
      ]);

      if (!artworkRes.ok) {
        router.push("/admin/artworks");
        return;
      }

      const artworkData = await artworkRes.json();
      const artistsData = await artistsRes.json();

      setArtwork(artworkData);
      setArtists(artistsData);

      setForm({
        title: artworkData.title || "",
        slug: artworkData.slug || "",
        description: artworkData.description || "",
        shortDescription: artworkData.shortDescription || "",
        type: artworkData.type || "image",
        medium: artworkData.medium || "",
        genres: (artworkData.genres || []).join(", "),
        year: artworkData.year?.toString() || "",
        thumbnail: artworkData.thumbnail || "",
        fileUrl: artworkData.fileUrl || "",
        license: artworkData.license || "LUCR",
        accessLevel: artworkData.accessLevel || "public",
        status: artworkData.status || "draft",
        tags: (artworkData.tags || []).join(", "),
        artistIds: artworkData.artists?.map((a: { artistId: string }) => a.artistId) || [],
        artistRoles: artworkData.artists?.map((a: { role: string }) => a.role || "criador") || [],
      });

      if (artworkData.customFields) {
        setCustomFieldsValues(artworkData.customFields);
      }

      setLoading(false);
    }
    fetchData();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      id: params.id,
      ...form,
      year: form.year ? parseInt(form.year) : null,
      genres: form.genres ? form.genres.split(",").map((g) => g.trim()) : [],
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
      customFields: customFieldsValues,
      artists: form.artistIds.map((id, i) => ({
        artistId: id,
        role: form.artistRoles[i] || "criador",
      })),
    };

    const res = await fetch("/api/admin/artworks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/artworks");
    } else {
      alert("Erro ao atualizar obra");
      setSaving(false);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!artwork) return null;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Editar Obra</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-md border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Informações Básicas</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Título *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-zinc-700">Descrição Curta</label>
            <input
              type="text"
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Descrição Completa
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
        </div>

        <div className="rounded-md border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Classificação</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Tipo</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as ArtworkType })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                <option value="image">Imagem</option>
                <option value="video">Vídeo</option>
                <option value="audio">Áudio</option>
                <option value="text">Texto</option>
                <option value="installation">Instalação</option>
                <option value="performance">Performance</option>
                <option value="website">Website</option>
                <option value="software">Software</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Técnica/Meio</label>
              <input
                type="text"
                value={form.medium}
                onChange={(e) => setForm({ ...form, medium: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Ano</label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Gêneros (separados por vírgula)
            </label>
            <input
              type="text"
              value={form.genres}
              onChange={(e) => setForm({ ...form, genres: e.target.value })}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
        </div>

        <div className="rounded-md border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Arquivos e Mídia</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">
                Thumbnail (URL ou upload)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={form.thumbnail}
                  onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                  className="flex-1 rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder="https://..."
                />
                <UploadButton
                  onUpload={(url) => setForm({ ...form, thumbnail: url })}
                  accept="image/*"
                />
              </div>
              {form.thumbnail && (
                <div className="mt-2">
                  <img
                    src={form.thumbnail}
                    alt="Thumbnail preview"
                    className="h-32 w-32 rounded object-cover"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">
                Arquivo Principal (URL ou upload)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={form.fileUrl}
                  onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                  className="flex-1 rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder="https://..."
                />
                <UploadButton
                  onUpload={(url) => setForm({ ...form, fileUrl: url })}
                  accept="image/*,audio/*,video/*"
                />
              </div>
              {form.fileUrl && (
                <p className="mt-2 truncate text-sm text-zinc-500">{form.fileUrl}</p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-md border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Artistas</h2>

          {artists.length > 0 ? (
            <div className="space-y-2">
              {artists.map((artist) => {
                const idx = form.artistIds.indexOf(artist.id);
                return (
                  <div
                    key={artist.id}
                    className="flex items-center gap-3 rounded p-2 hover:bg-zinc-50"
                  >
                    <input
                      type="checkbox"
                      checked={idx !== -1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setForm({
                            ...form,
                            artistIds: [...form.artistIds, artist.id],
                            artistRoles: [...form.artistRoles, "criador"],
                          });
                        } else {
                          setForm({
                            ...form,
                            artistIds: form.artistIds.filter((id) => id !== artist.id),
                            artistRoles: form.artistRoles.filter((_, i) => i !== idx),
                          });
                        }
                      }}
                      className="rounded"
                    />
                    <span className="flex-1 text-sm text-zinc-700">{artist.name}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">Nenhum artista cadastrado.</p>
          )}
        </div>

        <div className="rounded-md border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Publicação</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ArtworkStatus })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
                <option value="archived">Arquivado</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Licença</label>
              <select
                value={form.license}
                onChange={(e) => setForm({ ...form, license: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                <option value="LUCR">Todos os direitos reservados</option>
                <option value="CC0">Domínio público</option>
                <option value="CCBY">CC BY</option>
                <option value="CCBYSA">CC BY-SA</option>
                <option value="CCBYNC">CC BY-NC</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Acesso</label>
              <select
                value={form.accessLevel}
                onChange={(e) => setForm({ ...form, accessLevel: e.target.value as AccessLevel })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                <option value="public">Público</option>
                <option value="private">Privado</option>
                <option value="restricted">Restrito</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Tags (separadas por vírgula)
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
        </div>

        <DynamicForm
          entity="Artwork"
          values={customFieldsValues}
          onChange={setCustomFieldsValues}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/artworks")}
            className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
