// components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import AddBudgetModal from "../Budget/AddBudgetModal";

const navLinks = [
  { name: "Inicio", href: "/", icone: FaHouse },
  { name: "Sobre Nós", href: "#about" },
  { name: "Serviços", href: "#services" },
  { name: "Contato", href: "#contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false); // <--- 2. Adicionar estado para o modal

  return (
    <> {/* <--- 3. Adicionar Fragment para incluir o modal */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Geek Fortaleza
              </Link>
            </div>

            {/* Navegação Desktop */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex gap-4 justify-center items-center text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium"
                >
                  {link.icone && <link.icone />}
                  {link.name}
                </Link>
              ))}
              {/* 4. MUDAR Link para button (Desktop) */}
              <button
                onClick={() => setIsBudgetModalOpen(true)}
                className="ml-4 px-5 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors duration-200"
              >
                Fazer Orçamento
              </button>
            </div>

            {/* Botão Menu Móvel (Hambúrguer) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <span className="sr-only">Abrir menu</span>
                {isMobileMenuOpen ? <HiX /> : <HiMenu />}
              </button>
            </div>
          </div>
        </nav>

        {/* Menu Móvel (Dropdown) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 right-0 z-40">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)} // Fecha o menu ao clicar
                >
                  {link.name}
                </Link>
              ))}
              {/* 5. MUDAR Link para button (Mobile) */}
              <button
                onClick={() => {
                  setIsBudgetModalOpen(true); // Abre o modal
                  setIsMobileMenuOpen(false); // Fecha o menu mobile
                }}
                className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-white bg-orange-500 hover:bg-orange-600"
              >
                Fazer Orçamento
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 6. Renderizar o Modal */}
      <AddBudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />
    </>
  );
}