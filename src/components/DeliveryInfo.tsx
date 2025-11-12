// components/DeliveryInfo.tsx

import Image from 'next/image';
import { FaTruck, FaHome, FaClock, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

export default function DeliveryInfo(){
  return (
    <section className="bg-linear-to-br from-white to-gray-50 py-20 md:py-28" id='delivery'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-orange-200">
            Comodidade Total
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Serviço de <span className="text-orange-600">Busca e Entrega</span> Grátis
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pensamos na sua praticidade do início ao fim do serviço
          </p>
        </div>

        <div className="grid grid-cols-1  gap-12 items-center max-w-6xl mx-auto">
          
         

          {/* Coluna de Texto e Benefícios */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Conforto e Praticidade na Palma da sua Mão
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Oferecemos um serviço completo de retirada e entrega do seu equipamento 
                diretamente na sua residência ou empresa, sem custos adicionais. 
                Trabalhamos para tornar sua experiência a mais conveniente possível.
              </p>

              {/* Lista de Benefícios */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <FaHome className="text-orange-500 text-xl mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Retirada em Domicílio</h4>
                    <p className="text-gray-600 text-sm">
                      Buscamos seu equipamento no local que preferir
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <FaClock className="text-orange-500 text-xl mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Agendamento Flexível</h4>
                    <p className="text-gray-600 text-sm">
                      Escolha o melhor horário para a retirada
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <FaMapMarkerAlt className="text-orange-500 text-xl mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Cobertura Ampliada</h4>
                    <p className="text-gray-600 text-sm">
                      Atendemos diversos bairros de Fortaleza e região
                    </p>
                  </div>
                </div>
              </div>

              {/* Área de Cobertura */}
              <div className="bg-gray-900 text-white rounded-xl p-6">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <FaCheckCircle className="text-orange-400" />
                  Bairros Atendidos
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Aldeota</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Meireles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Dionísio Torres</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Papicu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Cocó</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>+ outros</span>
                  </div>
                </div>
                <p className="text-orange-300 text-xs mt-3">
                  * Consulte a disponibilidade para seu bairro
                </p>
              </div>

              {/* CTA */}
              <button className="w-full mt-6 px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group">
                <span>AGENDAR RETIRADA</span>
                <FaTruck className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
           {/* Coluna da Imagem */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/delivery.webp"
                alt="Serviço de Retirada e Entrega Grátis"
                width={600}
                height={600}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay de Destaque */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <FaTruck className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Entrega Rápida</h4>
                   
                  </div>
                </div>
              </div>
            </div>

            {/* Elementos Decorativos */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/5 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};