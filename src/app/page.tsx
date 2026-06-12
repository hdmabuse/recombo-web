import Link from "next/link";
import {
  ArrowRight,
  Play,
  Music,
  Image,
  Video,
  FileText,
  MapPin,
  Clock,
  Users,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    slug: "call-for-noise",
    title: "Call for Noise",
    year: 2002,
    type: "performance",
    description:
      "Maratona de 6 horas durante o Abril Pro Rock, com participação internacional via internet.",
  },
  {
    slug: "radio-recombo",
    title: "Rádio Re:combo",
    year: 2004,
    type: "audio",
    description: "Software multiusuário para improvisação musical coletiva via web.",
  },
  {
    slug: "constelacoes",
    title: "Constelações",
    year: 2004,
    type: "image",
    description: "Instalação que transforma mensagens SMS em estrelas projetadas no teto.",
  },
];

const STATS = [
  { icon: Play, label: "Obras", value: "500+" },
  { icon: Users, label: "Artistas", value: "30+" },
  { icon: Clock, label: "Anos", value: "2001-2008" },
  { icon: MapPin, label: "Cidades", value: "15+" },
];

const COLLECTION_TYPES = [
  { type: "audio", icon: Music, label: "Áudio", count: 120 },
  { type: "video", icon: Video, label: "Vídeo", count: 45 },
  { type: "image", icon: Image, label: "Imagem", count: 280 },
  { type: "text", icon: FileText, label: "Texto", count: 55 },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <h1
              className="glitch mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              data-text="re:combo"
            >
              re:combo
            </h1>
            <p className="mb-4 text-xl text-zinc-300 sm:text-2xl">O arquivo como semente</p>
            <p className="mb-8 max-w-2xl text-lg text-zinc-400">
              Arquivo digital do coletivo Re:combo (2001-2008), pioneiro em produção artística
              colaborativa via internet. Um projeto de resgate, preservação e Germinação da memória
              digital pernambucana.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/arquivo"
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                Explorar Acervo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Saber Mais
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative border-t border-zinc-800 bg-zinc-950/50">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <stat.icon className="h-5 w-5 text-zinc-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-zinc-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collection Types */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900">Navegue por Tipo</h2>
            <Link
              href="/arquivo"
              className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900"
            >
              Ver todo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {COLLECTION_TYPES.map((item) => (
              <Link
                key={item.type}
                href={`/arquivo?type=${item.type}`}
                className="group rounded-lg border border-zinc-200 p-6 transition-all hover:border-zinc-900 hover:shadow-lg"
              >
                <item.icon className="mb-3 h-8 w-8 text-zinc-400 transition-colors group-hover:text-zinc-900" />
                <p className="font-medium text-zinc-900">{item.label}</p>
                <p className="text-sm text-zinc-500">{item.count} itens</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-zinc-900">Destaques</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <Link
                key={item.slug}
                href={`/obra/${item.slug}`}
                className="group overflow-hidden rounded-lg border border-zinc-200 bg-white transition-all hover:border-zinc-900"
              >
                <div className="relative aspect-video overflow-hidden bg-zinc-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-12 w-12 text-zinc-300 transition-all group-hover:scale-110 group-hover:text-zinc-600" />
                  </div>
                  <div className="absolute right-2 top-2 rounded bg-zinc-900/80 px-2 py-1 text-xs text-white">
                    {item.type}
                  </div>
                </div>
                <div className="p-4">
                  <p className="mb-1 text-xs text-zinc-500">{item.year}</p>
                  <h3 className="mb-2 font-semibold text-zinc-900 group-hover:text-zinc-700">
                    {item.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-zinc-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* History Teaser */}
      <section className="bg-zinc-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Uma história de colaboração</h2>
              <p className="mb-6 leading-relaxed text-zinc-400">
                O Re:combo surgiu em Recife (PE) em 2001, criado por artistas e profissionais
                multidisciplinares. Inicialmente voltado à produção musical, o grupo adotou a troca
                de samples via CD-Rs e, posteriormente, pela internet, por meio de repositórios,
                como forma de superar a distância física entre seus membros.
              </p>
              <p className="mb-6 leading-relaxed text-zinc-400">
                O nome reflete a proposta de &quot;recombinar&quot; não apenas meios, mas também
                conteúdos — música, vídeo, texto ou imagem —, inspirada na improvisação dos combos
                de jazz e na intertextualidade.
              </p>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-white"
              >
                Leia a história completa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-800">
                <span className="text-4xl font-bold text-zinc-700">2001</span>
              </div>
              <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-800">
                <span className="text-4xl font-bold text-zinc-700">2008</span>
              </div>
              <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-800">
                <span className="px-4 text-center text-zinc-600">7 anos de atividade</span>
              </div>
              <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-800">
                <span className="px-4 text-center text-zinc-600">+30 artistas participantes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-zinc-900">Participe da comunidade</h2>
          <p className="mx-auto mb-8 max-w-2xl text-zinc-600">
            Contribua com o acervo, participe de oficinas, ou simplyStay connected com as atividades
            do projeto.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/comunidade"
              className="rounded-md bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Comunidade
            </Link>
            <Link
              href="/arquivo?tag=colaboração"
              className="rounded-md border border-zinc-300 px-6 py-3 font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              Explorar colaborações
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
