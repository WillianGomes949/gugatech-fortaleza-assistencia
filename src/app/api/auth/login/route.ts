// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { password } = await request.json();

  const correctPassword = process.env.ADMIN_PASS;

  if (password === correctPassword) {
    // Senha correta!
    // Define um cookie seguro, HttpOnly, que expira em 1 dia
    cookies().set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 dia
      path: "/",
    });
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Senha incorreta
  return NextResponse.json(
    { message: "Senha incorreta" },
    { status: 401 }
  );
}