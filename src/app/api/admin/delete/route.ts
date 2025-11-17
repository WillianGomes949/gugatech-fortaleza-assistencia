// app/api/admin/delete/route.ts
import { sanityWriteClient } from "@/lib/sanity.write-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID do documento é obrigatório" },
        { status: 400 },
      );
    }

    // O Sanity vai deletar o documento com este ID
    await sanityWriteClient.delete(id);

    return NextResponse.json(
      { message: "Item excluído com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao deletar item:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}