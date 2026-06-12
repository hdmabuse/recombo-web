"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  location: string;
  type: string;
  slug: string;
  artworks: { slug: string; title: string }[];
}

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/timeline")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-zinc-500">Carregando...</p>
      </div>
    );
  }

  const years = [...new Set(events.map((e) => e.year))].sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900">Linha do Tempo</h1>
          <p className="text-zinc-600">A trajetória do coletivo Re:combo de 2001 a 2008</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <button
            onClick={() => {
              const currentIndex = years.indexOf(selectedYear || years[0]);
              if (currentIndex > 0) setSelectedYear(years[currentIndex - 1]);
            }}
            className="rounded-full p-2 hover:bg-zinc-200"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex max-w-md gap-2 overflow-x-auto">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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
            className="rounded-full p-2 hover:bg-zinc-200"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 -translate-x-1/2 bg-zinc-200 md:block" />

          <div className="space-y-8 md:space-y-12">
            {events.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-1 md:text-right">
                  <div
                    className={`rounded-lg border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-900 ${
                      selectedYear && event.year !== selectedYear ? "opacity-50" : ""
                    }`}
                  >
                    <span className="text-sm font-bold text-zinc-400">{event.year}</span>
                    <h3 className="mt-1 text-lg font-semibold text-zinc-900">{event.title}</h3>
                    <p className="mt-2 text-sm text-zinc-600">{event.description}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-zinc-500">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    {event.artworks && event.artworks.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {event.artworks.map((artwork) => (
                          <Link
                            key={artwork.slug}
                            href={`/obra/${artwork.slug}`}
                            className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-200"
                          >
                            Ver obra →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative z-10 hidden h-4 w-4 shrink-0 rounded-full bg-zinc-900 md:block" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-200 pt-8">
          <h3 className="mb-4 text-sm font-medium text-zinc-700">Legenda</h3>
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
                <div
                  className={`h-3 w-3 rounded-full ${
                    item.type === "founding"
                      ? "bg-zinc-900"
                      : item.type === "performance"
                        ? "bg-blue-500"
                        : item.type === "exhibition"
                          ? "bg-green-500"
                          : item.type === "installation"
                            ? "bg-purple-500"
                            : item.type === "festival"
                              ? "bg-orange-500"
                              : "bg-zinc-400"
                  }`}
                />
                <span className="text-sm text-zinc-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
