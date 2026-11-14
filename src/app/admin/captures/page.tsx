"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Archive, ExternalLink, Loader2, Save, Search } from "lucide-react";

type CaptureStatus = "inbox" | "selected" | "published" | "rejected";
type AccessLevel = "public" | "private" | "restricted";

type CaptureItem = {
  snapshotId: string;
  url: string;
  title: string;
  archivedTitle: string | null;
  capturedAt: string | null;
  size: number;
  tags: string[];
  note: string;
  status: CaptureStatus;
  accessLevel: AccessLevel;
  license: string;
};

const STATUS_LABELS: Record<CaptureStatus, string> = {
  inbox: "Caixa de entrada",
  selected: "Selecionada",
  published: "Publicada",
  rejected: "Descartada",
};

const STATUS_STYLES: Record<CaptureStatus, string> = {
  inbox: "bg-zinc-100 text-zinc-600",
  selected: "bg-blue-100 text-blue-700",
  published: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminCapturesPage() {
  const [items, setItems] = useState<CaptureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CaptureStatus | "all">("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/captures", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha ao carregar");
      setItems(data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const update = (snapshotId: string, patch: Partial<CaptureItem>) => {
    setItems((prev) => prev.map((i) => (i.snapshotId === snapshotId ? { ...i, ...patch } : i)));
  };

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((i) => {
      if (filter !== "all" && i.status !== filter) return false;
      if (!q) return true;
      return (
        i.title.toLowerCase().includes(q) ||
        i.url.toLowerCase().includes(q) ||
        i.note.toLowerCase().includes(q)
      );
    });
  }, [items, filter, search]);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/captures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            snapshotId: i.snapshotId,
            url: i.url,
            title: i.title,
            note: i.note,
            capturedAt: i.capturedAt,
            status: i.status,
            accessLevel: i.accessLevel,
            license: i.license,
            tags: i.tags,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha ao salvar");
      setMessage(`${data.saved} capturas salvas`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setSaving(false);
    }
  };

  const counts = useMemo(() => {
    const c = { inbox: 0, selected: 0, published: 0, rejected: 0 };
    items.forEach((i) => c[i.status]++);
    return c;
  }, [items]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                <Archive className="w-5 h-5" /> Curadoria de capturas
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                {items.length} capturas · {counts.inbox} na caixa de entrada · {counts.selected} selecionadas ·{" "}
                {counts.published} publicadas
              </p>
            </div>
            <button
              onClick={save}
              disabled={saving || loading}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Salvando..." : "Salvar decisões"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg border border-zinc-200 p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar por título, URL ou nota..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-zinc-300 rounded-md text-sm"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as CaptureStatus | "all")}
            className="px-3 py-2 border border-zinc-300 rounded-md text-sm"
          >
            <option value="all">Todos os estados</option>
            {(Object.keys(STATUS_LABELS) as CaptureStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-zinc-500">
            <Loader2 className="w-4 h-4 animate-spin" /> Lendo o ArchiveBox...
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((item) => (
              <div key={item.snapshotId} className="bg-white rounded-lg border border-zinc-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLES[item.status]}`}>
                        {STATUS_LABELS[item.status]}
                      </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-600 hover:text-zinc-900 truncate flex items-center gap-1"
                      >
                        {item.url} <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      {item.capturedAt ? new Date(item.capturedAt).toLocaleString("pt-BR") : "sem data"} ·{" "}
                      {(item.size / 1e6).toFixed(1)} MB ·{" "}
                      {item.tags.filter((t) => t.startsWith("col:") || t.startsWith("obra:")).join(" ")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={item.status}
                      onChange={(e) => update(item.snapshotId, { status: e.target.value as CaptureStatus })}
                      className="px-2 py-1 border border-zinc-300 rounded text-xs"
                    >
                      {(Object.keys(STATUS_LABELS) as CaptureStatus[]).map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                    <select
                      value={item.accessLevel}
                      onChange={(e) => update(item.snapshotId, { accessLevel: e.target.value as AccessLevel })}
                      className="px-2 py-1 border border-zinc-300 rounded text-xs"
                    >
                      <option value="restricted">Restrito</option>
                      <option value="private">Privado</option>
                      <option value="public">Público</option>
                    </select>
                  </div>
                </div>

                <input
                  type="text"
                  value={item.title}
                  placeholder={item.archivedTitle || "Título de exibição"}
                  onChange={(e) => update(item.snapshotId, { title: e.target.value })}
                  className="mt-3 w-full px-3 py-2 border border-zinc-300 rounded-md text-sm"
                />

                <textarea
                  value={item.note}
                  placeholder="Anotação de curadoria (por que esta captura importa, o que conferir, com quem falar...)"
                  onChange={(e) => update(item.snapshotId, { note: e.target.value })}
                  className="mt-2 w-full px-3 py-2 border border-zinc-300 rounded-md text-sm min-h-[70px]"
                />
              </div>
            ))}

            {visible.length === 0 && (
              <p className="text-sm text-zinc-500">
                Nenhuma captura para este filtro.{" "}
                <Link href="/admin" className="underline">
                  voltar ao painel
                </Link>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
