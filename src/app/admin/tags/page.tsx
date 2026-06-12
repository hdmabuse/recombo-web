"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { TagCategory } from "@prisma/client";

interface Tag {
  id: string;
  name: string;
  slug: string;
  category: TagCategory | null;
  color: string | null;
  count: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  theme: "Tema",
  technique: "Técnica",
  location: "Localização",
  period: "Período",
  project: "Projeto",
};

const CATEGORY_COLORS: Record<string, string> = {
  theme: "bg-blue-100 text-blue-700",
  technique: "bg-green-100 text-green-700",
  location: "bg-purple-100 text-purple-700",
  period: "bg-orange-100 text-orange-700",
  project: "bg-pink-100 text-pink-700",
};

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", category: "", color: "" });

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    const res = await fetch("/api/admin/tags");
    const data = await res.json();
    setTags(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const slug = form.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const payload = {
      name: form.name,
      slug,
      category: form.category || null,
      color: form.color || null,
    };

    const res = await fetch("/api/admin/tags", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
    });

    if (res.ok) {
      fetchTags();
      resetForm();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta tag?")) return;

    const res = await fetch(`/api/admin/tags?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchTags();
  }

  function handleEdit(tag: Tag) {
    setEditingId(tag.id);
    setForm({ name: tag.name, category: tag.category || "", color: tag.color || "" });
    setShowForm(true);
  }

  function resetForm() {
    setEditingId(null);
    setShowForm(false);
    setForm({ name: "", category: "", color: "" });
  }

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Tags</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Nova Tag
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900">
              {editingId ? "Editar Tag" : "Nova Tag"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700">Nome</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700">Categoria</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                >
                  <option value="">Sem categoria</option>
                  <option value="theme">Tema</option>
                  <option value="technique">Técnica</option>
                  <option value="location">Localização</option>
                  <option value="period">Período</option>
                  <option value="project">Projeto</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700">Cor</label>
                <input
                  type="text"
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder="#FF0000"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-800"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tags List */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between rounded-md border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-sm"
          >
            <div>
              <div className="font-medium text-zinc-900">{tag.name}</div>
              <div className="mt-1 flex items-center gap-2">
                {tag.category && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${CATEGORY_COLORS[tag.category]}`}
                  >
                    {CATEGORY_LABELS[tag.category]}
                  </span>
                )}
                <span className="text-xs text-zinc-400">{tag.count} itens</span>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handleEdit(tag)}
                className="p-1 text-zinc-400 hover:text-amber-600"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(tag.id)}
                className="p-1 text-zinc-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {tags.length === 0 && (
          <div className="col-span-full py-8 text-center text-zinc-500">Nenhuma tag encontrada</div>
        )}
      </div>
    </div>
  );
}
