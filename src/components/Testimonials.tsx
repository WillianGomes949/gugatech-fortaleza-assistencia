// components/Testimonials.tsx
import React from 'react';
// import { FaQuoteLeft } from 'react-icons/fa'; // Ícone de citação, se quiser

interface Testimonial {
  quote: string;
  author: string;
  // avatar?: string; // Opcional: para imagem do cliente
}

const testimonials: Testimonial[] = [
  {
    quote: "Serviço excelente! Meu notebook estava muito lento e a equipe da Geek Fortaleza deixou ele novo de novo. Recomendo muito!",
    author: "Maria S.",
  },
  {
    quote: "Atendimento rápido e eficiente. Resolveram meu problema de vírus em poucas horas e com um preço justo. Virei cliente!",
    author: "João P.",
  },
  {
    quote: "Profissionais super atenciosos e qualificados. Buscaram meu computador em casa e entregaram perfeitamente. Nota 10!",
    author: "Ana R.",
  },
  {
    quote: "Precisei de um conserto na placa mãe e o orçamento foi o melhor da cidade. Trabalho impecável e garantia real.",
    author: "Carlos L.",
  },
];

export default function Testimonials(){
  return (
    <section className="bg-linear-to-r from-orange-400 to-orange-600 py-16 md:py-24 text-white" id='testemunials'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            DEPOIMENTOS DE NOSSOS CLIENTES
          </h2>
          <p className="mt-4 text-lg text-white text-opacity-80">
            Veja o que nossos clientes satisfeitos têm a dizer sobre a Geek Fortaleza.
          </p>
        </div>

        {/* Grid de Depoimentos */}
        {/* A rolagem lateral e os botões de navegação seriam adicionados aqui para um carrossel real */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl relative text-gray-800"
            >
              {/* <FaQuoteLeft className="absolute top-4 left-4 text-orange-300 opacity-30 text-5xl" /> */}
              <p className="relative z-10 text-lg italic mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="relative z-10 font-semibold text-orange-600">
                - {testimonial.author}
              </p>
            </div>
          ))}
        </div>

        {/* Pontos de navegação para um carrossel real (apenas visual) */}
        {/* <div className="flex justify-center mt-12 space-x-2">
          <span className="block h-3 w-3 bg-white rounded-full opacity-60"></span>
          <span className="block h-3 w-3 bg-white rounded-full"></span>
          <span className="block h-3 w-3 bg-white rounded-full opacity-60"></span>
        </div> */}

      </div>
    </section>
  );
};