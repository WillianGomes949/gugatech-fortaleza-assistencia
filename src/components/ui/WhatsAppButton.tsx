// src/components/ui/WhatsAppButton.tsx
"use client";

import { meusDados } from "@/data/db";
import Link from "next/link";
// import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  position?: "bottom-right" | "bottom-left";
  showPopup?: boolean;
}

// Versão Simples (sem popup)
export function WhatsAppButton({
  position = "bottom-right",
}: WhatsAppButtonProps) {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  };

  return (
    <Link
      href={meusDados.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed ${positionClasses[position]} z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 group`}
      aria-label="Conversar no WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6" />

      {/* Efeito de pulsaçao sutil */}
      <div className="overflow-hidden absolute inset-0 rounded-2xl bg-green-500 animate-[ping_1s_linear_infinite] opacity-20 group-hover:opacity-30"></div>

      {/* Tooltip no hover */}
      <span
        className="absolute bottom-full mb-2 left-1/2 -translate-x-6
                       px-3 py-1.5 rounded-md bg-zinc-900 text-white text-sm
                       transition-all duration-200 ease-in-out
                       scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100
                       origin-left whitespace-nowrap"
      >
        WhatsApp
      </span>
    </Link>
  );
}
