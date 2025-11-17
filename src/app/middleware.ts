// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // 1. Tenta pegar o cookie de autenticação
  const cookie = req.cookies.get("admin-auth");
  const url = req.nextUrl.clone(); // Cria uma cópia da URL para podermos mudá-la

  // 2. O usuário está tentando acessar a própria página de login
  if (url.pathname === "/admin/login") {
    // Se ele já ESTIVER logado (tem o cookie), mande ele embora do login
    if (cookie?.value === "true") {
      url.pathname = "/admin"; // Redireciona para o painel
      return NextResponse.redirect(url);
    }
    // Se não, deixe ele ver a página de login
    return NextResponse.next();
  }

  // 3. Se o usuário tentar acessar qualquer outra rota protegida
  //    e NÃO TIVER o cookie...
  if (cookie?.value !== "true") {
    // ...redirecione ele IMEDIATAMENTE para a página de login.
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // 4. Se ele tem o cookie, deixe ele passar.
  return NextResponse.next();
}

// 5. Configuração de quais rotas o "Segurança" deve vigiar
export const config = {
  matcher: [
    /*
     * Vigie todas essas rotas:
     */
    "/admin", // A página principal do admin
    "/admin/:path*", // Qualquer sub-página (ex: /admin/config)
    "/api/admin/:path*", // Todas as APIs do admin (delete, update, etc.)

    /*
     * E garanta que a lógica rode em todas as requisições,
     * exceto as que o Next.js precisa (como /_next/static)
     * e a PRÓPRIA API DE LOGIN (para não criar um loop infinito).
     */
    "/((?!_next/static|_next/image|favicon.ico|api/auth/login).*)",
  ],
};