import Link from "next/link";
import { ChevronLeft, Play, Pause, Volume2, Calendar, MapPin, Users, FileText, Tag, ExternalLink } from "lucide-react";

const MOCK_ARTWORK = {
  slug: "call-for-noise",
  title: "Call for Noise",
  description: "Performance de 6 horas durante o Abril Pro Rock em 2002, onde membros do coletivo se alternavam dentro de uma \"gaiola\", recebendo convidados em uma performance caótica, alimentada por imagens solicitadas por uma Chamada de Ruídos e enviadas previamente de várias partes do mundo.",
  year: 2002,
  type: "performance",
  medium: "Performance + Net.art",
  location: "Centro de Convenções de Pernambuco, Recife",
  duration: 360, // minutes
  license: "LUCR",
  tags: ["performance", "net.art", "abril pro rock", "chamada de ruídos", "improvisação"],
  artists: [
    { name: "H.D. Mabuse", role: "criador" },
    { name: "Haidée Lima", role: "criador" },
    { name: "Queops Negronski", role: "criador" },
  ],
  related: [
    { title: "Chamada de Ruídos", slug: "chamada-de-ruidos", year: 2002 },
    { title: "Rádio Re:combo", slug: "radio-recombo", year: 2004 },
  ],
  files: [
    { type: "video", url: "#", label: "Registro em vídeo" },
    { type: "audio", url: "#", label: "Trilha sonora" },
    { type: "image", url: "#", label: "Fotografias" },
  ],
  events: [
    { name: "Abril Pro Rock 2002", date: "2002-04", slug: "abril-pro-rock-2002" },
  ],
};

export default function ArtworkPage({ params }: { params: { slug: string } }) {
  const artwork = MOCK_ARTWORK;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Breadcrumb */}
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Player / Preview */}
            <div className="aspect-video bg-zinc-900 rounded-lg relative overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-zinc-500 mx-auto mb-4" />
                <p className="text-zinc-400 text-sm">
                  Clique para reproduzir
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
                <div className="h-full bg-zinc-400 w-1/3" />
              </div>
            </div>

            {/* Description */}
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 mb-4">{artwork.title}</h1>
              <p className="text-zinc-600 leading-relaxed">{artwork.description}</p>
            </div>

            {/* Files */}
            {artwork.files.length > 0 && (
              <div className="bg-white rounded-lg border border-zinc-200 p-6">
                <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Arquivos
                </h2>
                <div className="space-y-2">
                  {artwork.files.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      className="flex items-center justify-between p-3 bg-zinc-50 rounded-md hover:bg-zinc-100 transition-colors"
                    >
                      <span className="text-sm text-zinc-700">{file.label}</span>
                      <ExternalLink className="w-4 h-4 text-zinc-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Meta Info */}
            <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-zinc-400" />
                <div>
                  <p className="text-xs text-zinc-500">Ano</p>
                  <p className="font-medium text-zinc-900">{artwork.year}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-zinc-400" />
                <div>
                  <p className="text-xs text-zinc-500">Tipo</p>
                  <p className="font-medium text-zinc-900 capitalize">{artwork.type}</p>
                </div>
              </div>

              {artwork.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-zinc-400" />
                  <div>
                    <p className="text-xs text-zinc-500">Local</p>
                    <p className="font-medium text-zinc-900">{artwork.location}</p>
                  </div>
                </div>
              )}

              {artwork.duration && (
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-zinc-400" />
                  <div>
                    <p className="text-xs text-zinc-500">Duração</p>
                    <p className="font-medium text-zinc-900">
                      {Math.floor(artwork.duration / 60)}h {artwork.duration % 60}min
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Artists */}
            <div className="bg-white rounded-lg border border-zinc-200 p-6">
              <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Artistas
              </h2>
              <div className="space-y-3">
                {artwork.artists.map((artist, index) => (
                  <Link
                    key={index}
                    href={`/artista/${artist.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-sm text-zinc-700 group-hover:text-zinc-900">
                      {artist.name}
                    </span>
                    <span className="text-xs text-zinc-500">{artist.role}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg border border-zinc-200 p-6">
              <h2 className="font-semibold text-zinc-900 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {artwork.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/arquivo?tag=${tag}`}
                    className="px-2 py-1 text-xs bg-zinc-100 text-zinc-700 rounded-full hover:bg-zinc-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* License */}
            <div className="bg-zinc-900 rounded-lg p-6 text-white">
              <h2 className="font-semibold mb-2">Licença</h2>
              <p className="text-sm text-zinc-400 mb-3">
                Esta obra está disponível sob a Licença de Uso Completo Re:combo (LUCR)
              </p>
              <a
                href="#"
                className="text-sm text-zinc-300 hover:text-white underline"
              >
                Ver termos da licença
              </a>
            </div>
          </div>
        </div>

        {/* Related Works */}
        {artwork.related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Obras Relacionadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {artwork.related.map((related) => (
                <Link
                  key={related.slug}
                  href={`/obra/${related.slug}`}
                  className="bg-white rounded-lg border border-zinc-200 p-4 hover:border-zinc-900 transition-colors"
                >
                  <p className="font-medium text-zinc-900">{related.title}</p>
                  <p className="text-sm text-zinc-500">{related.year}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}