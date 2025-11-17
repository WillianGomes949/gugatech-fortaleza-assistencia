// lib/sanity.client.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'
import { Image } from 'sanity'

// Variáveis públicas lidas do .env.local
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";

// Validação SÓ das chaves públicas
if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!dataset) throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");

/**
 * Client PÚBLICO (para ler dados no Client e Server Components)
 * Não contém nenhum token secreto.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `true` é bom para performance de leitura
});

/**
 * Helper para gerar URLs de imagens do Sanity
 */
const builder = imageUrlBuilder({ projectId, dataset });
export function urlFor(source: Image) {
  return builder.image(source);
}