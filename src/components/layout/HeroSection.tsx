// components/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaTools, FaShieldAlt, FaClock, FaStar } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coluna de Texto */}
          <div className="text-center lg:text-left space-y-8">
           
            {/* Badge */}
            <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-orange-200">
            Assistência Técnica Especializada
          </span>

            {/* Título Principal */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                GugaTech
              </span>
              <br />
              <span className="text-gray-900">Fortaleza</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-lg">
              Soluções completas em 
              <span className="text-orange-400 font-semibold"> TI e tecnologia </span>
              para seu notebook, PC e MacBook
            </p>

            {/* Lista de Benefícios */}
            <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-md">
              <div className="flex items-center gap-3 text-gray-600">
                <FaTools className="text-orange-400 text-lg" />
                <span>Reparo Profissional</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaShieldAlt className="text-orange-400 text-lg" />
                <span>Garantia no Serviço</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaClock className="text-orange-400 text-lg" />
                <span>Atendimento Rápido</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
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
                className="group px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 w-full sm:w-auto"
              >
                <FaTools />
                <span>VER SERVIÇOS</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-sm text-gray-600">
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
              <div className="absolute -top-4 -left-4 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-lg font-bold border border-orange-500/30">
                <div className="flex items-center gap-2 ">
                  <FaStar className="text-orange-500" />
                  <span>10+ Anos de Experiência</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute md:top-120 lg:top-150 lg:left-160 left-130 w-full h-full hidden md:block">
              <Image
                src="/images/guga_logo.png"
                alt="Técnico da GugaTech Fortaleza"
                width={200}
                height={200}
                className=" object-cover object-center rounded-3xl bg-gray-50 shadow-2xl"
                priority
              />
            </div>
        </div>
      </div>

      
    </section>
  );
}