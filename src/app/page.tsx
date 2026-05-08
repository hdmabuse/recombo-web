import Link from "next/link";
import { ArrowRight, Play, Music, Image, Video, FileText, MapPin, Clock, Users } from "lucide-react";

const HIGHLIGHTS = [
  {
    slug: "call-for-noise",
    title: "Call for Noise",
    year: 2002,
    type: "performance",
    description: "Maratona de 6 horas durante o Abril Pro Rock, com participação internacional via internet.",
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
      <section className="relative bg-zinc-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 glitch"
              data-text="re:combo"
            >
              re:combo
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-300 mb-4">
              O arquivo como semente
            </p>
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl">
              Arquivo digital do coletivo Re:combo (2001-2008), pioneiro em produção 
              artística colaborativa via internet. Um projeto de resgate, preservação 
              e Germinação da memória digital pernambucana.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/arquivo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 font-medium rounded-md hover:bg-zinc-100 transition-colors"
              >
                Explorar Acervo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-white font-medium rounded-md hover:bg-zinc-800 transition-colors"
              >
                Saber Mais
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative bg-zinc-950/50 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <stat.icon className="w-5 h-5 text-zinc-500" />
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900">Navegue por Tipo</h2>
            <Link
              href="/arquivo"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1"
            >
              Ver todo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COLLECTION_TYPES.map((item) => (
              <Link
                key={item.type}
                href={`/arquivo?type=${item.type}`}
                className="group p-6 border border-zinc-200 rounded-lg hover:border-zinc-900 hover:shadow-lg transition-all"
              >
                <item.icon className="w-8 h-8 mb-3 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                <p className="font-medium text-zinc-900">{item.label}</p>
                <p className="text-sm text-zinc-500">{item.count} itens</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">Destaques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((item) => (
              <Link
                key={item.slug}
                href={`/obra/${item.slug}`}
                className="group bg-white rounded-lg overflow-hidden border border-zinc-200 hover:border-zinc-900 transition-all"
              >
                <div className="aspect-video bg-zinc-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-12 h-12 text-zinc-300 group-hover:text-zinc-600 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-1 bg-zinc-900/80 text-white text-xs rounded">
                    {item.type}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-zinc-500 mb-1">{item.year}</p>
                  <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* History Teaser */}
      <section className="py-16 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Uma história de colaboração</h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                O Re:combo surgiu em Recife (PE) em 2001, criado por artistas e profissionais 
                multidisciplinares. Inicialmente voltado à produção musical, o grupo adotou a 
                troca de samples via CD-Rs e, posteriormente, pela internet, por meio de repositórios, 
                como forma de superar a distância física entre seus membros.
              </p>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                O nome reflete a proposta de &quot;recombinar&quot; não apenas meios, mas também 
                conteúdos — música, vídeo, texto ou imagem —, inspirada na improvisação dos 
                combos de jazz e na intertextualidade.
              </p>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
              >
                Leia a história completa
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-zinc-700">2001</span>
              </div>
              <div className="aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-zinc-700">2008</span>
              </div>
              <div className="aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-zinc-600 text-center px-4">
                  7 anos de atividade
                </span>
              </div>
              <div className="aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-zinc-600 text-center px-4">
                  +30 artistas participantes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">
            Participe da comunidade
          </h2>
          <p className="text-zinc-600 mb-8 max-w-2xl mx-auto">
            Contribua com o acervo, participe de oficinas, ou simplyStay connected com as 
            atividades do projeto.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/comunidade"
              className="px-6 py-3 bg-zinc-900 text-white font-medium rounded-md hover:bg-zinc-800 transition-colors"
            >
              Comunidade
            </Link>
            <Link
              href="/arquivo?tag=colaboração"
              className="px-6 py-3 border border-zinc-300 text-zinc-700 font-medium rounded-md hover:bg-zinc-50 transition-colors"
            >
              Explorar colaborações
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}