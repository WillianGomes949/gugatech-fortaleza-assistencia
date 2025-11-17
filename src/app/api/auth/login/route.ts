// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  const correctPassword = process.env.ADMIN_PASS;

  if (!correctPassword) {
    console.error("ADMIN_PASS não está configurado no .env");
    return NextResponse.json(
      { message: "Erro de configuração no servidor" },
      { status: 500 }
    );
  }

  if (password === correctPassword) {
    // ✅ Método alternativo usando NextResponse
    const response = NextResponse.json({ success: true }, { status: 200 });
    
    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    
    return response;
  }

  return NextResponse.json(
    { message: "Senha incorreta" },
    { status: 401 }
  );
}