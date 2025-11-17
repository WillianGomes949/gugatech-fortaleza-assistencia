// components/ServicesOverview.tsx
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import {
  HiShieldCheck,
  HiDesktopComputer,
  HiChip,
  HiCube,
  HiWifi,
} from "react-icons/hi";
import { FaArrowRight, FaClock, FaShieldAlt } from "react-icons/fa";

interface Service {
  icon: IconType;
  title: string;
  description: string;
  href: string;
  img: string;
  features: string[];
  duration: string;
  price?: string;
}

const services: Service[] = [
  {
    icon: HiShieldCheck,
    title: "REMOÇÃO DE VÍRUS E MALWARE",
    description:
      "Seu computador está lento ou com anúncios? Realizamos uma varredura completa para remover vírus, spyware e malware, restaurando a velocidade e a segurança do seu sistema.",
    href: "/servicos/remocao-virus",
    img: "/images/servicos/virus.webp",
    features: [
      "Varredura Completa",
      "Remoção Total",
      "Prevenção Futura",
      "Otimização",
    ],
    duration: "1-2 horas",
    price: "",
  },
  {
    icon: HiDesktopComputer,
    title: "FORMATAÇÃO E INSTALAÇÃO",
    description:
      "Deixe seu equipamento como novo. Formatamos e reinstalamos o sistema (Windows, macOS ou Linux) com backup seguro dos seus arquivos e instalação de drivers e programas essenciais.",
    href: "/servicos/formatacao",
    img: "/images/servicos/formatacao.webp",
    features: [
      "Backup Seguro",
      "Instalação Completa",
      "Drivers Atualizados",
      "Programas Essenciais",
    ],
    duration: "2-3 horas",
    price: "",
  },
  {
    icon: HiWrenchScrewdriver,
    title: "MANUTENÇÃO PREVENTIVA",
    description:
      "Aumente a vida útil do seu PC ou notebook. Fazemos a limpeza interna completa, troca de pasta térmica e otimização de componentes para evitar superaquecimento e falhas.",
    href: "",
    img: "/images/servicos/process.webp",
    features: [
      "Limpeza Interna",
      "Troca Pasta Térmica",
      "Otimização",
      "Teste de Componentes",
    ],
    duration: "1-2 horas",
    price: "",
  },
  {
    icon: HiChip,
    title: "UPGRADE DE HARDWARE",
    description:
      "Seu computador precisa de mais fôlego? Instalamos mais memória RAM, SSDs de alta velocidade e placas de vídeo para garantir o máximo desempenho em jogos ou trabalho.",
    href: "",
    img: "/images/servicos/pc-gamer-1.webp",
    features: [
      "Mais Performance",
      "SSD High-Speed",
      "Mais Memória RAM",
      "Placa de Vídeo",
    ],
    duration: "1-3 horas",
    price: "",
  },
  {
    icon: HiCube,
    title: "MONTAGEM DE PC PERSONALIZADO",
    description:
      "Montamos o PC dos seus sonhos, seja para jogos (Gamer) ou trabalho (Workstation). Consultoria completa na escolha das peças, montagem profissional e gerenciamento de cabos.",
    href: "",
    img: "/images/servicos/pc-gamer-2.webp",
    features: [
      "Consultoria Especializada",
      "Peças de Qualidade",
      "Montagem Profissional",
      "Cable Management",
    ],
    duration: "4-6 horas",
    price: "",
  },
  {
    icon: HiWifi,
    title: "CONFIGURAÇÃO DE REDES E WI-FI",
    description:
      "Sinal de internet fraco ou caindo? Configuramos sua rede doméstica ou empresarial, instalamos repetidores e otimizamos seu roteador para uma conexão estável em todos os locais.",
    href: "",
    img: "/images/servicos/wifi.webp",
    features: [
      "Wi-Fi Estável",
      "Configuração Completa",
      "Repetidores",
      "Otimização de Sinal",
    ],
    duration: "1-2 horas",
    price: "",
  },
];

export default function ServicesOverview() {
  return (
    <section
      className="bg-linear-to-br from-gray-50 to-white py-20 md:py-28"
      id="services"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-orange-200">
            Nossos Serviços
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Assistência Técnica{" "}
            <span className="text-orange-600">Completa</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Serviços especializados com retirada e entrega grátis no local
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Imagem do Serviço */}
              <div className="relative overflow-hidden">
                <Image
                  src={service.img}
                  alt={service.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <FaClock className="text-xs" />
                  {service.duration}
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                  <service.icon className="text-orange-500 text-2xl" />
                </div>
              </div>

              {/* Conteúdo do Serviço */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Lista de Features */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rodapé do Card */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {/* Preço (Novo) */}
                  <div>
                    <span className="text-xl font-bold text-orange-600">
                      {service.price}
                    </span>
                  </div>

                  {/* Garantia / No Local (Opcional, pode manter se quiser) */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaShieldAlt className="text-orange-500" />
                      <span>Garantia</span>
                    </div>
                  </div>
                  {/* <Link
                    href={service.href}
                    className="group flex items-center gap-2 text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors"
                  >
                    Saiba mais
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Final */}
        <div className="text-center mt-12">
          <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg">
            <h3 className="text-2xl font-bold mb-4">
              Não encontrou o que precisa?
            </h3>
            <p className="text-orange-100 mb-6">
              Entre em contato e teremos prazer em ajudar com sua necessidade
              específica
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>FALAR COM ESPECIALISTA</span>
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
