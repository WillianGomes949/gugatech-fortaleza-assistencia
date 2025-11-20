// components/TopButton.tsx
"use client";
import { meusDados } from "@/data/db";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { RiArrowUpLine } from "react-icons/ri";

export default function BotoesInf() {
  const [isVisible, setIsVisible] = useState(false);

  // Monitora o scroll da página
  useEffect(() => {
    const toggleVisibility = () => {
      // Mostra o botão se o scroll for maior que 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Função para voltar ao topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      <Link
        href={meusDados.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 group`}
        aria-label="Conversar no WhatsApp"
      >
        <FaWhatsapp className="h-6 w-6" />

        {/* Efeito de pulsaçao sutil */}
        <div className="overflow-hidden absolute inset-0 rounded-2xl bg-green-500 animate-[ping_1s_linear_infinite] opacity-20 group-hover:opacity-30"></div>

        {/* Tooltip no hover */}
        <span
          className="absolute bottom-full mb-2 left-1/2
                       px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm font-medium
                       shadow-lg
                       transition-all duration-200 ease-in-out
                       scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100
                       origin-bottom whitespace-nowrap
                       -translate-x-32 translate-y-12"
        >
          WhatsApp
        </span>
      </Link>
      {isVisible && (
        // 1. Container relativo para o tooltip (classe 'group')
        //    Posicionado fixo no canto da tela
        <div className="fixed bottom-23 right-6 z-50 group transition-all duration-300 ease-initial ">
          <button
            type="button"
            className=" flex justify-center items-center w-12 h-12 hover:scale-110 active:scale-95 z-50 animate-fade-in bg-orange-500 hover:bg-orange-600 p-3 rounded-2xl shadow-lg text-white"
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
          >
            <RiArrowUpLine size={30} />
          </button>

          {/* 2. O Tooltip*/}
          <span
            className="absolute bottom-full mb-2 left-1/2
                       px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm font-medium
                       shadow-lg
                       transition-all duration-200 ease-in-out
                       scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100
                       origin-bottom whitespace-nowrap
                       -translate-x-38 translate-y-12.5"
          >
            Voltar ao Topo
          </span>
        </div>
      )}
    </>
  );
}
