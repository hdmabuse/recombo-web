"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DynamicForm } from "@/components/composite/admin/DynamicForm";

export default function NewArtistPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customFieldsValues, setCustomFieldsValues] = useState<Record<string, unknown>>({});

  const [form, setForm] = useState({
    name: "",
    pseudonym: "",
    bio: "",
    bioShort: "",
    photo: "",
    email: "",
    website: "",
    socialTwitter: "",
    socialInstagram: "",
    roles: "",
    period: "",
    birthDate: "",
    birthPlace: "",
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const social: Record<string, string> = {};
    if (form.socialTwitter) social.twitter = form.socialTwitter;
    if (form.socialInstagram) social.instagram = form.socialInstagram;

    const payload = {
      name: form.name,
      pseudonym: form.pseudonym || null,
      bio: form.bio || null,
      bioShort: form.bioShort || null,
      photo: form.photo || null,
      email: form.email || null,
      website: form.website || null,
      social: Object.keys(social).length > 0 ? social : null,
      roles: form.roles ? form.roles.split(",").map((r) => r.trim()) : [],
      period: form.period || null,
      birthDate: form.birthDate || null,
      birthPlace: form.birthPlace || null,
      customFields: customFieldsValues,
    };

    const res = await fetch("/api/admin/artists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/artists");
    } else {
      alert("Erro ao criar artista");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Novo Artista</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="rounded-md border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Informações Básicas</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Nome *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Pseudônimo</label>
              <input
                type="text"
                value={form.pseudonym}
                onChange={(e) => setForm({ ...form, pseudonym: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-zinc-700">Foto (URL)</label>
            <input
              type="url"
              value={form.photo}
              onChange={(e) => setForm({ ...form, photo: e.target.value })}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="https://..."
            />
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-zinc-700">Biografia Curta</label>
            <input
              type="text"
              value={form.bioShort}
              onChange={(e) => setForm({ ...form, bioShort: e.target.value })}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="Breve descrição para listagens"
            />
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Biografia Completa
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={6}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-md border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Contato</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Website</label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Twitter</label>
              <input
                type="text"
                value={form.socialTwitter}
                onChange={(e) => setForm({ ...form, socialTwitter: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Instagram</label>
              <input
                type="text"
                value={form.socialInstagram}
                onChange={(e) => setForm({ ...form, socialInstagram: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="@username"
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="rounded-md border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Detalhes</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">
                Funções (separadas por vírgula)
              </label>
              <input
                type="text"
                value={form.roles}
                onChange={(e) => setForm({ ...form, roles: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="artista, curador, pesquisador"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Período</label>
              <input
                type="text"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="1990-presente"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">
                Data de Nascimento
              </label>
              <input
                type="date"
                value={form.birthDate}
                onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">
                Local de Nascimento
              </label>
              <input
                type="text"
                value={form.birthPlace}
                onChange={(e) => setForm({ ...form, birthPlace: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          </div>
        </div>

        {/* Custom Fields */}
        <DynamicForm entity="Artist" values={customFieldsValues} onChange={setCustomFieldsValues} />

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar Artista"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/artists")}
            className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
