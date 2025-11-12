// components/AddBudgetItem.tsx
"use client";

import { useState } from "react";
import { FaPlus, FaTools, FaLaptop, FaShieldAlt, FaWifi } from "react-icons/fa";

type NewItemData = {
  name: string;
  quantity: number;
  notes: string;
  category: string;
};

interface AddBudgetItemProps {
  onAddItem: (data: NewItemData) => void;
}

const serviceCategories = [
  { value: "formatacao", label: "Formatação", icon: FaLaptop },
  { value: "manutencao", label: "Manutenção", icon: FaTools },
  { value: "seguranca", label: "Segurança", icon: FaShieldAlt },
  { value: "rede", label: "Rede/Wi-Fi", icon: FaWifi },
  { value: "outro", label: "Outro", icon: FaPlus },
];

export default function AddBudgetItem({ onAddItem }: AddBudgetItemProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("outro");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Por favor, preencha o nome do serviço.");
      return;
    }

    onAddItem({ name, quantity, notes, category });
    setName("");
    setQuantity(1);
    setNotes("");
    setCategory("outro");
  };

  const popularServices = [
    "Formatação Windows + Backup",
    "Remoção de Vírus",
    "Limpeza Interna Completa",
    "Upgrade de Memória RAM",
    "Instalação de SSD",
    "Configuração de Rede Wi-Fi",
  ];

  return (
    <div className="space-y-6">
      {/* Serviços Populares */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Serviços Populares
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {popularServices.map((service, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setName(service)}
              className="text-left p-3 text-sm bg-gray-50 hover:bg-orange-50 border border-gray-200 rounded-lg transition-all duration-200 hover:border-orange-500 hover:scale-105 foucs:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Categoria */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Categoria do Serviço
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {serviceCategories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 ${
                    category === cat.value
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-gray-200 bg-white text-gray-600 hover:border-orange-300"
                  }`}
                >
                  <IconComponent className="text-lg" />
                  <span className="text-xs font-medium">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nome do Serviço */}
        <div>
          <label
            htmlFor="item-name"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Descrição do Serviço *
          </label>
          <input
            type="text"
            id="item-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Formatação completa com backup de arquivos"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700 placeholder-gray-400 transition-all duration-200"
            required
          />
        </div>

        {/* Quantidade e Observações em Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="item-quantity"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Quantidade
            </label>
            <div className="relative">
              <input
                type="number"
                id="item-quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value, 10)))
                }
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700 transition-all duration-200"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="item-notes"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Observações
            </label>
            <textarea
              id="item-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={1}
              placeholder="Detalhes adicionais..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700 placeholder-gray-400 resize-none transition-all duration-200"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-full md:w-auto bg-linear-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <FaPlus className="text-lg" />
            ADICIONAR SERVIÇO
          </button>
        </div>
      </form>
    </div>
  );
}
