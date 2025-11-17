// app/api/submit-budget/route.ts

import { NextResponse } from "next/server";// Importe seu client de escrita
import { BudgetItem } from "@/app/budget/page"; // Ajuste o path se necessário
import { sanityWriteClient } from "@/lib/sanity.write-client";

interface RequestBody {
  customerName: string;
  customerPhone: string;
  additionalNotes: string;
  items: BudgetItem[];
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    const { customerName, customerPhone, additionalNotes, items } = body;

    if (!customerName || !customerPhone || !items || items.length === 0) {
      return NextResponse.json(
        { message: "Dados incompletos" },
        { status: 400 }
      );
    }

    // Formata os itens para o schema do Sanity (sem o 'id' do React)
    const formattedItems = items.map((item) => ({
      _key: item.id,
      _type: "object", // Sanity precisa saber o tipo
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      notes: item.notes || "",
    }));

    // Cria o documento no Sanity
    const doc = {
      _type: "budgetRequest",
      customerName,
      customerPhone,
      additionalNotes: additionalNotes || "",
      items: formattedItems,
      status: "pending",
    };

    const result = await sanityWriteClient.create(doc);

    return NextResponse.json(
      { message: "Orçamento enviado!", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao enviar para o Sanity:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}