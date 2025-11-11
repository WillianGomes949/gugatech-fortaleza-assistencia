// components/ContactForm.tsx
'use client'; 

import Image from 'next/image';

export default function ContactForm(){
  
  // Lógica para enviar o formulário (ex: para uma API route)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Adicione sua lógica de envio aqui
    // (ex: usando fetch para '/api/contact')
    alert('Formulário enviado! (lógica de envio a ser implementada)');
  };

  return (
    <section className="bg-gray-900 py-16 md:py-24" id='contact'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
        
        {/* Título */}
        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-12">
          ENTRE EM CONTATO CONOSCO E VAMOS COMEÇAR.
        </h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Seu nome"
              className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:ring-orange-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Seu e-mail"
              className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:ring-orange-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Mensagem</label>
            <textarea
              name="message"
              id="message"
              rows={5}
              required
              placeholder="Sua mensagem..."
              className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:ring-orange-500 transition-colors"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300"
            >
              ENVIAR MENSAGEM
            </button>
          </div>
        </form>

        {/* Logo abaixo do formulário */}
        <div className="mt-16">
          <Image
            src="/images/geek-fortaleza-logo-white.svg" // Substitua pelo seu logo claro
            alt="Geek Fortaleza Logo"
            width={180}
            height={70}
            objectFit="contain"
            className="mx-auto opacity-80"
          />
        </div>

      </div>
    </section>
  );
};