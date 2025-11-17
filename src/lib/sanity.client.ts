// lib/sanity.client.ts
import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";

// Validação simples para garantir que as variáveis de ambiente estão carregadas
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}
if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
}
if (!process.env.SANITY_API_TOKEN) {
  throw new Error("Missing SANITY_API_TOKEN");
}

// Client PÚBLICO (para ler dados)
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Mude para false se usar getStaticProps/ISR
});

// Client PRIVADO (para escrever dados)
// Note o token!
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
