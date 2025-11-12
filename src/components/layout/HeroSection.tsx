// components/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaTools, FaShieldAlt, FaClock, FaStar } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,140,0,0.1),transparent_50%)]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coluna de Texto */}
          <div className="text-center lg:text-left space-y-8">
           
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 px-4 py-2 rounded-full text-orange-300 text-sm font-semibold">
              Assistência Técnica Especializada
            </div>

            {/* Título Principal */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                GugaTech
              </span>
              <br />
              <span className="text-white">Fortaleza</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-lg">
              Soluções completas em 
              <span className="text-orange-400 font-semibold"> TI e tecnologia </span>
              para seu notebook, PC e MacBook
            </p>

            {/* Lista de Benefícios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
              <div className="flex items-center gap-3 text-gray-300">
                <FaTools className="text-orange-400 text-lg" />
                <span>Reparo Profissional</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaShieldAlt className="text-orange-400 text-lg" />
                <span>Garantia no Serviço</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaClock className="text-orange-400 text-lg" />
                <span>Atendimento Rápido</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaWhatsapp className="text-orange-400 text-lg" />
                <span>Suporte Total</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
              <Link
                href="https://wa.me/558598228544"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 w-full sm:w-auto"
              >
                <FaWhatsapp className="text-xl" />
                <span>FALAR NO WHATSAPP</span>
              </Link>
              
              <Link
                href="#services"
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg font-bold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <FaTools />
                <span>VER SERVIÇOS</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span>Seja mais um cliente satisfeito</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <span>4.9/5.0 avaliações</span>
              </div>
            </div>
          </div>

          {/* Coluna da Imagem */}
          <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
            {/* Imagem Principal */}
            <div className="relative w-full h-full">
              <Image
                src="/images/gustavo_1.webp"
                alt="Técnico da GugaTech Fortaleza"
                fill
                className="object-cover object-center rounded-3xl shadow-2xl"
                priority
              />
              
              {/* Overlay de Destaque */}
              <div className="absolute -bottom-6 -right-6 bg-linear-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-2xl">
                <div className="text-center text-white">
                  <div className="text-2xl font-black">R$70</div>
                  <div className="text-sm font-semibold">Formatação</div>
                  <div className="text-xs opacity-90">com Backup</div>
                </div>
              </div>

              {/* Badge de Experiência */}
              <div className="absolute -top-4 -left-4 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-lg font-bold">
                <div className="flex items-center gap-2">
                  <FaStar className="text-orange-500" />
                  <span>10+ Anos de Experiência</span>
                </div>
              </div>
            </div>

            {/* Elementos Decorativos */}
            <div className="absolute -z-10 top-10 -right-10 w-64 h-64 bg-orange-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -z-10 bottom-10 -left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      
    </section>
  );
}