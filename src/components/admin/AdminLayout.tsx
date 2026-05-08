"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileAudio, 
  Users, 
  Calendar, 
  Tags, 
  Settings,
  Database,
  Upload
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/artworks", label: "Obras", icon: FileAudio },
  { href: "/admin/artists", label: "Artistas", icon: Users },
  { href: "/admin/events", label: "Eventos", icon: Calendar },
  { href: "/admin/tags", label: "Tags", icon: Tags },
  { href: "/admin/import", label: "Importar", icon: Upload },
  { href: "/admin/export", label: "Exportar", icon: Database },
  { href: "/admin/settings", label: "Configurações", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-900 text-zinc-300 min-h-screen fixed">
          <div className="p-6">
            <Link href="/admin" className="text-white font-bold text-xl">
              RE:COMBO
            </Link>
            <p className="text-xs text-zinc-500 mt-1">Admin</p>
          </div>
          
          <nav className="px-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/admin" && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-1 ${
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="absolute bottom-0 w-full p-4 border-t border-zinc-800">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-300"
            >
              ← Voltar ao site
            </Link>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}