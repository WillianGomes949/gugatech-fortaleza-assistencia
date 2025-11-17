import { createClient } from '@sanity/client'

// Validação simples para garantir que as variáveis de ambiente estão carregadas
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}
if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')
}
if (!process.env.SANITY_API_TOKEN) {
  throw new Error('Missing SANITY_API_TOKEN')
}

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-05-01', 
  useCdn: false, 
  token: process.env.NEXT_SANITY_API_TOKEN,
})