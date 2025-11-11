// components/HeroSection.tsx

import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Coluna de Texto */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Geek Fortaleza
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Conserto de Notebook, PC, MacBook, iMac e Venda de Acessórios.
              Assistência técnica especializada!
            </p>
            <Link
              href="https://wa.me/558598228544" // Coloque seu link do WhatsApp aqui
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center px-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-orange-600 transition-colors duration-300"
            >
              <FaWhatsapp className="h-6 w-6 mr-3" />
              (85) 9822-8544
            </Link>
          </div>

          {/* Coluna da Imagem */}
          <div className="relative w-full h-64 md:h-96">
            <div className="absolute z-10 hover:animation-fade-in h-full w-xl overflow-hidden hidden md:flex">
              <Image
                src="/images/desk.webp"
                alt="Assistência Técnica Geek Fortaleza"
                layout="fill"
                className="object-cover rounded-2xl "
                priority // Carrega a imagem principal com prioridade
              />
              <div className=" z-20 bg-linear-0 to-orange-500 via-amber-300 from-orange-500 min-h-64 w-full overflow-hidden -right-20 top-20 hover:top-19 transition-all duration-400 ease-in-out opacity-30 rounded-2xl"></div>
            </div>
            
            <div className="md:absolute z-20 h-80 w-80 overflow-hidden -left-20 lg:-left-15 top-20 hover:top-19 transition-all duration-400 ease-in-out">
              <Image
                src="/images/gustavo_1.webp"
                alt="Assistência Técnica Geek Fortaleza"
                layout="fill"
                className="object-cover object-top rounded-2xl"
                priority // Carrega a imagem principal com prioridade
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
