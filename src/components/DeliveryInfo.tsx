// components/DeliveryInfo.tsx
import React from 'react';
import Image from 'next/image';

export default function DeliveryInfo(){
  return (
    <section className="bg-gray-50 py-16" id='delivery'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            
            {/* Coluna da Imagem */}
            <div className="relative w-full h-64 md:h-80">
              {/* IMPORTANTE: 
                1. Substitua '/images/delivery-illustration.svg' pelo caminho da sua imagem.
                2. Salve sua imagem na pasta 'public/images/'.
              */}
              <Image
                src="/images/002.png"
                alt="Retirada e Entrega Grátis"
                layout="fill"
                objectFit="contain" // ou "cover" dependendo da sua imagem
                className="p-4" // Adiciona um padding para a imagem não colar nas bordas
              />
            </div>

            {/* Coluna de Texto */}
            <div className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                RETIRADA E ENTREGA GRÁTIS DO SEU EQUIPAMENTO
              </h2>
              <p className="mt-4 text-gray-600 text-base md:text-lg">
                Pensando na sua comodidade, buscamos e entregamos seu equipamento
                em sua residência ou empresa sem custo adicional. 
                (Consulte bairros participantes).
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};