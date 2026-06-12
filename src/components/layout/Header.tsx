"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "Acervo", href: "/arquivo" },
  { label: "Linha do Tempo", href: "/timeline" },
  { label: "Mapa", href: "/mapa" },
  { label: "Rede", href: "/rede" },
  { label: "Sobre", href: "/sobre" },
  { label: "Comunidade", href: "/comunidade" },
];

const FEATURED_TAGS = [
  "remix",
  "net.art",
  "performance",
  "áudio",
  "glitch",
  "colaboração",
  "manguebeat",
  "software livre",
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q");
    if (query) {
      router.push(`/arquivo?search=${encodeURIComponent(query as string)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-500">
              <span className="font-mono text-lg font-bold text-black">R</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-700">
                re:combo
              </span>
              <span className="ml-2 hidden text-xs text-zinc-500 lg:inline">
                o arquivo como semente
              </span>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <form onSubmit={handleSearch} className="pb-4">
            <div className="relative">
              <input
                type="text"
                name="q"
                placeholder="Buscar no acervo..."
                className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-4 py-2 pl-10 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-900"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            </div>
          </form>
        )}

        {/* Tags Bar */}
        <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-3">
          <span className="shrink-0 text-xs font-medium text-zinc-400">Tags:</span>
          {FEATURED_TAGS.map((tag) => (
            <Link
              key={tag}
              href={`/arquivo?tag=${encodeURIComponent(tag)}`}
              className="inline-flex shrink-0 items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
