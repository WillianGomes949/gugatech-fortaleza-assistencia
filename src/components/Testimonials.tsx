// components/Testimonials.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FaQuoteLeft, FaStar, FaUserCircle } from 'react-icons/fa';

interface Testimonial {
  quote: string;
  author: string;
  rating: number;
  service: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Serviço excelente! Meu notebook estava muito lento e a equipe da GugaTech deixou ele novo de novo. Atendimento rápido e preço justo. Recomendo muito!",
    author: "Maria Silva",
    rating: 5,
    service: "Formatação + Limpeza",
    avatar: ""
  },
  {
    quote: "Atendimento rápido e eficiente. Resolveram meu problema de vírus em poucas horas e com um preço justo. Buscaram e entregaram em casa. Virei cliente!",
    author: "João Pereira",
    rating: 5,
    service: "Remoção de Vírus",
    avatar: ""
  },
  {
    quote: "Profissionais super atenciosos e qualificados. Fiz upgrade no meu PC gamer e o resultado foi incrível. Montagem impecável e organização dos cabos perfeita!",
    author: "Ana Rodrigues",
    rating: 5,
    service: "Upgrade Gamer",
    avatar: ""
  },
  {
    quote: "Precisei de um conserto na placa mãe e o orçamento foi o melhor da cidade. Trabalho impecável, garantia real e ainda buscaram em casa. Nota 10!",
    author: "Carlos Lima",
    rating: 5,
    service: "Reparo de Hardware",
    avatar: ""
  },
  {
    quote: "Excelente suporte técnico! Configuraram minha rede Wi-Fi e agora tenho sinal em toda a casa. Profissionais muito educados e competentes.",
    author: "Fernanda Costa",
    rating: 5,
    service: "Configuração de Rede",
    avatar: ""
  },
  {
    quote: "Montaram um PC personalizado para meu escritório. A consultoria foi fundamental para escolher as peças certas. Entrega dentro do prazo e super organizados.",
    author: "Roberto Santos",
    rating: 5,
    service: "Montagem PC Workstation",
    avatar: ""
  }
];

export default function Testimonials(){
  return (
    <section className="relative bg-linear-to-br from-orange-500 to-orange-600 py-20 md:py-28 text-white overflow-hidden" id='testimonials'>
      
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/30">
            Depoimentos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            O Que Nossos <span className="text-gray-900">Clientes</span> Dizem
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Mais de 500 clientes satisfeitos confiam em nosso trabalho
          </p>
          
          {/* Rating Geral */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-300 text-xl" />
              ))}
            </div>
            <span className="text-white font-semibold">4.9/5.0</span>
          </div>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300 group"
            >
              {/* Citação */}
              <div className="relative mb-4">
                <FaQuoteLeft className="absolute -top-2 -left-2 text-white/20 text-4xl " />
                <p className="relative z-10 text-white/95 text-sm leading-relaxed italic pl-6 ml-5">
                  {testimonial.quote}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-300 text-sm" />
                ))}
              </div>

              {/* Informações do Autor */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                <div className="shrink-0">
                  {testimonial.avatar ? (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="text-white/70 text-2xl" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">
                    {testimonial.author}
                  </p>
                  <p className="text-white/70 text-xs truncate">
                    {testimonial.service}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para Experimentar Nossos Serviços?
            </h3>
            <p className="text-white/90 mb-6">
              Junte-se aos centenas de clientes satisfeitos e tenha a melhor experiência em assistência técnica
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                SOLICITAR ORÇAMENTO
              </Link>
              <Link href="/" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300">
                VER MAIS DEPOIMENTOS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};