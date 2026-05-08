"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const TIMELINE_EVENTS = [
  {
    year: 2001,
    title: "Fundação do Re:combo",
    description: "Coletivo surge em Recife (PE) com foco em produção musical colaborativa via internet.",
    location: "Recife, PE",
    type: "founding",
    slug: "fundacao",
  },
  {
    year: 2002,
    title: "Abril Pro Rock - Call for Noise",
    description: "Performance de 6 horas com membros do coletivo se alternando em uma 'gaiola', recebendo convidados de várias partes do mundo.",
    location: "Centro de Convenções, Recife",
    type: "performance",
    slug: "abril-pro-rock-2002",
    artworks: ["call-for-noise", "chamada-de-ruidos"],
  },
  {
    year: 2003,
    title: "Transloc Mixer",
    description: "Desenvolvido para a exposição 'When Latitudes Became Forms' no Walker Art Institute, Minneapolis (EUA).",
    location: "Minneapolis, EUA",
    type: "exhibition",
    slug: "transloc-mixer",
    artworks: ["transloc-mixer"],
  },
  {
    year: 2003,
    title: "Arte Eletrônica",
    description: "Evento de performance em meios eletrônicos no Bairro do Recife, integrando DJing, VJing e performances ao vivo.",
    location: "Recife, PE",
    type: "festival",
    slug: "arte-eletronica",
    artworks: ["arte-eletronica"],
  },
  {
    year: 2004,
    title: "Rádio Re:combo - Itaú Cultural",
    description: "Apresentação unindo performance musical e instalação interativa, utilizando aplicação web multiusuário.",
    location: "São Paulo, SP",
    type: "performance",
    slug: "radio-recombo-sp",
    artworks: ["radio-recombo"],
  },
  {
    year: 2004,
    title: "Pause and Play",
    description: "Jam session telemática conectando Recife e Weimar (Alemanha) em tempo real via internet.",
    location: "Recife / Weimar",
    type: "performance",
    slug: "pause-and-play",
    artworks: ["pause-and-play"],
  },
  {
    year: 2004,
    title: "Constelações",
    description: "Instalação no SonarSoundSP/Nokia Trends que transformava mensagens SMS em estrelas projetadas no teto.",
    location: "São Paulo, SP",
    type: "installation",
    slug: "constelacoes",
    artworks: ["constelacoes"],
  },
  {
    year: 2005,
    title: "Rádio Re:combo - Porto Musical",
    description: "Performance com 22 artistas em experiência de improvisação radical durante a Convenção Internacional de Música e Tecnologia.",
    location: "Recife, PE",
    type: "performance",
    slug: "radio-recombo-recife",
    artworks: ["radio-recombo"],
  },
  {
    year: 2005,
    title: "Constelações 2.0",
    description: "Versão ampliada da instalação apresentada no 46° Salão de Artes Plásticas de Pernambuco.",
    location: "Recife, PE",
    type: "exhibition",
    slug: "constelacoes-2",
    artworks: ["constelacoes"],
  },
  {
    year: 2006,
    title: "Mundo Pequeno",
    description: "Exposição no MAMAM com lambe-lambes criados a partir de imagens enviadas por membros do grupo em diversas cidades.",
    location: "MAMAM, Recife",
    type: "exhibition",
    slug: "mundo-pequeno",
    artworks: ["mundo-pequeno"],
  },
  {
    year: 2008,
    title: "Encerramento",
    description: "Coletivo encerra atividades após 7 anos de produção contínua.",
    location: "Recife, PE",
    type: "other",
    slug: "encerramento",
  },
];

export default function TimelinePage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  
  const years = [...new Set(TIMELINE_EVENTS.map(e => e.year))];
  const selectedEvent = selectedYear 
    ? TIMELINE_EVENTS.find(e => e.year === selectedYear)
    : null;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Linha do Tempo</h1>
          <p className="text-zinc-600">
            A trajetória do coletivo Re:combo de 2001 a 2008
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Year Selector */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => {
              const currentIndex = years.indexOf(selectedYear || years[0]);
              if (currentIndex > 0) setSelectedYear(years[currentIndex - 1]);
            }}
            className="p-2 rounded-full hover:bg-zinc-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-2 overflow-x-auto max-w-md">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedYear === year || (!selectedYear && year === years[0])
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => {
              const currentIndex = years.indexOf(selectedYear || years[0]);
              if (currentIndex < years.length - 1) setSelectedYear(years[currentIndex + 1]);
            }}
            className="p-2 rounded-full hover:bg-zinc-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Timeline Display */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-200 -translate-x-1/2 hidden md:block" />

          {/* Events */}
          <div className="space-y-8 md:space-y-12">
            {TIMELINE_EVENTS.map((event, index) => (
              <div 
                key={index}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="flex-1 md:text-right">
                  <div className={`bg-white rounded-lg border border-zinc-200 p-6 hover:border-zinc-900 transition-colors ${
                    selectedYear && event.year !== selectedYear ? "opacity-50" : ""
                  }`}>
                    <span className="text-sm font-bold text-zinc-400">{event.year}</span>
                    <h3 className="text-lg font-semibold text-zinc-900 mt-1">{event.title}</h3>
                    <p className="text-sm text-zinc-600 mt-2">{event.description}</p>
                    <div className="flex items-center gap-1 mt-3 text-xs text-zinc-500">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                    {event.artworks && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {event.artworks.map((slug) => (
                          <Link
                            key={slug}
                            href={`/obra/${slug}`}
                            className="text-xs px-2 py-1 bg-zinc-100 text-zinc-700 rounded hover:bg-zinc-200"
                          >
                            Ver obra →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Dot */}
                <div className="hidden md:block w-4 h-4 bg-zinc-900 rounded-full shrink-0 relative z-10" />

                {/* Spacer */}
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-16 pt-8 border-t border-zinc-200">
          <h3 className="text-sm font-medium text-zinc-700 mb-4">Legenda</h3>
          <div className="flex flex-wrap gap-4">
            {[
              { type: "founding", label: "Fundação" },
              { type: "performance", label: "Performance" },
              { type: "exhibition", label: "Exposição" },
              { type: "installation", label: "Instalação" },
              { type: "festival", label: "Festival" },
              { type: "other", label: "Outro" },
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  item.type === "founding" ? "bg-zinc-900" :
                  item.type === "performance" ? "bg-blue-500" :
                  item.type === "exhibition" ? "bg-green-500" :
                  item.type === "installation" ? "bg-purple-500" :
                  item.type === "festival" ? "bg-orange-500" :
                  "bg-zinc-400"
                }`} />
                <span className="text-sm text-zinc-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}