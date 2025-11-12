// components/Header.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaTools, FaUsers, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import AddBudgetModal from "../Budget/AddBudgetModal";
import { FaHouse } from "react-icons/fa6";
import Image from "next/image";

const navLinks = [
  { name: "Início", href: "/", icon: FaHouse },
  { name: "Sobre Nós", href: "#about", icon: FaUsers },
  { name: "Serviços", href: "#services", icon: FaTools },
  { name: "Contato", href: "#contact", icon: FaEnvelope },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
          : "bg-white py-4"
      }`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="bg-orange-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300 hidden md:block">
                  <Image
                    src="/images/guga-logo.png"
                    alt="GugaTech Fortaleza Logo"
                    width={42}
                    height={42}
                    className="object-contain invert"
                     />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GugaTech Fortaleza</h1>
                  <p className="text-xs text-gray-500 -mt-1">Tecnologia & Soluções</p>
                </div>
              </Link>
            </div>

            {/* Navegação Desktop */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-all duration-200 font-medium group"
                >
                  <link.icon className="text-orange-500 group-hover:scale-110 transition-transform duration-200" />
                  <span className="relative">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              ))}
              <button
                onClick={() => setIsBudgetModalOpen(true)}
                className="ml-4 px-6 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <FaTools className="text-sm" />
                Fazer Orçamento
              </button>
            </div>

            {/* Botão Menu Móvel */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setIsBudgetModalOpen(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors"
              >
                Orçamento
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-orange-500 focus:outline-none transition-colors duration-200 p-2"
              >
                <span className="sr-only">Abrir menu</span>
                {isMobileMenuOpen ? (
                  <HiX className="text-2xl" />
                ) : (
                  <HiMenu className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Menu Móvel (Dropdown) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-xl absolute top-full left-0 right-0 z-40 border-t border-gray-100">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200 group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon className="text-orange-500 text-lg group-hover:scale-110 transition-transform" />
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsBudgetModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium text-white bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 mt-4"
              >
                <FaTools />
                Fazer Orçamento
              </button>
            </div>
            
            {/* Contato Rápido no Mobile */}
            <div className="px-4 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-center gap-4">
                <a
                  href="https://wa.me/558598228544"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 font-semibold text-sm"
                >
                  <FaWhatsapp className="text-lg" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Espaço para o header fixo */}
      <div className="h-20"></div>

      <AddBudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />
    </>
  );
}