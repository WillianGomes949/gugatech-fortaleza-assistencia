
// src/components/ui/DetailModal.tsx
'use client'
import { BudgetRequestPayload, ContactMessagePayload } from "@/app/admin/page";
import { useState, useEffect } from "react";
import {
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaSpinner,
  FaSave,
  FaTag,
  FaCalendarCheck
} from "react-icons/fa";
// 1. Importar os tipos reais do nosso AdminPage


// 2. Props atualizadas para nossos tipos e onSaveSuccess
type ModalData = BudgetRequestPayload | ContactMessagePayload;

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData;
  type: "budgetRequest" | "contactMessage"; // Mantemos isso para o seletor de status
  onSaveSuccess: (newStatus: string) => void;
}

export function DetailModal({
  isOpen,
  onClose,
  data,
  type,
  onSaveSuccess,
}: DetailModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(data.status);

  useEffect(() => {
    if (isOpen) {
      setCurrentStatus(data.status);
      setIsLoading(false);
    }
  }, [data, isOpen]);

  const handleSaveStatus = () => {
    setIsLoading(true);
    onSaveSuccess(currentStatus);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Não informado";
    return new Date(dateString).toLocaleString("pt-BR", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  const getTypeLabel = () =>
    type === "budgetRequest" ? "Orçamento" : "Mensagem";

  // ------------------- CORREÇÃO AQUI -------------------
  // Mapear dados para exibição usando 'data._type' para segurança de tipo
  
  let displayData: {
    _id: string;
    name: string;
    phone: string;
    email?: string;
    message?: string;
    createdAt?: string;
  };

  // Usamos 'data._type' (que vem do Sanity) para diferenciar
  if (data._type === 'budgetRequest') {
    displayData = {
      _id: data._id,
      name: data.customerName,
      phone: data.customerPhone,
      email: undefined, // Orçamentos não têm email
      message: data.additionalNotes,
      createdAt: data._createdAt, // createdAt não foi definido no tipo
    };
  } else { 
    // data._type deve ser 'contactMessage'
    displayData = {
      _id: data._id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
      createdAt: data._createdAt,
    };
  }
  // ----------------- FIM DA CORREÇÃO -----------------

  const statusOptions = {
    contactMessage: [
      { value: "pending", label: "Pendente" },
      { value: "read", label: "Lido" },
      { value: "answered", label: "Respondido" },
    ],
    budgetRequest: [
      { value: "pending", label: "Pendente" },
      { value: "answered", label: "Respondido" },
      { value: "completed", label: "Concluído" },
    ],
  };

  if (!isOpen) return null;

return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 bg-opacity-50 backdrop-blur-sm">
      
      {/* 1. MUDANÇA: Adicionado 'flex flex-col' e 'max-h-[90vh]' (ou 95vh) */}
      {/* Removemos o 'overflow-auto' daqui. */}
      <div className="bg-white shadow-2xl max-w-2xl w-full animate-in fade-in-90 zoom-in-90 flex flex-col max-h-[90vh] rounded-2xl">
        
        {/* Header */}
        {/* 2. MUDANÇA: Adicionado 'shrink-0' para não encolher */}
        <div className="bg-linear-to-r from-orange-600 to-amber-600 px-6 py-4 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Detalhes do {getTypeLabel()}</h2>
              <p className="text-orange-100 text-sm mt-1">ID: {displayData._id}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-orange-700 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        {/* 3. MUDANÇA: Removido 'max-h-[calc(...)]'. Deixamos só 'overflow-y-auto' */}
        {/* O Flexbox vai fazer ele ocupar o espaço que sobrar. */}
        <div className="p-6 overflow-y-auto">
          {/* Informações Pessoais */}
          <Section title="Informações do Cliente">
            <div className="space-y-4">
              <InfoItem
                icon={FaUser}
                label="Nome Completo"
                value={displayData.name}
              />
              <InfoItem
                icon={FaPhone}
                label="Telefone"
                value={displayData.phone}
              />
              {displayData.email && (
                <InfoItem
                  icon={FaEnvelope}
                  label="E-mail"
                  value={displayData.email}
                />
              )}
              {displayData.createdAt && (
                 <InfoItem
                  icon={FaCalendarCheck}
                  label="Recebido em"
                  value={formatDate(displayData.createdAt)}
                />
              )}
            </div>
          </Section>

          {/* Itens do Orçamento */}
          {data._type === "budgetRequest" && (
            <Section title="Itens do Orçamento">
              <ul className="space-y-3">
                {data.items.map((item) => (
                  <li
                    key={item._key}
                    className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <span className="shrink-0 bg-orange-100 text-orange-600 font-bold text-sm w-8 h-8 flex items-center justify-center rounded-full mt-1">
                      {item.quantity}x
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.notes || "Sem observações"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Detalhes da Mensagem */}
          {data._type === "contactMessage" && (
            <Section title="Detalhes da Mensagem">
              <InfoItem
                icon={FaTag}
                label="Tipo de Serviço"
                value={data.serviceType}
              />
            </Section>
          )}

          {/* Mensagem */}
          <Section title="Observações / Mensagem">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">
                {displayData.message || "Nenhuma mensagem."}
              </p>
            </div>
          </Section>
        </div>

        {/* Footer */}
        {/* 4. MUDANÇA: Adicionado 'shrink-0' para não encolher */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Seletor de Status */}
            <div className="w-full sm:w-auto">
              <label
                htmlFor="status-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Atualizar Status
              </label>
              <select
                id="status-select"
                value={currentStatus}
                onChange={(e) =>
                  setCurrentStatus(
                    e.target.value as BudgetRequestPayload["status"]
                  )
                }
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {statusOptions[type].map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleSaveStatus}
                disabled={isLoading || currentStatus === data.status}
                className="w-full sm:w-auto px-6 py-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaSave />
                )}
                {isLoading ? "Salvando..." : "Salvar Status"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Componentes Auxiliares (do seu arquivo original) ---
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label:string;
  value?: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mt-1">
        <Icon className="text-orange-600 text-base" />
      </div>
      <div className="flex-1 min-w-0">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <p className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2 text-sm border border-gray-200 wrap-break-word">
          {value || "Não informado"}
        </p>
      </div>
    </div>
  );
}