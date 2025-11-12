// components/RepairCategories.tsx
import { FaTools, FaCog,  FaCheckCircle } from "react-icons/fa";

export default function RepairCategories() {
  const categories = [
    {
      title: "SOFTWARE",
      subtitle: "REPARAR",
      description: "Formatação, remoção de vírus, instalação de programas, otimização de sistema.",
      features: [
        "Formatação Windows/Mac",
        "Remoção de Vírus",
        "Backup de Arquivos",
        "Otimização de Sistema",
        "Instalação de Programas",
        "Atualização de Drivers"
      ],
      gradient: "from-blue-600 to-blue-800",
      icon: FaCog,
      href: "/orcamento?category=software"
    },
    {
      title: "HARDWARE",
      subtitle: "REPARAR",
      description: "Troca de peças, conserto de placa-mãe, upgrade de componentes, reparos em geral.",
      features: [
        "Troca de Peças",
        "Limpeza Interna",
        "Upgrade de Componentes",
        "Reparo de Placas",
        "Troca de Tela",
        "Manutenção Preventiva"
      ],
      gradient: "from-indigo-600 to-indigo-800",
      icon: FaTools,
      href: "/orcamento?category=hardware"
    }
  ];

  return (
    <section className="relative bg-gray-900 py-20 md:py-32 overflow-hidden" id="repair">
      {/* Background com Pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-900/80 to-indigo-900/80 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center, var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent z-0"></div>
      
      {/* Elementos Decorativos */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-orange-500/30">
            Especialidades
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Serviços de <span className="text-orange-400">Reparo</span> Completo
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Oferecemos soluções completas em software e hardware para seu equipamento
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.title}
              className={`bg-linear-to-br ${category.gradient} p-8 rounded-2xl shadow-2xl border border-white/10 transform hover:scale-105 transition-all duration-500 group`}
            >
              {/* Header do Card */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                    <category.icon className="text-white text-3xl" />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">
                  {category.title}
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-orange-300 mb-4">
                  {category.subtitle}
                </h3>
                <p className="text-lg text-white/90 max-w-md mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Lista de Serviços */}
              <div className="mb-8">
                <div className="grid grid-cols-1 gap-3">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-300 shrink-0" />
                      <span className="text-white/90 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão CTA */}
              {/* <Link
                href={category.href}
                className="group w-full px-8 py-4 bg-white text-gray-900 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
              >
                <span>SOLICITAR ORÇAMENTO</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link> */}
            </div>
          ))}
        </div>

        {/* Footer da Seção */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            ⚡ Atendimento rápido | 🔧 Profissionais qualificados | 🛡️ Garantia no serviço
          </p>
        </div>
      </div>
    </section>
  );
}