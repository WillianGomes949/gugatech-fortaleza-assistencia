// app/api/admin/update/route.ts
import { sanityWriteClient } from "@/lib/sanity.write-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { _id, _type, ...data } = body;

    if (!_id) {
      return NextResponse.json(
        { message: "ID é obrigatório" },
        { status: 400 }
      );
    }

    // Define quais campos vamos atualizar baseados no tipo
    let fieldsToUpdate = {};

    if (_type === 'budgetRequest') {
      // Campos de Orçamento
      fieldsToUpdate = {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        additionalNotes: data.additionalNotes,
        // Nota: Não estamos atualizando 'items' aqui pois requer lógica complexa de array
      };
    } else {
      // Campos de Mensagem de Contato
      fieldsToUpdate = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message,
      };
    }

    // Envia para o Sanity
    await sanityWriteClient
      .patch(_id)
      .set(fieldsToUpdate)
      .commit();

    return NextResponse.json(
      { message: "Dados atualizados com sucesso" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro ao atualizar dados:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}