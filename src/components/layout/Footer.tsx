// components/Footer.tsx
import Link from 'next/link';
import { 
  FaWhatsapp, 
  FaInstagram, 
  FaFacebook, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaTools,
  FaClock,
  FaArrowRight
} from 'react-icons/fa';

export default function Footer(){
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-linear-to-br from-gray-900 to-gray-800 text-gray-300 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Coluna 1: Logo e Sobre */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-3 group">
                <div className="bg-orange-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FaTools className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">GugaTech Fortaleza</h3>
                  <p className="text-sm text-gray-400 -mt-1">Tecnologia & Soluções</p>
                </div>
              </div>
            </Link>
            
            <p className="text-gray-400 leading-relaxed">
              Especialistas em soluções de TI há mais de 10 anos. Oferecemos serviços 
              de qualidade com garantia e suporte técnico especializado.
            </p>
            
            <div className="flex items-center gap-4">
              <Link 
                href="https://wa.me/558598228544" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <FaWhatsapp className="text-white text-xl" />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 p-3 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <FaInstagram className="text-white text-xl" />
              </Link>
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <FaFacebook className="text-white text-xl" />
              </Link>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="lg:col-span-1">
            <h5 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaArrowRight className="text-orange-500" />
              Links Rápidos
            </h5>
            <ul className="space-y-3">
              {[
                { name: "Sobre Nós", href: "#about" },
                { name: "Nossos Serviços", href: "#services" },
                { name: "Depoimentos", href: "#testimonials" },
                { name: "Contato", href: "#contact" },
                { name: "Orçamento", href: "#budget" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-all duration-200 group"
                  >
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Serviços */}
          <div className="lg:col-span-1">
            <h5 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaTools className="text-orange-500" />
              Nossos Serviços
            </h5>
            <ul className="space-y-3">
              {[
                "Formatação Completa",
                "Remoção de Vírus",
                "Manutenção Hardware",
                "Upgrade de PC",
                "Montagem Gamer",
                "Configuração de Rede"
              ].map((service) => (
                <li key={service}>
                  <Link 
                    href="#services" 
                    className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-all duration-200 group"
                  >
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div className="lg:col-span-1">
            <h5 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-500" />
              Contato & Localização
            </h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group hover:text-white transition-colors duration-200">
                <FaMapMarkerAlt className="h-5 w-5 mt-1 text-orange-400 shrink-0" />
                <span>Fortaleza, CE - Brasil<br />
                <span className="text-sm text-gray-500">Atendemos toda região</span></span>
              </li>
              <li className="flex items-center gap-3 group hover:text-white transition-colors duration-200">
                <FaPhone className="h-5 w-5 text-orange-400 shrink-0" />
                <a href="tel:+558598228544" className="hover:text-orange-400">(85) 9822-8544</a>
              </li>
              <li className="flex items-center gap-3 group hover:text-white transition-colors duration-200">
                <FaEnvelope className="h-5 w-5 text-orange-400 shrink-0" />
                <a href="mailto:contato@GugaTechfortaleza.com.br" className="hover:text-orange-400">
                  contato@GugaTechfortaleza.com.br
                </a>
              </li>
            </ul>

            {/* Horário de Funcionamento */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <h6 className="font-semibold text-white mb-2 flex items-center gap-2">
                <FaClock className="text-orange-400" />
                Horário de Atendimento
              </h6>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Seg - Sex:</span>
                  <span className="text-orange-400">8h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="text-orange-400">8h - 12h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © {currentYear} GugaTech Fortaleza. Todos os direitos reservados.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Desenvolvido com carinho para oferecer o melhor em tecnologia
              </p>
            </div>
            
            {/* <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/politica-privacidade" className="hover:text-orange-400 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos-uso" className="hover:text-orange-400 transition-colors">
                Termos de Uso
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};