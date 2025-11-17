// lib/sanity.write-client.ts
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./sanity.client"; // Reutiliza as configs públicas

// Validação SÓ da chave privada
if (!process.env.NEXT_SANITY_API_TOKEN) {
  throw new Error("Missing NEXT_SANITY_API_TOKEN");
}

/**
 * Client PRIVADO (para escrever dados, SÓ no servidor/API Routes)
 * Contém o token secreto.
 */
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Escrita nunca deve usar cache
  token: process.env.NEXT_SANITY_API_TOKEN,
});