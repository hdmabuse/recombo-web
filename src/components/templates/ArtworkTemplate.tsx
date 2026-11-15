import Link from "next/link";
import { Play, Calendar, MapPin, Users, FileText, Tag, ExternalLink, Volume2 } from "lucide-react";
import type { ArtworkView } from "@/content/artwork";

/**
 * Template de apresentação. Recebe apenas o view-model — não conhece banco,
 * rota nem regra de negócio. Trocar o visual = trocar este arquivo (ou a skin).
 */
export function ArtworkTemplate({ view }: { view: ArtworkView }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/arquivo"
            className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900"
          >
            ← Voltar ao acervo
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-zinc-900">
              {view.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={view.heroImage}
                  alt={view.title}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <Play className="mx-auto mb-4 h-16 w-16 text-zinc-500" />
                  <p className="text-sm text-zinc-400">Sem imagem preservada</p>
                </div>
              )}
            </div>

            <div>
              <h1 className="mb-4 text-3xl font-bold text-zinc-900">{view.title}</h1>
              <p className="whitespace-pre-wrap break-words leading-relaxed text-zinc-600">
                {view.description}
              </p>
            </div>

            {view.files.length > 0 && (
              <div className="rounded-lg border border-zinc-200 bg-white p-6">
                <h2 className="mb-4 flex items-center gap-2 font-semibold text-zinc-900">
                  <FileText className="h-5 w-5" />
                  Arquivos
                </h2>
                <div className="space-y-2">
                  {view.files.map((file) => (
                    <a
                      key={file.id}
                      href={file.href}
                      className="flex items-center justify-between rounded-md bg-zinc-50 p-3 transition-colors hover:bg-zinc-100"
                    >
                      <span className="text-sm text-zinc-700">{file.label}</span>
                      <ExternalLink className="h-4 w-4 text-zinc-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-xs text-zinc-500">Ano</p>
                  <p className="font-medium text-zinc-900">{view.year || "—"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-xs text-zinc-500">Tipo</p>
                  <p className="font-medium capitalize text-zinc-900">{view.type}</p>
                </div>
              </div>

              {view.duration && (
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-zinc-400" />
                  <div>
                    <p className="text-xs text-zinc-500">Duração</p>
                    <p className="font-medium text-zinc-900">
                      {Math.floor(view.duration / 60)}h {view.duration % 60}min
                    </p>
                  </div>
                </div>
              )}
            </div>

            {view.artists.length > 0 && (
              <div className="rounded-lg border border-zinc-200 bg-white p-6">
                <h2 className="mb-4 flex items-center gap-2 font-semibold text-zinc-900">
                  <Users className="h-5 w-5" />
                  Artistas
                </h2>
                <div className="space-y-3">
                  {view.artists.map((a) => (
                    <div key={a.id} className="flex items-center justify-between">
                      <span className="text-sm text-zinc-700">{a.name}</span>
                      {a.role && <span className="text-xs text-zinc-500">{a.role}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {view.tags.length > 0 && (
              <div className="rounded-lg border border-zinc-200 bg-white p-6">
                <h2 className="mb-4 font-semibold text-zinc-900">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {view.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/arquivo?tag=${tag}`}
                      className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-lg bg-zinc-900 p-6 text-white">
              <h2 className="mb-2 font-semibold">Licença</h2>
              <p className="mb-3 text-sm text-zinc-400">
                {view.license === "LUCR"
                  ? "Esta obra está disponível sob a Licença de Uso Completo Re:combo (LUCR)"
                  : `Licenciado sob ${view.license}`}
              </p>
            </div>
          </div>
        </div>

        {view.related.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-zinc-900">Obras Relacionadas</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {view.related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/obra/${rel.slug}`}
                  className="rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-900"
                >
                  <p className="font-medium text-zinc-900">{rel.title}</p>
                  <p className="text-sm text-zinc-500">{rel.year}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
