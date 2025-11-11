// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { HiOutlineMapPin } from 'react-icons/hi2';

export default function Footer(){
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          {/* Coluna 1: Logo e Contato */}
          <div className="md:col-span-1 lg:col-span-1">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/images/geek-fortaleza-logo-white.svg" // Seu logo claro
                alt="Geek Fortaleza"
                width={160}
                height={60}
                objectFit="contain"
              />
            </Link>
            <ul className="space-y-3">
              <li className="flex items-start">
                <HiOutlineMapPin className="h-5 w-5 mt-1 mr-3 shrink-0 text-orange-400" />
                <span>Av. Bezerra de Menezes, 1234 - Fortaleza, CE</span>
              </li>
              <li className="flex items-center">
                <HiOutlinePhone className="h-5 w-5 mr-3 shrink-0 text-orange-400" />
                <a href="tel:+558598228544" className="hover:text-white">(85) 9822-8544</a>
              </li>
              <li className="flex items-center">
                <HiOutlineMail className="h-5 w-5 mr-3 shrink-0 text-orange-400" />
                <a href="mailto:contato@geekfortaleza.com.br" className="hover:text-white">
                  contato@geekfortaleza.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="md:col-span-1 lg:col-span-1">
            <h5 className="text-xl font-semibold text-white mb-4">Links Rápidos</h5>
            <ul className="space-y-2">
              <li><Link href="#about" className="hover:text-white">Sobre Nós</Link></li>
              <li><Link href="#services" className="hover:text-white">Serviços</Link></li>
              <li><Link href="#contact" className="hover:text-white">Contato</Link></li>
              <li><Link href="https://wa.me/558598228544" className="hover:text-white" target="_blank" rel="noopener noreferrer">Fazer Orçamento</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Serviços (Exemplo) */}
          <div className="md:col-span-1 lg:col-span-1">
            <h5 className="text-xl font-semibold text-white mb-4">Nossos Serviços</h5>
            <ul className="space-y-2">
              <li><Link href="#services" className="hover:text-white">Formatação</Link></li>
              <li><Link href="#services" className="hover:text-white">Remoção de Vírus</Link></li>
              <li><Link href="#services" className="hover:text-white">Manutenção Hardware</Link></li>
              <li><Link href="#services" className="hover:text-white">Reparo de Software</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div className="md:col-span-3 lg:col-span-1 text-center md:text-left">
            <h5 className="text-xl font-semibold text-white mb-4">Siga-nos</h5>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="https://wa.me/558598228544" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white">
                <FaWhatsapp className="h-8 w-8" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white">
                <FaInstagram className="h-8 w-8" />
              </Link>
            </div>
          </div>

        </div>

        {/* Linha de Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Geek Fortaleza. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};