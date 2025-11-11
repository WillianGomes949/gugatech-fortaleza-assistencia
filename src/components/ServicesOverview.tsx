// components/ServicesOverview.tsx

import Image from "next/image";
import { IconType } from "react-icons";
import { HiWrenchScrewdriver } from "react-icons/hi2";
// Adicione HiChip, HiCube e HiWifi
import {
  HiShieldCheck,
  HiDesktopComputer,
  HiChip,
  HiCube,
  HiWifi,
} from "react-icons/hi";

interface Service {
  icon: IconType;
  title: string;
  description: string;
  href: string;
  img: string;
}

const services: Service[] = [
  {
    icon: HiShieldCheck,
    title: "REMOÇÃO DE VÍRUS E MALWARE",
    description:
      "Seu computador está lento ou com anúncios? Realizamos uma varredura completa para remover vírus, spyware e malware, restaurando a velocidade e a segurança do seu sistema.",
    href: "",
    img: "/images/servicos/virus.webp",
  },
  {
    icon: HiDesktopComputer,
    title: "FORMATAÇÃO E INSTALAÇÃO",
    description:
      "Deixe seu equipamento como novo. Formatamos e reinstalamos o sistema (Windows, macOS ou Linux) com backup seguro dos seus arquivos e instalação de drivers e programas essenciais.",
    href: "",
    img: "/images/servicos/formatacao.webp",
  },
  {
    icon: HiWrenchScrewdriver,
    title: "MANUTENÇÃO PREVENTIVA",
    description:
      "Aumente a vida útil do seu PC ou notebook. Fazemos a limpeza interna completa, troca de pasta térmica e otimização de componentes para evitar superaquecimento e falhas.",
    href: "",
    img: "/images/servicos/process.webp",
  },
  {
    icon: HiChip,
    title: "UPGRADE DE HARDWARE",
    description:
      "Seu computador precisa de mais fôlego? Instalamos mais memória RAM, SSDs de alta velocidade e placas de vídeo para garantir o máximo desempenho em jogos ou trabalho.",
    href: "",
    img: "/images/servicos/pc-gamer-1.webp",
  },
  {
    icon: HiCube,
    title: "MONTAGEM DE PC PERSONALIZADO",
    description:
      "Montamos o PC dos seus sonhos, seja para jogos (Gamer) ou trabalho (Workstation). Consultoria completa na escolha das peças, montagem profissional e gerenciamento de cabos.",
    href: "",
    img: "/images/servicos/pc-gamer-2.webp",
  },
  {
    icon: HiWifi,
    title: "CONFIGURAÇÃO DE REDES E WI-FI",
    description:
      "Sinal de internet fraco ou caindo? Configuramos sua rede doméstica ou empresarial, instalamos repetidores e otimizamos seu roteador para uma conexão estável em todos os locais.",
    href: "",
    img: "/images/servicos/wifi.webp",
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-white py-16 md:py-24 h-auto" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            ASSISTÊNCIA TÉCNICA NO LOCAL / NÓS VAMOS ATÉ VOCÊ
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Conheça nossos principais serviços.
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-lg text-center transition-all duration-300 gap-5 hover:-translate-y-5 hover:scale-105"
            >
              <Image
                src={service.img}
                alt={service.title}
                width={500}
                height={500}
                objectFit="cover"
                className="h-auto w-full rounded-t-2xl"
              />
              <div className="absolute right-0 top-0 transition-all duration-300 ease-in-out">
<service.icon size={50} className="text-orange-500 mx-auto mb-4" />
              </div>
              

              <h3 className="text-xl font-semibold text-gray-900 mb-2 flex gap-4 justify-center items-center">
               {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
