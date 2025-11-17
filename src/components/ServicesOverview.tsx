// components/ServicesOverview.tsx
import Image from 'next/image'
import Link from 'next/link'
import { IconType } from 'react-icons'
import {
  HiShieldCheck,
  HiDesktopComputer,
  HiChip,
  HiCube,
  HiWifi,
} from 'react-icons/hi'
import { FaArrowRight, FaClock, FaShieldAlt } from 'react-icons/fa'

// 1. IMPORTAÇÕES DO SANITY
import { sanityClient } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image' // Nosso helper de imagem
import { groq } from 'next-sanity'
import { Image as SanityImage } from 'sanity' // Renomeia o tipo para evitar conflito
import { HiWrenchScrewdriver } from 'react-icons/hi2'

// 2. INTERFACE DOS DADOS VINDOS DO SANITY
// Corresponde ao nosso schema 'service'
interface ServiceSanity {
  _id: string
  title: string
  slug: { current: string }
  description: string
  image: SanityImage // Tipo de imagem do Sanity
  duration: string
  icon: string // Ex: "HiShieldCheck" (vem como texto)
  features: string[]
  price: string
}

// 3. MAPEADOR DE ÍCONES
// Converte o texto do Sanity (Ex: "HiShieldCheck") no componente React
const iconMap: Record<string, IconType> = {
  HiShieldCheck: HiShieldCheck,
  HiDesktopComputer: HiDesktopComputer,
  HiWrenchScrewdriver: HiWrenchScrewdriver,
  HiChip: HiChip,
  HiCube: HiCube,
  HiWifi: HiWifi,
  // Adicione outros ícones que você cadastrar no Sanity aqui
}

// 4. A CONSULTA GROQ
// Busca todos os documentos do tipo 'service'
const servicesQuery = groq`*[_type == "service"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  image,
  duration,
  icon,
  features,
  price
}`

// 5. TRANSFORMA O COMPONENTE EM ASSÍNCRONO
export default async function ServicesOverview() {
  
  // 6. BUSCA OS DADOS NO SERVIDOR
  const services = await sanityClient.fetch<ServiceSanity[]>(servicesQuery)

  return (
    <section
      className="bg-linear-to-br from-gray-50 to-white py-20 md:py-28"
      id="services"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção (Sem mudanças) */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-orange-200">
            Nossos Serviços
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Assistência Técnica{" "}
            <span className="text-orange-600">Completa</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Serviços especializados com retirada e entrega grátis no local
          </p>
        </div>

        {/* 7. GRID DE SERVIÇOS DINÂMICO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            // Encontra o componente de ícone correto, ou usa um padrão
            const IconComponent = iconMap[service.icon] || HiWrenchScrewdriver
            
            // Gera a URL da imagem
            const imageUrl = urlFor(service.image)
              .width(400)
              .height(250)
              .url()

            return (
              <div
                key={service._id} // Usa o _id do Sanity como key
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Imagem do Serviço */}
                <div className="relative overflow-hidden">
                  <Image
                    src={imageUrl} // URL dinâmica
                    alt={service.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <FaClock className="text-xs" />
                    {service.duration}
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                    <IconComponent className="text-orange-500 text-2xl" />
                  </div>
                </div>

                {/* Conteúdo do Serviço */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Lista de Features */}
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {service.features?.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rodapé do Card */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {/* Preço (Novo) */}
                    <div>
                      <span className="text-xl font-bold text-orange-600">
                        {service.price}
                      </span>
                    </div>

                    {/* Garantia */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaShieldAlt className="text-orange-500" />
                        <span>Garantia</span>
                      </div>
                    </div>
                    {/* Link (Pode reativar se quiser) */}
                    {/* <Link
                      href={`/servicos/${service.slug.current}`} // Link dinâmico
                      className="group flex ..."
                    >
                      Saiba mais
                    </Link> 
                    */}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Final */}
        <div className="text-center mt-12">
          <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg">
            <h3 className="text-2xl font-bold mb-4">
              Não encontrou o que precisa?
            </h3>
            <p className="text-orange-100 mb-6">
              Entre em contato e teremos prazer em ajudar com sua necessidade
              específica
            </p>
            <Link
              href="https://wa.me/558598228544"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>FALAR COM ESPECIALISTA</span>
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
