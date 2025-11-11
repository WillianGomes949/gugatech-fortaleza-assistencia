// components/RepairCategories.tsx
import Link from "next/link";
import Image from "next/image";

export default function RepairCategories() {
  return (
    <section
      className="relative bg-gray-900 py-20 md:py-32 overflow-hidden"
      id="rapair"
    >
      {/* Imagem de Fundo com Overlay */}
      <Image
        src="/images/001.png" // Substitua pelo caminho da sua imagem de fundo
        alt="Categorias de Reparo"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="absolute inset-0 opacity-40 z-0" // Ajuste a opacidade conforme sua imagem
      />
      <div className="absolute inset-0 bg-blue-900 opacity-60 z-0"></div>{" "}
      {/* Overlay azul */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Card Software */}
          <div className="bg-linear-to-br from-blue-600 to-blue-800 p-8 md:p-12 rounded-lg shadow-2xl flex flex-col justify-between items-center text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
              SOFTWARE <br /> REPARAR
            </h2>
            <p className="text-lg mb-8 max-w-md">
              Formatação, remoção de vírus, instalação de programas, otimização
              de sistema.
            </p>
            <Link
              href="/orcamento?category=software"
              className="px-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-300 transform hover:-translate-y-1"
            >
              ORÇAR
            </Link>
          </div>

          {/* Card Hardware */}
          <div className="bg-linear-to-br from-indigo-600 to-indigo-800 p-8 md:p-12 rounded-lg shadow-2xl flex flex-col justify-between items-center text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
              HARDWARE <br /> REPARAR
            </h2>
            <p className="text-lg mb-8 max-w-md">
              Troca de peças, conserto de placa-mãe, upgrade de componentes,
              reparos em geral.
            </p>
            <Link
              href="/orcamento?category=hardware"
              className="px-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-300 transform hover:-translate-y-1"
            >
              ORÇAR
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
