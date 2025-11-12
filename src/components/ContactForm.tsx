// components/ContactForm.tsx
"use client";

import Image from "next/image";
import { FaPaperPlane, FaWhatsapp, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Adicione sua lógica de envio aqui
    alert("Formulário enviado! Em breve entraremos em contato.");
  };

  return (
    <section className="bg-linear-to-br from-gray-900 to-gray-800 py-20 md:py-28" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-orange-500/30">
            Fale Conosco
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pronto para <span className="text-orange-500">Resolver</span> seu Problema?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Entre em contato e receba um atendimento personalizado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          
          {/* Informações de Contato */}
          <div className="lg:col-span-1 w-full h-full">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaMapMarkerAlt className="text-orange-500" />
                Nossos Contatos
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors">
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <FaWhatsapp className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">WhatsApp</p>
                    <p className="text-white font-semibold">(85) 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors">
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Telefone</p>
                    <p className="text-white font-semibold">(85) 3333-3333</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors">
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Localização</p>
                    <p className="text-white font-semibold">Fortaleza - CE</p>
                  </div>
                </div>
              </div>

              {/* Logo */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="flex justify-center">
                  <Image
                    src="/images/guga-logo.png"
                    alt="GugaTech Fortaleza"
                    width={120}
                    height={50}
                    className="invert opacity-90"
                  />
                </div>
                <p className="text-gray-400 text-center mt-3 text-sm">
                  Sua assistência técnica de confiança
                </p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-2 w-full h-full">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="Seu nome completo"
                      className="w-full p-4 rounded-xl bg-gray-700/50 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="seu@email.com"
                      className="w-full p-4 rounded-xl bg-gray-700/50 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-medium mb-2">
                    Telefone/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    placeholder="(85) 99999-9999"
                    className="w-full p-4 rounded-xl bg-gray-700/50 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-white font-medium mb-2">
                    Tipo de Serviço
                  </label>
                  <select
                    name="service"
                    id="service"
                    className="w-full p-4 rounded-xl bg-gray-700/50 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                  >
                    <option value="">Selecione o serviço desejado</option>
                    <option value="formatacao">Formatação</option>
                    <option value="manutencao">Manutenção</option>
                    <option value="limpeza">Limpeza Interna</option>
                    <option value="upgrade">Upgrade</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    required
                    placeholder="Descreva seu problema ou necessidade..."
                    className="w-full p-4 rounded-xl bg-gray-700/50 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
                >
                  <span>ENVIAR MENSAGEM</span>
                  <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <p className="text-gray-400 text-center text-sm">
                  * Respondemos em até 2 horas durante o horário comercial
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}