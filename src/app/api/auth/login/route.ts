// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { password } = await request.json();

  // Pega a senha correta do seu .env
  const correctPassword = process.env.ADMIN_PASS;

  if (!correctPassword) {
    // Erro de configuração no servidor
    console.error("ADMIN_PASS não está configurado no .env");
    return NextResponse.json(
      { message: "Erro de configuração no servidor" },
      { status: 500 }
    );
  }

  if (password === correctPassword) {
    // Senha correta!
    // Define um cookie seguro (HttpOnly) que expira em 1 dia
    cookies().set("admin-auth", "true", {
      httpOnly: true, // O cookie não pode ser lido por JS no navegador
      secure: process.env.NODE_ENV === "production", // Só em HTTPS
      maxAge: 60 * 60 * 24, // 1 dia
      path: "/", // O cookie vale para todo o site
    });
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Senha incorreta
  return NextResponse.json(
    { message: "Senha incorreta" },
    { status: 401 } // 401 = Não autorizado
  );
}