// components/AddBudgetItem.tsx
"use client";

import { useState } from "react";

// Definindo o tipo de dados que o formulário vai enviar
// Usamos Omit para remover o 'id', que será gerado no componente pai (o Modal)
type NewItemData = {
  name: string;
  quantity: number;
  notes: string;
};

// Props que o componente recebe: uma função para ser chamada no submit
interface AddBudgetItemProps {
  onAddItem: (data: NewItemData) => void;
}

export default function AddBudgetItem({ onAddItem }: AddBudgetItemProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Por favor, preencha o nome do item.");
      return;
    }

    // Chama a função passada pelo pai com os dados do formulário
    onAddItem({ name, quantity, notes });

    // Limpa o formulário
    setName("");
    setQuantity(1);
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="item-name"
          className="block text-sm font-medium text-gray-700"
        >
          Produto/Serviço
        </label>
        <input
          type="text"
          id="item-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Manutenção de notebook"
          className="text-gray-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="item-quantity"
          className="block text-sm font-medium text-gray-700"
        >
          Quantidade
        </label>
        <input
          type="number"
          id="item-quantity"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
          min="1"
          className="text-gray-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="item-notes"
          className="block text-sm font-medium text-gray-700"
        >
          Observações (Opcional)
        </label>
        <textarea
          id="item-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Ex: limpez, troca de componentes, etc."
          className="text-gray-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Adicionar Item
      </button>
    </form>
  );
}