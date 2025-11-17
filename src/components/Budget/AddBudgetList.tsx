// components/AddBudgetList.tsx
"use client";

import { HiTrash, HiPencil } from "react-icons/hi";
import { FaLaptop, FaTools, FaShieldAlt, FaWifi, FaPlus } from "react-icons/fa";
import { BudgetItem } from "./../../app/budget/page";

interface AddBudgetListProps {
  items: BudgetItem[];
  onRemoveItem: (id: string) => void;
  onEditItem?: (id: string) => void;
}

const categoryIcons: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  formatacao: FaLaptop,
  manutencao: FaTools,
  seguranca: FaShieldAlt,
  rede: FaWifi,
  outro: FaPlus,
};

export default function AddBudgetList({
  items,
  onRemoveItem,
  onEditItem,
}: AddBudgetListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <FaLaptop className="mx-auto text-4xl text-gray-400 mb-3" />
        <p className="text-gray-500 font-medium">Nenhum serviço adicionado</p>
        <p className="text-sm text-gray-400 mt-1">
          Adicione serviços para criar seu orçamento
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-gray-900">
          Serviços Solicitados ({items.length})
        </h4>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {items.reduce((total, item) => total + item.quantity, 0)} itens
        </span>
      </div>

      <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
        {items.map((item) => {
          const CategoryIcon = categoryIcons[item.category] || FaPlus;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-orange-100 p-2 rounded-lg mt-1">
                    <CategoryIcon className="text-orange-600 text-lg" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-2 mb-1 flex-wrap">
                      <h5 className="font-semibold text-gray-900 text-sm truncate wrap-anywhere" >
                        {item.name}
                      </h5>
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                        x{item.quantity}
                      </span>
                    </div>
                    {item.notes && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-4 mt-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {item.category === "formatacao" && "Formatação"}
                        {item.category === "manutencao" && "Manutenção"}
                        {item.category === "seguranca" && "Segurança"}
                        {item.category === "rede" && "Rede/Wi-Fi"}
                        {item.category === "outro" && "Outro"}
                      </span>
                      <div className="flex items-center gap-1 ml-3 transition-opacity duration-200">
                  {onEditItem && (
                    <button
                      onClick={() => onEditItem(item.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar item"
                    >
                      <HiPencil className="h-4 w-4" />
                    </button>
                  )}

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remover item"
                  >
                    <HiTrash className="h-4 w-4" />
                  </button>
                </div>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo */}
      <div className="bg-linear-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">
            Total de serviços:
          </span>
          <span className="text-lg font-bold text-orange-600">
            {items.length}
          </span>
        </div>
      </div>
    </div>
  );
}
