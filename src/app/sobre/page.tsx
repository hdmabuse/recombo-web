import Link from "next/link";
import { ArrowRight, Music, Globe, Users, Heart, Lightbulb } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero */}
      <div className="bg-zinc-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre o Re:combo</h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            A história de um coletivo pioneiro que transformou a produção artística no Brasil
            através da colaboração digital e da generosidade intelectual.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Origin */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">O Surgimento</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              O Re:combo surgiu em Recife (PE) em 2001, criado por artistas e profissionais 
              multidisciplinares, incluindo H.D. Mabuse, Haidée Lima, Queops Negronski, 
              Prof Miguel, Sandrinha e Osman Frazão Lima.
            </p>
            <p className="text-zinc-600 leading-relaxed">
              Inicialmente voltado à produção musical, o grupo adotou a troca de samples via 
              CD-Rs e, posteriormente, pela internet, por meio de repositórios, como forma 
              de superar a distância física entre seus membros e as dificuldades de encontros 
              síncronos entre eles.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-zinc-200 rounded-lg flex items-center justify-center">
              <Music className="w-12 h-12 text-zinc-400" />
            </div>
            <div className="aspect-square bg-zinc-200 rounded-lg flex items-center justify-center">
              <Globe className="w-12 h-12 text-zinc-400" />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-zinc-900 mb-8 text-center">Princípios Fundadores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-zinc-700" />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">Generosidade Intelectual</h3>
              <p className="text-sm text-zinc-600">
                Todo conhecimento gerado pelo coletivo era compartilhado livremente, 
                inspirando uma cultura de colaboração genuína.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-zinc-700" />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">Produção Descentralizada</h3>
              <p className="text-sm text-zinc-600">
                Não havia diferença entre ter integrantes do outro lado da cidade, em 
                diferentes cidades brasileiras ou do mundo.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-zinc-700" />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">Recombinação</h3>
              <p className="text-sm text-zinc-600">
                O nome reflete a proposta de &quot;recombinar&quot; não apenas meios, 
                mas também conteúdos — música, vídeo, texto ou imagem.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">Linha do Tempo</h2>
          <div className="space-y-8">
            {[
              { year: "2001", title: "Fundação", description: "Coletivo surge em Recife com foco em produção musical colaborativa." },
              { year: "2002", title: "Abril Pro Rock", description: "Performance Call for Noise durante o festival, com 6 horas de duração." },
              { year: "2003", title: "Expansão Internacional", description: "Transloc Mixer no Walker Art Institute, Minneapolis (EUA)." },
              { year: "2004", title: "Rádio Re:combo", description: "Apresentação no Itaú Cultural SP e Pause and Play com Weimar, Alemanha." },
              { year: "2005", title: "Constelações", description: "Instalação no 46° Salão de Artes Plásticas de Pernambuco." },
              { year: "2006", title: "Mundo Pequeno", description: "Exposição no MAMAM com lambe-lambes de membros pelo mundo." },
              { year: "2008", title: "Encerramento", description: "Coletivo encerra atividades, mas deixa legado preservado." },
            ].map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="w-20 shrink-0 text-right">
                  <span className="text-lg font-bold text-zinc-900">{item.year}</span>
                </div>
                <div className="relative pt-1">
                  <div className="w-3 h-3 bg-zinc-900 rounded-full absolute -left-1.5 top-1.5" />
                  <div className="pl-6">
                    <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                    <p className="text-sm text-zinc-600 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">Integrantes</h2>
          <p className="text-zinc-600 mb-8">
            Pelo coletivo passaram diversas pessoas ao longo de sua existência:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "H.D. Mabuse", "Haidée Lima", "Queops Negronski", "Prof Miguel",
              "Sandrinha", "Osman Frazão Lima", "Carlos Freitas", "Chico Corrêa",
              "Guilherme Darisbo", "Carlota", "Thelmo Christovam", "Sérgio Angelim",
              "Ulisses", "Alfiomascaro", "Antonio Flavio", "Caio Mariano",
              "Daniel Malcriado", "Diego Credidio", "Jabah", "Janjão",
              "Karen Elliot", "MC Five", "Nena Morais", "n0-age", "Daniel Ortega"
            ].map((name) => (
              <Link
                key={name}
                href={`/artista/${name.toLowerCase().replace(/\s+/g, "-")}`}
                className="bg-white border border-zinc-200 rounded-lg p-4 text-center hover:border-zinc-900 transition-colors"
              >
                <span className="text-sm font-medium text-zinc-700">{name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* License */}
        <section className="bg-zinc-900 text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-4">LUCR - Licença de Uso Completo Re:combo</h2>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Em 2003, o coletivo criou a LUCR (Licença de Uso Completo Re:combo), um antecedente 
            influente para as licenças Creative Commons no Brasil. A licença estabelecia que 
            qualquer pessoa poderia usar, modificar e distribuir as obras do grupo, desde que 
            creditada a origem e mantida a mesma liberdade para derivadas.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Este princípio de &quot;generosidade intelectual&quot; influenciou diversos projetos 
            de cultura livre no país e permanece como base do atual arquivo digital.
          </p>
        </section>

        {/* Project Info */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">O Projeto Atual</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto mb-8">
            O projeto &quot;re:combo: o arquivo como semente&quot; propõe o resgate, 
            digitalização e disponibilização pública do acervo do coletivo, mantendo 
            vivo o espírito de colaboração e generosidade que sempre guiou o grupo.
          </p>
          <Link
            href="/arquivo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-medium rounded-md hover:bg-zinc-800 transition-colors"
          >
            Explorar o Acervo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}