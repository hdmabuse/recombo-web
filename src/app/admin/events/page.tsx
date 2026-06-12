"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Trash2, Edit, Eye } from "lucide-react";
import { EventType } from "@prisma/client";

interface Event {
  id: string;
  name: string;
  slug: string;
  type: EventType;
  dateStart: string;
  dateEnd: string | null;
  venue: string | null;
  city: string | null;
  createdAt: string;
}

const TYPE_LABELS: Record<string, string> = {
  festival: "Festival",
  exposicao: "Exposição",
  performance: "Performance",
  workshop: "Workshop",
  lancamento: "Lançamento",
  meetup: "Meetup",
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;

    const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setEvents(events.filter((e) => e.id !== id));
    }
  }

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Eventos</h1>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Novo Evento
        </Link>
      </div>

      <div className="mb-6 rounded-md border border-zinc-200 bg-white p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar eventos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-zinc-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-zinc-200 bg-white">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Nome
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Tipo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Data
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Local
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {filteredEvents.map((event) => (
              <tr key={event.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3 font-medium text-zinc-900">{event.name}</td>
                <td className="px-4 py-3 text-sm text-zinc-600">
                  {TYPE_LABELS[event.type] || event.type}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600">
                  {new Date(event.dateStart).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600">
                  {event.venue ? `${event.venue}, ${event.city || ""}` : event.city || "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/evento/${event.slug}`}
                      target="_blank"
                      className="p-1 text-zinc-400 hover:text-zinc-600"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="p-1 text-zinc-400 hover:text-amber-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-1 text-zinc-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEvents.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  Nenhum evento encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
