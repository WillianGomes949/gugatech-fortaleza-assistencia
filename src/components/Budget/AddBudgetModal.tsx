// components/AddBudgetModal.tsx
"use client";

import { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import AddBudgetList from "./AddBudgetList";
import AddBudgetItem from "./AddBudgetItem";

// Definição do tipo de item
export interface BudgetItem {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
}

// Props que o modal recebe
interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = "budgetItems"; // Chave para o localStorage

export default function AddBudgetModal({ isOpen, onClose }: AddBudgetModalProps) {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efeito para carregar os itens do localStorage quando o modal é montado
  useEffect(() => {
    const storedItems = localStorage.getItem(STORAGE_KEY);
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Função para salvar a lista no estado E no localStorage
  const updateItems = (newItems: BudgetItem[]) => {
    setItems(newItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  };

  // Função para ADICIONAR um item
  const handleAddItem = (newItemData: Omit<BudgetItem, "id">) => {
    const newItem: BudgetItem = {
      ...newItemData,
      id: Date.now().toString(), // ID simples
    };
    const updatedItems = [...items, newItem];
    updateItems(updatedItems);
  };

  // Função para REMOVER um item
  const handleRemoveItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    updateItems(updatedItems);
  };

  // *** PREPARADO PARA O BACKEND ***
  // Esta função será chamada ao enviar o orçamento
  const handleSubmitBudget = async () => {
    if (items.length === 0) {
      alert("Adicione pelo menos um item ao orçamento.");
      return;
    }
    
    setIsSubmitting(true);
    console.log("Enviando para o backend:", items);

    // TODO: Substitua esta simulação pela chamada à sua API
    try {
      // Exemplo de como seria com uma API
      // const response = await fetch('/api/budget', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(items),
      // });

      // if (!response.ok) {
      //   throw new Error('Falha ao enviar orçamento.');
      // }

      // Simulação de delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert("Orçamento enviado com sucesso! (Simulação)");
      
      // Limpa a lista e o localStorage após o envio
      updateItems([]);
      onClose(); // Fecha o modal

    } catch (error) {
      console.error(error);
      alert("Houve um erro ao enviar seu orçamento. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };


  // Se não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 bg-opacity-50 transition-opacity">
      {/* Painel do Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
        {/* Botão de Fechar (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-700"
        >
          <HiX className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Montar Orçamento
        </h2>

        <p className="text-gray-600 mb-6">
          Adicione os produtos ou serviços que você tem interesse para
          solicitar um orçamento.
        </p>

        {/* Seção do Formulário */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Adicionar Item</h3>
          <AddBudgetItem onAddItem={handleAddItem} />
        </div>

        {/* Seção da Lista */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Itens do Orçamento</h3>
          <AddBudgetList items={items} onRemoveItem={handleRemoveItem} />
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={handleSubmitBudget}
            disabled={isSubmitting || items.length === 0}
            className="w-full sm:w-auto px-5 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition-colors duration-200 disabled:bg-gray-400"
          >
            {isSubmitting ? "Enviando..." : "Enviar Orçamento"}
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-white text-gray-700 border border-gray-300 rounded-md font-semibold hover:bg-gray-50 transition-colors duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}