// components/AboutUs.tsx
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaStar, FaShieldAlt, FaClock, FaHome } from "react-icons/fa";

export default function AboutUs() {
  return (
    <section className="bg-linear-to-br from-gray-50 to-white py-20 md:py-32" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da seção */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            GugaTech Fortaleza
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Especialistas em <span className="text-orange-600">Tecnologia</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mais de 10 anos oferecendo soluções completas em TI com qualidade e confiança
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* Coluna da Promoção */}
          <div className="lg:col-span-2 w-full h-full">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
              
              {/* Badge de Destaque */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  LIMITADO!
                </div>
              </div>

              {/* Parte Superior: Promoção */}
              <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>
                
                <div className="relative z-10">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/30">
                    Promoção Exclusiva
                  </span>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-sm line-through opacity-80">R$ 120</span>
                    <h3 className="text-6xl font-black mb-2">R$70</h3>
                  </div>
                  <p className="text-xl font-bold mb-1">Formatação Completa</p>
                  <p className="text-base opacity-90">Windows + Backup + Otimização</p>
                  
                  {/* Lista de benefícios */}
                  <div className="mt-6 space-y-2 text-left bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FaStar className="text-yellow-300 shrink-0" />
                      <span>Instalação do Windows 10/11</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaShieldAlt className="text-green-300 shrink-0" />
                      <span>Antivirus incluso</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaClock className="text-blue-300 shrink-0" />
                      <span>Backup dos seus arquivos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaHome className="text-purple-300 shrink-0" />
                      <span>Busca e entrega grátis</span>
                    </div>
                  </div>

                  {/* Botão CTA */}
                  <Link href="/" className="group mt-6 px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center w-full transform hover:scale-105">
                    <span className="text-lg">Quero Aproveitar!</span>
                    <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-2" />
                  </Link>
                  
                  <p className="text-xs mt-3 opacity-80">
                    Oferta válida por tempo limitado
                  </p>
                </div>
              </div>
              
              {/* Parte Inferior: Logo */}
              <div className="bg-linear-to-r from-gray-50 to-gray-100 p-6 text-center border-t border-gray-200">
                <div className="flex items-center justify-center gap-4">
                  <Image
                    src="/images/guga-logo.png"
                    alt="GugaTech Fortaleza"
                    width={140}
                    height={60}
                    className="drop-shadow-sm"
                  />
                </div>
                <div className="flex justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2 font-medium">
                  +500 clientes satisfeitos
                </p>
              </div>
            </div>
          </div>

          {/* Coluna "Sobre Nós" */}
          <div className="lg:col-span-3 w-full h-full">
            <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl border border-gray-100 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-10 bg-orange-600 rounded-full"></div>
                <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">
                  Nossa História
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-tight">
                Soluções em TI com <span className="text-orange-600">Excelência</span>
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p className="text-xl text-gray-800 font-medium leading-9">
                  A <strong className="font-bold text-gray-900">GugaTech Fortaleza</strong> é referência em soluções de TI para notebooks, 
                  PCs e iMacs/MacBooks, com mais de <strong className="text-orange-600">10 anos de experiência</strong> no mercado.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg mt-1">
                      <FaShieldAlt className="text-orange-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Profissionais Qualificados</h4>
                      <p className="text-gray-600 text-sm mt-1">Equipe especializada com certificações</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg mt-1">
                      <FaClock className="text-orange-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Atendimento Rápido</h4>
                      <p className="text-gray-600 text-sm mt-1">Soluções eficientes no menor tempo</p>
                    </div>
                  </div>
                </div>

                <p>
                  Utilizamos <strong className="font-semibold text-gray-900">equipamentos de última geração</strong> para garantir 
                  um atendimento preciso e de alta qualidade para todas as suas necessidades tecnológicas.
                </p>

                <div className="bg-linear-to-r from-orange-50 to-amber-50 p-6 rounded-xl border-l-4 border-orange-500">
                  <p className="font-semibold text-gray-800 italic">
                    Nosso compromisso é com a <strong className="text-orange-600">transparência, confiança e satisfação</strong> total 
                    do cliente. Do conserto mais simples às instalações mais complexas, sua tranquilidade é nossa prioridade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}