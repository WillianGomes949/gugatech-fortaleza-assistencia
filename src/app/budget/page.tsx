// components/AddBudgetModal.tsx
"use client";

import AddBudgetItem from "@/components/Budget/AddBudgetItem";
import AddBudgetList from "@/components/Budget/AddBudgetList";
import { useState, useEffect } from "react";
import { HiArrowRight, HiClipboardList } from "react-icons/hi";

export interface BudgetItem {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  category: string;
}

const STORAGE_KEY = "budgetItems";

export default function AddBudget() {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
 
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    const storedItems = localStorage.getItem(STORAGE_KEY);
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const updateItems = (newItems: BudgetItem[]) => {
    setItems(newItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  };

  const handleAddItem = (newItemData: Omit<BudgetItem, "id">) => {
    const newItem: BudgetItem = {
      ...newItemData,
      id: Date.now().toString(),
    };
    const updatedItems = [...items, newItem];
    updateItems(updatedItems);
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    updateItems(updatedItems);
  };

  const handleSubmitBudget = async () => {
    if (items.length === 0) {
      alert("Adicione pelo menos um serviço ao orçamento.");
      return;
    }
    if (!customerName || !customerPhone) {
      alert("Por favor, preencha seu Nome e Telefone.");
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. ENVIAR PARA O SANITY (via API Route)
      const response = await fetch("/api/submit-budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          customerPhone,
          additionalNotes,
          items,
        }),
      });

      if (!response.ok) {
        // Se a API falhar, não continua
        throw new Error("Falha ao salvar o orçamento.");
      }

      // 2. SE SUCESSO, ENVIAR PARA O WHATSAPP
      const message = `Olá! Gostaria de solicitar um orçamento para os seguintes serviços:\n\n${items
        .map(
          (item) =>
            `• ${item.name} (x${item.quantity})${
              item.notes ? ` - ${item.notes}` : ""
            }`
        )
        .join(
          "\n"
        )}\n\n*Meus Dados:*\nNome: ${customerName}\nTelefone: ${customerPhone}${
        additionalNotes ? `\nObs: ${additionalNotes}` : ""
      }\n\nTotal: ${items.length} serviço(s)`;

      const whatsappUrl = `https://wa.me/558598228544?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");

      // 3. LIMPAR TUDO
      updateItems([]);
      setCustomerName("");
      setCustomerPhone("");
      setAdditionalNotes("");
      setCurrentStep(1);
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao enviar seu orçamento. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
      // Envio para WhatsApp
      const message = `Olá! Gostaria de solicitar um orçamento para os seguintes serviços:\n\n${items
        .map(
          (item) =>
            `• ${item.name} (x${item.quantity})${
              item.notes ? ` - ${item.notes}` : ""
            }`
        )
        .join("\n")}\n\nTotal: ${items.length} serviço(s)`;

      const whatsappUrl = `https://wa.me/558598228544?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl p-2 py-24 md:max-w-5/6 mx-auto">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white p-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <HiClipboardList className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Solicitar Orçamento</h2>
              <p className="text-orange-100">
                Descreva os serviços que você precisa
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mt-6">
          {[1, 2].map((step) => (
            <div key={step} className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step
                    ? "bg-white text-orange-600 border-white"
                    : "bg-transparent border-white/50 text-white"
                } font-semibold text-sm transition-all duration-300`}
              >
                {step}
              </div>
              {step < 2 && (
                <div
                  className={`w-12 h-0.5 ${
                    currentStep > step ? "bg-white" : "bg-white/30"
                  } transition-all duration-300`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}

      {currentStep === 1 && (
        <div className="space-y-6 p-2 md:p-8">
          <AddBudgetItem onAddItem={handleAddItem} />

          {items.length > 0 && (
            <div className="border-t border-orange-500 pt-6">
              <AddBudgetList items={items} onRemoveItem={handleRemoveItem} />
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full md:w-auto mt-6 bg-linear-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
                >
                  <span>CONTINUAR PARA DADOS</span>
                  <HiArrowRight className="text-xl" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6 p-2 md:p-8 ">
          <AddBudgetList items={items} onRemoveItem={handleRemoveItem} />

          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Informações de Contato
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  // CONECTAR ESTADO
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone/WhatsApp *
                </label>
                <input
                  type="tel"
                  placeholder="(85) 99999-9999"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  // CONECTAR ESTADO
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações Adicionais
              </label>
              <textarea
                rows={3}
                placeholder="Alguma informação adicional que devemos saber..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                // CONECTAR ESTADO
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-3 justify-end items-end px-8">
        {currentStep === 2 && (
          <button
            onClick={() => setCurrentStep(1)}
            className="w-full md:w-auto px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            Voltar
          </button>
        )}

        <button
          onClick={
            currentStep === 1 ? () => setCurrentStep(2) : handleSubmitBudget
          }
          disabled={isSubmitting || items.length === 0}
          className={`w-full md:w-auto px-8 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${currentStep === 1 ? "hidden" : ""}`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Enviando...
            </>
          ) : currentStep === 2 ? (
            <>
            <HiClipboardList />
              Enviar para WhatsApp
            </>
          ) : (
            <>
             
            </>
          )}
        </button>
      </div>
    </div>
  );
}
