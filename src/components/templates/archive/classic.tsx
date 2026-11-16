import Link from "next/link";
import { FileText, Image as ImageIcon, Music, Search, Video } from "lucide-react";
import type { ArchiveItem, ArchiveView } from "@/content/archive";

const TYPE_ICONS: Record<string, typeof FileText> = {
  audio: Music,
  video: Video,
  image: ImageIcon,
  text: FileText,
  installation: FileText,
  performance: FileText,
  website: FileText,
  software: FileText,
};

function href(view: ArchiveView, patch: Record<string, string | number | undefined>) {
  const params = new URLSearchParams();
  const next = { ...view.query, page: 1, ...patch };
  for (const [k, v] of Object.entries(next)) {
    if (v !== undefined && v !== "" && !(k === "page" && v === 1)) params.set(k, String(v));
  }
  const qs = params.toString();
  return qs ? `/arquivo?${qs}` : "/arquivo";
}

export function ArchiveClassic({ view }: { view: ArchiveView }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900">Acervo</h1>
          <p className="text-zinc-600">
            Explore as obras, performances e arquivos do coletivo Re:combo
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              <form action="/arquivo" className="space-y-2">
                <label htmlFor="q" className="block text-sm font-medium text-zinc-700">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    id="q"
                    name="q"
                    defaultValue={view.query.q ?? ""}
                    placeholder="Buscar obras..."
                    className="w-full rounded-md border border-zinc-200 py-2 pl-9 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
              </form>

              <nav>
                <p className="mb-2 block text-sm font-medium text-zinc-700">Tipo</p>
                <div className="space-y-1">
                  <Link
                    href={href(view, { type: undefined })}
                    className={`block rounded-md px-3 py-2 text-sm ${!view.query.type ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
                  >
                    Todos
                  </Link>
                  {view.types.map((type) => {
                    const Icon = TYPE_ICONS[type] ?? FileText;
                    const active = view.query.type === type;
                    return (
                      <Link
                        key={type}
                        href={href(view, { type })}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${active ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
                      >
                        <Icon className="h-4 w-4" />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {view.years.length > 0 && (
                <nav>
                  <p className="mb-2 block text-sm font-medium text-zinc-700">Ano</p>
                  <div className="space-y-1">
                    <Link
                      href={href(view, { year: undefined })}
                      className={`block rounded-md px-3 py-2 text-sm ${!view.query.year ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
                    >
                      Todos
                    </Link>
                    {view.years.slice(0, 12).map((year) => (
                      <Link
                        key={year}
                        href={href(view, { year })}
                        className={`block rounded-md px-3 py-2 text-sm ${view.query.year === year ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
                      >
                        {year}
                      </Link>
                    ))}
                  </div>
                </nav>
              )}
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <p className="mb-6 text-sm text-zinc-500">
              {view.total} {view.total === 1 ? "resultado" : "resultados"}
              {view.query.q ? ` para “${view.query.q}”` : ""}
            </p>

            {view.items.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {view.items.map((item: ArchiveItem) => {
                  const Icon = TYPE_ICONS[item.type] ?? FileText;
                  return (
                    <Link
                      key={item.id}
                      href={`/obra/${item.slug}`}
                      className="group overflow-hidden rounded-lg border border-zinc-200 bg-white transition-all hover:border-zinc-900 hover:shadow-lg"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                        {item.thumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
                            <Icon className="h-12 w-12 text-zinc-300" />
                          </div>
                        )}
                        <div className="absolute right-2 top-2 flex items-center gap-1 rounded bg-zinc-900/80 px-2 py-1 text-xs text-white">
                          <Icon className="h-3 w-3" />
                          {item.type}
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="mb-1 text-xs text-zinc-500">{item.year}</p>
                        <h3 className="mb-2 line-clamp-1 font-semibold text-zinc-900 group-hover:text-zinc-700">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-500">{item.artists.join(", ")}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="mb-4 text-zinc-500">Nenhuma obra encontrada</p>
                <Link href="/arquivo" className="text-sm text-zinc-900 hover:underline">
                  Limpar filtros
                </Link>
              </div>
            )}

            {view.pages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Paginação">
                {Array.from({ length: view.pages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={href(view, { page: p })}
                    className={`rounded-md px-3 py-1 text-sm ${p === view.page ? "bg-zinc-900 text-white" : "border border-zinc-200 text-zinc-600 hover:bg-zinc-100"}`}
                  >
                    {p}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
