import Link from "next/link";
import { Image, Users, Calendar, MessageSquare, Tags } from "lucide-react";
import { statsService } from "@/services";

export const dynamic = "force-dynamic";

async function getCounts() {
  try {
    return await statsService.getCounts();
  } catch {
    return { artworks: 0, artists: 0, events: 0, interviews: 0, tags: 0 };
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  const STATS = [
    {
      label: "Obras",
      count: counts.artworks,
      href: "/admin/artworks",
      icon: Image,
      color: "bg-zinc-900",
    },
    {
      label: "Artistas",
      count: counts.artists,
      href: "/admin/artists",
      icon: Users,
      color: "bg-zinc-700",
    },
    {
      label: "Eventos",
      count: counts.events,
      href: "/admin/events",
      icon: Calendar,
      color: "bg-zinc-600",
    },
    {
      label: "Entrevistas",
      count: counts.interviews,
      href: "/admin/interviews",
      icon: MessageSquare,
      color: "bg-zinc-500",
    },
    { label: "Tags", count: counts.tags, href: "/admin/tags", icon: Tags, color: "bg-amber-500" },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-zinc-900">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {STATS.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="rounded-lg border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div
              className={`h-12 w-12 ${stat.color} mb-4 flex items-center justify-center rounded-lg`}
            >
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-zinc-900">{stat.count}</p>
            <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Ações Rápidas</h2>
          <div className="space-y-2">
            <Link
              href="/admin/artworks/new"
              className="block rounded-md bg-zinc-100 p-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              + Nova Obra
            </Link>
            <Link
              href="/admin/artists/new"
              className="block rounded-md bg-zinc-100 p-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              + Novo Artista
            </Link>
            <Link
              href="/admin/events/new"
              className="block rounded-md bg-zinc-100 p-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              + Novo Evento
            </Link>
            <Link
              href="/admin/fields"
              className="block rounded-md bg-zinc-50 p-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
            >
              Gerenciar Campos Customizados
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Informações</h2>
          <p className="text-sm text-zinc-600">
            Este painel permite gerenciar todo o conteúdo do acervo Re:combo. Você pode criar,
            editar e excluir registros, além de definir campos customizados para cada tipo de
            entidade.
          </p>
          <p className="mt-4 text-sm text-zinc-600">
            <Link href="/admin/fields" className="font-medium text-amber-600 hover:underline">
              Configure campos customizados →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
