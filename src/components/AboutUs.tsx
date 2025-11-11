// components/AboutUs.tsx
import Image from 'next/image';

export default function AboutUs(){
  return (
    <section className="bg-white py-16 md:py-24" id='about'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Coluna da Promoção */}
          <div className="lg:col-span-1">
            <div className="bg-linear-to-br from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-xl text-center">
              <span className="inline-block bg-white text-orange-600 px-4 py-1 rounded-full text-sm font-semibold mb-3">
                Promoção!
              </span>
              <h3 className="text-5xl font-extrabold mb-2">R$70</h3>
              <p className="text-lg">Formatação Completa (Windows)</p>
              <button className="mt-6 px-6 py-2 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300">
                Aproveitar!
              </button>
            </div>
            {/* Poderia ter uma pequena imagem aqui se quiser, como no design original */}
            {/* <div className="mt-8 bg-gray-50 p-6 rounded-lg text-center shadow">
                <Image src="/images/geek-logo-small.svg" alt="Geek Fortaleza" width={120} height={50} className="mx-auto" />
                <p className="text-sm text-gray-500 mt-2">Sua assistência de confiança.</p>
            </div> */}
          </div>

          {/* Coluna do Conteúdo "Sobre Nós" */}
          <div className="lg:col-span-2 bg-gray-50 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              SOBRE NÓS
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Geek Fortaleza é especialista em soluções de TI para notebooks, PCs e iMacs/MacBooks.
              Atuamos na área de TI há mais de 10 anos, oferecendo serviços de qualidade e suporte técnico.
              Com profissionais altamente qualificados e equipamentos de última geração,
              garantimos um atendimento rápido e eficiente para todas as suas necessidades.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nosso objetivo é proporcionar a melhor experiência para você, com foco na transparência,
              confiança e satisfação do cliente. Seja para um conserto simples, uma formatação ou uma
              instalação de rede mais complexa, a Geek Fortaleza está pronta para ajudar.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Trabalhamos com agendamento, buscando o seu aparelho no conforto da sua casa ou empresa,
              e o devolvemos pronto e funcionando perfeitamente.
            </p>
            {/* Logo da empresa no rodapé do texto, como na imagem de referência */}
            <div className="mt-8 flex items-center justify-end">
              <Image
                src="/images/geek-fortaleza-logo.svg" // Substitua pelo seu logo
                alt="Geek Fortaleza"
                width={150} // Ajuste o tamanho conforme seu logo
                height={60}
                objectFit="contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};