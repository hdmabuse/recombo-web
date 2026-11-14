import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Play,
  Volume2,
  Calendar,
  MapPin,
  Users,
  FileText,
  Tag,
  ExternalLink,
} from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = { params: { slug: string } };

async function getArtwork(slug: string) {
  return prisma.artwork.findFirst({
    where: { slug, status: "published", accessLevel: "public" },
    include: {
      artists: { include: { artist: true } },
      files: true,
      related: { include: { related: true } },
      relationOf: { include: { artwork: true } },
      events: { include: { event: true } },
    },
  });
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const artwork = await getArtwork(params.slug);
    if (!artwork) return { title: "Obra não encontrada · Re:combo" };

    return {
      title: `${artwork.title}${artwork.year ? ` (${artwork.year})` : ""} · Re:combo`,
      description: artwork.shortDescription || artwork.description?.slice(0, 160) || undefined,
      openGraph: {
        title: `${artwork.title} · Re:combo`,
        description: artwork.shortDescription || undefined,
        images: artwork.thumbnail ? [artwork.thumbnail] : undefined,
        type: "article",
      },
    };
  } catch {
    return { title: "Obra · Re:combo" };
  }
}

function formatDuration(seconds: number | null): string | null {
  if (!seconds) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}

function artistSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function ArtworkPage({ params }: PageProps) {
  const artwork = await getArtwork(params.slug);
  if (!artwork) notFound();

  const related = [
    ...artwork.related.map((r) => r.related),
    ...artwork.relationOf.map((r) => r.artwork),
  ].filter((a, index, all) => all.findIndex((x) => x.id === a.id) === index);

  const duration = formatDuration(artwork.duration);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/arquivo"
            className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar ao acervo
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-video bg-zinc-900 rounded-lg relative overflow-hidden flex items-center justify-center">
              {artwork.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={artwork.thumbnail}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <Play className="w-16 h-16 text-zinc-500 mx-auto mb-4" />
                  <p className="text-zinc-400 text-sm capitalize">{artwork.type}</p>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-zinc-900 mb-4">{artwork.title}</h1>
              {artwork.description && (
                <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">
                  {artwork.description}
                </p>
              )}
              {artwork.medium && (
                <p className="mt-3 text-sm text-zinc-500">{artwork.medium}</p>
              )}
            </div>

            {artwork.files.length > 0 && (
              <div className="bg-white rounded-lg border border-zinc-200 p-6">
                <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Arquivos
                </h2>
                <div className="space-y-2">
                  {artwork.files.map((file) => (
                    <a
                      key={file.id}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-zinc-50 rounded-md hover:bg-zinc-100 transition-colors"
                    >
                      <span className="text-sm text-zinc-700">
                        {file.filename}
                        <span className="ml-2 text-xs text-zinc-400 capitalize">{file.type}</span>
                      </span>
                      <ExternalLink className="w-4 h-4 text-zinc-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {artwork.events.length > 0 && (
              <div className="bg-white rounded-lg border border-zinc-200 p-6">
                <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Onde foi apresentada
                </h2>
                <ul className="space-y-2">
                  {artwork.events.map(({ event }) => (
                    <li key={event.id} className="text-sm text-zinc-700">
                      <span className="font-medium">{event.name}</span>
                      <span className="text-zinc-400">
                        {" · "}
                        {event.dateStart.toLocaleDateString("pt-BR", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-4">
              {artwork.year && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-zinc-400" />
                  <div>
                    <p className="text-xs text-zinc-500">Ano</p>
                    <p className="font-medium text-zinc-900">{artwork.year}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-zinc-400" />
                <div>
                  <p className="text-xs text-zinc-500">Tipo</p>
                  <p className="font-medium text-zinc-900 capitalize">{artwork.type}</p>
                </div>
              </div>

              {artwork.locationCreated && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-zinc-400" />
                  <div>
                    <p className="text-xs text-zinc-500">Local</p>
                    <p className="font-medium text-zinc-900">{artwork.locationCreated}</p>
                  </div>
                </div>
              )}

              {duration && (
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-zinc-400" />
                  <div>
                    <p className="text-xs text-zinc-500">Duração</p>
                    <p className="font-medium text-zinc-900">{duration}</p>
                  </div>
                </div>
              )}
            </div>

            {artwork.artists.length > 0 && (
              <div className="bg-white rounded-lg border border-zinc-200 p-6">
                <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Artistas
                </h2>
                <div className="space-y-3">
                  {artwork.artists.map(({ artist, role }) => (
                    <Link
                      key={artist.id}
                      href={`/artista/${artist.slug || artistSlug(artist.name)}`}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-sm text-zinc-700 group-hover:text-zinc-900">
                        {artist.name}
                      </span>
                      {role && <span className="text-xs text-zinc-500">{role}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {artwork.tags.length > 0 && (
              <div className="bg-white rounded-lg border border-zinc-200 p-6">
                <h2 className="font-semibold text-zinc-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-zinc-100 text-zinc-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-zinc-900 rounded-lg p-6 text-white">
              <h2 className="font-semibold mb-2">Licença</h2>
              <p className="text-sm text-zinc-400">
                {artwork.license === "LUCR"
                  ? "Disponível sob a Licença de Uso Completo Re:combo (LUCR)."
                  : `Licença: ${artwork.license}.`}
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Obras relacionadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/obra/${item.slug}`}
                  className="bg-white rounded-lg border border-zinc-200 p-4 hover:border-zinc-900 transition-colors"
                >
                  <p className="font-medium text-zinc-900">{item.title}</p>
                  <p className="text-sm text-zinc-500">{item.year}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
