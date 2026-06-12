import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { Session } from "next-auth";

export type UserRole = "admin" | "editor" | "viewer";

/**
 * Garante que a requisição está autenticada e que o usuário possui um dos papéis
 * permitidos. Retorna a sessão quando autorizado, ou uma Response (401/403) que
 * o handler deve repassar diretamente.
 *
 * Uso:
 *   const session = await requireRole(["admin", "editor"]);
 *   if (session instanceof NextResponse) return session;
 */
export async function requireRole(roles: UserRole[]): Promise<Session | NextResponse> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const role = (session.user as { role?: UserRole }).role;
  if (!role || !roles.includes(role)) {
    return NextResponse.json({ error: "Permissão negada" }, { status: 403 });
  }
  return session;
}
