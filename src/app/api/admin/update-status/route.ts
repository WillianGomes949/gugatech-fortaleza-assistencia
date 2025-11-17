// app/api/admin/update-status/route.ts
import { sanityWriteClient } from "@/lib/sanity.write-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { message: "ID e Status são obrigatórios" },
        { status: 400 },
      );
    }

    // Faz o "patch" (atualização parcial) do documento
    await sanityWriteClient
      .patch(id)
      .set({ status: status }) // Define o novo valor do campo 'status'
      .commit();

    return NextResponse.json(
      { message: "Status atualizado com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}