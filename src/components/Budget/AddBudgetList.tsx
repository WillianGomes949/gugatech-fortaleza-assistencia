// components/AddBudgetList.tsx
"use client";

import { HiTrash } from "react-icons/hi";
import { BudgetItem } from "./AddBudgetModal";

// Importaremos a definição do tipo do Modal

interface AddBudgetListProps {
  items: BudgetItem[];
  onRemoveItem: (id: string) => void;
}

export default function AddBudgetList({ items, onRemoveItem }: AddBudgetListProps) {
  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 py-4">
        Nenhum item adicionado ao orçamento.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between py-3 px-1"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {item.name} (x{item.quantity})
            </p>
            {item.notes && (
              <p className="text-sm text-gray-500 truncate">{item.notes}</p>
            )}
          </div>
          <button
            onClick={() => onRemoveItem(item.id)}
            className="ml-4 p-1 text-gray-400 hover:text-red-600 focus:outline-none"
            title="Remover item"
          >
            <HiTrash className="h-5 w-5" />
          </button>
        </li>
      ))}
    </ul>
  );
}