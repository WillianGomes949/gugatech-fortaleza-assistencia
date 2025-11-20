// components/ContactForm.tsx
"use client";

import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { useState } from "react";
import { meusDados } from "@/data/db";

// Enum para os estados do formulário
enum FormStatus {
  Idle, // Ocioso
  Loading, // Carregando
  Success, // Sucesso
  Error, // Erro
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>(FormStatus.Idle);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(FormStatus.Loading); // Inicia o carregamento
    setErrorMessage("");

    // 1. Coletar os dados do formulário
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      serviceType: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    try {
      // 2. Enviar os dados para a nossa API Route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMsg = `Falha na API: ${response.statusText}`; // Mensagem padrão
        try {
          // Tenta ler o JSON. Se falhar, usa a mensagem padrão.
          const errorData = await response.json();
          if (errorData.error) {
            errorMsg = errorData.error;
          }
        } catch (jsonError) {
          // A resposta de erro não era JSON.
          console.warn("A resposta de erro da API não era JSON.");
        }
        throw new Error(errorMsg);
      }
      // 3. Sucesso!
      setStatus(FormStatus.Success);
      (e.target as HTMLFormElement).reset(); // Limpa o formulário
    } catch (error: unknown) {
      let errorMessage = "Ocorreu um problema desconhecido";

      // 2. Verifique o tipo
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      // 3. Use a mensagem segura
      console.error(errorMessage);
      setStatus(FormStatus.Error);
      setErrorMessage(errorMessage);
    }
  };

  // Mensagem de status a ser exibida
  const getStatusMessage = () => {
    switch (status) {
      case FormStatus.Success:
        return (
          <p className="text-green-400 text-center text-sm">
            Mensagem enviada com sucesso! Em breve entraremos em contato.
          </p>
        );
      case FormStatus.Error:
        return (
          <p className="text-red-400 text-center text-sm">
            Erro: {errorMessage}
          </p>
        );
      default:
        return (
          <p className="text-gray-400 text-center text-sm">
            * Respondemos em até 2 horas durante o horário comercial
          </p>
        );
    }
  };

  const isSubmitting = status === FormStatus.Loading;

  return (
    <section
      className="bg-linear-to-br from-gray-900 to-gray-800 py-20 md:py-28"
      id="contact"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ... (Header da Seção e Informações de Contato - sem mudanças) ... */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto items-center justify-between">
          {/* Informações de Contato (Sem mudanças) */}
          <div className="flex flex-col lg:col-span-1 w-full h-full justify-between">
            {/* Informações de Contato */}
            <div className="space-y-8 px-1">
              <div className="space-y-6">
                <div className="flex items-start gap-4 group cursor-pointer ">
                  <div className="bg-gray-800 p-3 rounded-xl hover:bg-will-primary/20 hover:scale-110 transition-all duration-300">
                    <FaWhatsapp className="text-gray-100 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-100 mb-1">
                      WhatsApp
                    </h4>
                    <a
                      href={`${meusDados.whatsappUrl}`}
                      className="text-gray-300 hover:text-orange-400 transition-colors block"
                    >
                      {meusDados.phoneNumber}
                    </a>
                    <span className="text-sm text-gray-500">
                      Resposta rápida
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer ">
                  <div className="bg-gray-800 p-3 rounded-xl hover:bg-will-primary/20 hover:scale-110 transition-all duration-300">
                    <FaEnvelope className="text-gray-100 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-100 mb-1">
                      Email
                    </h4>
                    <a
                      href={`mailto:${meusDados.email}`}
                      className="text-gray-300 hover:text-orange-400 transition-colors block"
                    >
                      {meusDados.email}
                    </a>
                    <span className="text-sm text-gray-500">
                      Resposta em 24h
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer ">
                  <div className="bg-gray-800 p-3 rounded-xl hover:bg-will-primary/20 hover:scale-110 transition-all duration-300">
                    <FaMapMarkerAlt className="text-gray-100 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-100 mb-1">
                      Localização
                    </h4>
                    <p className="text-gray-300">{meusDados.localizacao}</p>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="pt-6">
                <h4 className="text-lg font-semibold text-gray-100 mb-4">
                  Redes Sociais
                </h4>
                <div className="flex space-x-4">
                  <a
                    href={`${meusDados.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-xl hover:bg-will-primary/20 hover:scale-110 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-xl text-gray-300 hover:text-will-primary" />
                  </a>
                  <a
                    href={`${meusDados.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-xl hover:bg-will-primary/20 hover:scale-110 transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <FaGithub className="text-xl text-gray-300 hover:text-will-primary" />
                  </a>
                </div>
              </div>
            </div>
            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mt-8">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${meusDados.latitude}!2d${meusDados.longitude}!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2s${meusDados.endereço}!5e0!3m2!1spt-BR!2sbr`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
            </div>
          </div>
          {/* Formulário */}
          <div className="lg:col-span-1 w-full h-full">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inputs de Exemplo (mantenha os seus) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white font-medium mb-2"
                    >
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="Seu nome completo"
                      className="w-full p-4 rounded-xl bg-gray-700/50 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-400"
                      disabled={isSubmitting} // Desabilitar durante o envio
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white font-medium mb-2"
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="seu@email.com"
                      className="w-full p-4 rounded-xl bg-gray-700/50 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-400"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-white font-medium mb-2"
                  >
                    Telefone/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    placeholder="(85) 99999-9999"
                    className="w-full p-4 rounded-xl bg-gray-700/50 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-400"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-white font-medium mb-2"
                  >
                    Tipo de Serviço
                  </label>
                  <select
                    name="service"
                    id="service"
                    className="w-full p-4 rounded-xl bg-gray-700/50 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    disabled={isSubmitting}
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
                  <label
                    htmlFor="message"
                    className="block text-white font-medium mb-2"
                  >
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    required
                    placeholder="Descreva seu problema ou necessidade..."
                    className="w-full p-4 rounded-xl bg-gray-700/50 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-400 resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting} // Desabilitar botão durante o envio
                >
                  <span>
                    {isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAGEM"}
                  </span>
                  {!isSubmitting && (
                    <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </button>

                {/* Mensagem de Status Dinâmica */}
                {getStatusMessage()}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
