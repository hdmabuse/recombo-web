"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  Users,
  Calendar,
  MessageSquare,
  Tags,
  Settings,
  Database,
  ChevronDown,
  FolderOpen,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/artworks", label: "Obras", icon: Image },
  { href: "/admin/artists", label: "Artistas", icon: Users },
  { href: "/admin/events", label: "Eventos", icon: Calendar },
  { href: "/admin/interviews", label: "Entrevistas", icon: MessageSquare },
  { href: "/admin/tags", label: "Tags", icon: Tags },
];

const SETTINGS_ITEMS = [
  { href: "/admin/fields", label: "Campos Customizados", icon: Database },
  { href: "/admin/settings", label: "Configurações", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-zinc-800 bg-sidebar">
        <div className="border-b border-zinc-800 p-4">
          <Link href="/admin" className="text-xl font-bold text-white">
            RE:COMBO
          </Link>
          <p className="mt-0.5 text-xs text-zinc-500">Admin</p>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}

          <div className="mt-4 border-t border-zinc-800 pt-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <FolderOpen className="h-5 w-5" />
              <span className="flex-1 text-left">Sistema</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showSettings ? "rotate-180" : ""}`}
              />
            </button>

            {showSettings && (
              <div className="ml-4 mt-2 space-y-1">
                {SETTINGS_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      pathname === item.href
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="border-t border-zinc-800 p-4">
          <Link href="/" className="text-xs text-zinc-500 transition-colors hover:text-zinc-300">
            ← Voltar ao site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
