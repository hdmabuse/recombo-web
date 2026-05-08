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
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center rounded-md">
              <span className="text-white font-mono font-bold text-lg">R</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
                re:combo
              </span>
              <span className="hidden lg:inline text-xs text-zinc-500 ml-2">
                o arquivo como semente
              </span>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
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
                className="w-full px-4 py-2 pl-10 bg-zinc-50 border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            </div>
          </form>
        )}

        {/* Tags Bar */}
        <div className="flex items-center gap-2 pb-3 overflow-x-auto scrollbar-hide">
          <span className="text-xs font-medium text-zinc-400 shrink-0">Tags:</span>
          {FEATURED_TAGS.map((tag) => (
            <Link
              key={tag}
              href={`/arquivo?tag=${encodeURIComponent(tag)}`}
              className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors shrink-0"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}