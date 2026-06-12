import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isApiAdmin = pathname.startsWith("/api/admin");
  const isOnAdmin = pathname.startsWith("/admin");
  const isOnLogin = pathname.startsWith("/admin/login");

  // APIs administrativas: exigem autenticação e respondem 401 (não redirecionam).
  if (isApiAdmin && !isLoggedIn) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  // Telas /admin: redireciona para o login quando não autenticado.
  if (isOnAdmin && !isLoggedIn && !isOnLogin) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  if (isOnLogin && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
