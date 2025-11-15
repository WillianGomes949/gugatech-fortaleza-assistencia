import Link from 'next/link';
import { FaRobot } from 'react-icons/fa'; // Ícone de robô para o tema tech
import { HiHome } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center">
      
      {/* Ícone ou Ilustração */}
      <div className="mb-6 animate-bounce-slow">
        <FaRobot className="h-32 w-32 text-orange-500 mx-auto" />
      </div>

      {/* Título de Erro */}
      <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 tracking-tighter mb-4">
        404
      </h1>

      {/* Subtítulo */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Sistema não encontrado!
      </h2>

      {/* Texto Descritivo */}
      <p className="text-gray-600 text-lg md:text-xl max-w-md mb-8">
        Ops! Parece que a página que você está procurando foi formatada, deletada ou nunca existiu.
      </p>

      {/* Botão de Ação */}
      <Link
        href="/"
        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-orange-500 hover:bg-orange-600 transition-transform transform hover:scale-105 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        <HiHome className="mr-2 h-5 w-5" />
        Voltar para o Início
      </Link>

      {/* Opcional: Link para contato caso seja um erro real */}
      <div className="mt-8">
        <p className="text-sm text-gray-500">
          Acha que isso é um erro?{' '}
          <Link href="/contato" className="text-orange-500 hover:underline font-semibold">
            Contate o suporte
          </Link>
        </p>
      </div>
    </div>
  );
}