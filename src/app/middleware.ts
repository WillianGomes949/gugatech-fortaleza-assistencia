// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("admin-auth");
  const url = req.nextUrl.clone();

  // Se está tentando acessar /admin/login E já está logado → redireciona para /admin
  if (url.pathname === "/admin/login") {
    if (cookie?.value === "true") {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    // Se não está logado, deixa acessar a página de login
    return NextResponse.next();
  }

  // Se está tentando acessar qualquer rota protegida E NÃO está logado → redireciona para login
  if (cookie?.value !== "true") {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Se está logado, deixa passar
  return NextResponse.next();
}

// CONFIG SIMPLIFICADA - Só protege as rotas que realmente precisam
export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};