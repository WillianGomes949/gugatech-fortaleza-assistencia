// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("admin-auth");
  const url = req.nextUrl.clone();

  // O usuário está tentando acessar a página de login
  if (url.pathname === "/admin/login") {
    // Se ele já tiver o cookie, mande ele pro admin
    if (cookie?.value === "true") {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    // Se não tiver, deixe ele ver a página de login
    return NextResponse.next();
  }

  // Se ele NÃO tiver o cookie e tentar acessar uma rota protegida...
  if (cookie?.value !== "true") {
    // ...redirecione ele para o login.
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Se ele tiver o cookie, deixe ele passar
  return NextResponse.next();
}

// O config agora protege /admin E /api/admin,
// MAS ignora /admin/login.
export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
    // Excluir a rota de login da proteção
    // para não causar um loop infinito
    "/((?!admin/login|api/auth/login).*)",
  ],
};