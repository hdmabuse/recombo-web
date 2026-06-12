import Link from "next/link";
import { ArrowRight, Music, Globe, Users, Heart, Lightbulb } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero */}
      <div className="bg-zinc-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Sobre o Re:combo</h1>
          <p className="max-w-3xl text-xl text-zinc-400">
            A história de um coletivo pioneiro que transformou a produção artística no Brasil
            através da colaboração digital e da generosidade intelectual.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        {/* Origin */}
        <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900">O Surgimento</h2>
            <p className="mb-4 leading-relaxed text-zinc-600">
              O Re:combo surgiu em Recife (PE) em 2001, criado por artistas e profissionais
              multidisciplinares, incluindo H.D. Mabuse, Haidée Lima, Queops Negronski, Prof Miguel,
              Sandrinha e Osman Frazão Lima.
            </p>
            <p className="leading-relaxed text-zinc-600">
              Inicialmente voltado à produção musical, o grupo adotou a troca de samples via CD-Rs
              e, posteriormente, pela internet, por meio de repositórios, como forma de superar a
              distância física entre seus membros e as dificuldades de encontros síncronos entre
              eles.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-200">
              <Music className="h-12 w-12 text-zinc-400" />
            </div>
            <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-200">
              <Globe className="h-12 w-12 text-zinc-400" />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="rounded-2xl bg-white p-8 md:p-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-zinc-900">
            Princípios Fundadores
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
                <Heart className="h-8 w-8 text-zinc-700" />
              </div>
              <h3 className="mb-2 font-semibold text-zinc-900">Generosidade Intelectual</h3>
              <p className="text-sm text-zinc-600">
                Todo conhecimento gerado pelo coletivo era compartilhado livremente, inspirando uma
                cultura de colaboração genuína.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
                <Globe className="h-8 w-8 text-zinc-700" />
              </div>
              <h3 className="mb-2 font-semibold text-zinc-900">Produção Descentralizada</h3>
              <p className="text-sm text-zinc-600">
                Não havia diferença entre ter integrantes do outro lado da cidade, em diferentes
                cidades brasileiras ou do mundo.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
                <Lightbulb className="h-8 w-8 text-zinc-700" />
              </div>
              <h3 className="mb-2 font-semibold text-zinc-900">Recombinação</h3>
              <p className="text-sm text-zinc-600">
                O nome reflete a proposta de &quot;recombinar&quot; não apenas meios, mas também
                conteúdos — música, vídeo, texto ou imagem.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-zinc-900">Linha do Tempo</h2>
          <div className="space-y-8">
            {[
              {
                year: "2001",
                title: "Fundação",
                description: "Coletivo surge em Recife com foco em produção musical colaborativa.",
              },
              {
                year: "2002",
                title: "Abril Pro Rock",
                description:
                  "Performance Call for Noise durante o festival, com 6 horas de duração.",
              },
              {
                year: "2003",
                title: "Expansão Internacional",
                description: "Transloc Mixer no Walker Art Institute, Minneapolis (EUA).",
              },
              {
                year: "2004",
                title: "Rádio Re:combo",
                description:
                  "Apresentação no Itaú Cultural SP e Pause and Play com Weimar, Alemanha.",
              },
              {
                year: "2005",
                title: "Constelações",
                description: "Instalação no 46° Salão de Artes Plásticas de Pernambuco.",
              },
              {
                year: "2006",
                title: "Mundo Pequeno",
                description: "Exposição no MAMAM com lambe-lambes de membros pelo mundo.",
              },
              {
                year: "2008",
                title: "Encerramento",
                description: "Coletivo encerra atividades, mas deixa legado preservado.",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="w-20 shrink-0 text-right">
                  <span className="text-lg font-bold text-zinc-900">{item.year}</span>
                </div>
                <div className="relative pt-1">
                  <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-zinc-900" />
                  <div className="pl-6">
                    <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-zinc-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-zinc-900">Integrantes</h2>
          <p className="mb-8 text-zinc-600">
            Pelo coletivo passaram diversas pessoas ao longo de sua existência:
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              "H.D. Mabuse",
              "Haidée Lima",
              "Queops Negronski",
              "Prof Miguel",
              "Sandrinha",
              "Osman Frazão Lima",
              "Carlos Freitas",
              "Chico Corrêa",
              "Guilherme Darisbo",
              "Carlota",
              "Thelmo Christovam",
              "Sérgio Angelim",
              "Ulisses",
              "Alfiomascaro",
              "Antonio Flavio",
              "Caio Mariano",
              "Daniel Malcriado",
              "Diego Credidio",
              "Jabah",
              "Janjão",
              "Karen Elliot",
              "MC Five",
              "Nena Morais",
              "n0-age",
              "Daniel Ortega",
            ].map((name) => (
              <Link
                key={name}
                href={`/artista/${name.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-lg border border-zinc-200 bg-white p-4 text-center transition-colors hover:border-zinc-900"
              >
                <span className="text-sm font-medium text-zinc-700">{name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* License */}
        <section className="rounded-2xl bg-zinc-900 p-8 text-white md:p-12">
          <h2 className="mb-4 text-2xl font-bold">LUCR - Licença de Uso Completo Re:combo</h2>
          <p className="mb-6 leading-relaxed text-zinc-400">
            Em 2003, o coletivo criou a LUCR (Licença de Uso Completo Re:combo), um antecedente
            influente para as licenças Creative Commons no Brasil. A licença estabelecia que
            qualquer pessoa poderia usar, modificar e distribuir as obras do grupo, desde que
            creditada a origem e mantida a mesma liberdade para derivadas.
          </p>
          <p className="leading-relaxed text-zinc-400">
            Este princípio de &quot;generosidade intelectual&quot; influenciou diversos projetos de
            cultura livre no país e permanece como base do atual arquivo digital.
          </p>
        </section>

        {/* Project Info */}
        <section className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900">O Projeto Atual</h2>
          <p className="mx-auto mb-8 max-w-2xl text-zinc-600">
            O projeto &quot;re:combo: o arquivo como semente&quot; propõe o resgate, digitalização e
            disponibilização pública do acervo do coletivo, mantendo vivo o espírito de colaboração
            e generosidade que sempre guiou o grupo.
          </p>
          <Link
            href="/arquivo"
            className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Explorar o Acervo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
