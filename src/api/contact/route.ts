import { sanityClient } from '@/lib/sanity.client' // Importa nosso client
import { NextResponse } from 'next/server'

// Interface para garantir que os dados do corpo da requisição estão corretos
interface RequestBody {
  name: string
  email: string
  phone: string
  serviceType: string
  message: string
}

export async function POST(request: Request) {
  // 1. Validar e pegar os dados do corpo (body) da requisição
  try {
    const body: RequestBody = await request.json()
    const { name, email, phone, serviceType, message } = body

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios estão faltando' },
        { status: 400 },
      )
    }

    // 2. Criar o documento no formato do schema 'contactMessage'
    const doc = {
      _type: 'contactMessage',
      name,
      email,
      phone,
      serviceType: serviceType || 'Nenhum selecionado', // Valor padrão caso venha vazio
      message,
      createdAt: new Date().toISOString(), // Adiciona a data/hora
      status: 'pending', // Status inicial
    }

    // 3. Enviar o documento para o Sanity
    await sanityClient.create(doc)

    // 4. Retornar sucesso
    return NextResponse.json(
      { message: 'Mensagem recebida com sucesso!' },
      { status: 201 },
    )
  } catch (error) {
    console.error('Erro ao processar a requisição:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}