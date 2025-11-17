import imageUrlBuilder from '@sanity/image-url'
import { projectId, dataset } from './sanity.client' // Importe do seu client
import { Image } from 'sanity' // Importe o tipo de imagem

// Configura o builder
const builder = imageUrlBuilder({ projectId, dataset })

// A função helper
export function urlFor(source: Image) {
  return builder.image(source)
}