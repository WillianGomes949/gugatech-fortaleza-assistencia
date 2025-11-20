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
  FaCalendarCheck,
  FaPen // Ícone de edição
} from "react-icons/fa";

// Tipos
export type ModalData = BudgetRequestPayload | ContactMessagePayload;

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData;
  type: "budgetRequest" | "contactMessage";
  onSaveSuccess: (newStatus: string) => void; // Salva apenas o Status
  // NOVA PROP: Função para salvar os dados editados (nome, telefone, etc)
  onUpdateData: (updatedData: ModalData) => Promise<void>; 
}

export function DetailModal({
  isOpen,
  onClose,
  data,
  type,
  onSaveSuccess,
  onUpdateData // Recebendo a nova função
}: DetailModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados de Controle
  const [currentStatus, setCurrentStatus] = useState(data.status);
  const [isEditing, setIsEditing] = useState(false); // Controle do modo edição
  const [formData, setFormData] = useState<ModalData>(data); // Dados do formulário

  // 1. CORREÇÃO DO USEEFFECT (Evita o loop infinito)
  useEffect(() => {
    if (isOpen) {
      setCurrentStatus(data.status);
      setFormData(data); // Sincroniza o form com os dados originais ao abrir
      setIsEditing(false); // Sempre começa em modo leitura
      setIsLoading(false);
    }
    // Removemos 'data' das dependências e usamos apenas IDs ou isOpen
  }, [isOpen, data._id, data.status]);

  // --- HANDLERS ---

  // Salvar apenas o Status (Fluxo antigo)
  const handleSaveStatus = async () => {
    setIsLoading(true);
    try {
      await onSaveSuccess(currentStatus);
    } finally {
      setIsLoading(false);
    }
  };

  // Salvar Edição de Dados (Novo Fluxo)
  const handleSaveEdit = async () => {
    setIsLoading(true);
    try {
      // Chama a função do pai para atualizar no Sanity
      await onUpdateData(formData); 
      setIsEditing(false); // Sai do modo edição
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
      alert("Erro ao salvar alterações.");
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar campos do formulário
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const statusOptions = {
    contactMessage: [
      { value: "pendente", label: "Pendente" },
      { value: "lido", label: "Lido" },
      { value: "respondido", label: "Respondido" },
    ],
    budgetRequest: [
      { value: "pendente", label: "Pendente" },
      { value: "respondido", label: "Respondido" },
      { value: "concluído", label: "Concluído" },
    ],
  };

  if (!isOpen) return null;

  // Helper para saber qual nome/telefone exibir (lógica unificada)
  const isBudget = formData._type === 'budgetRequest';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white shadow-2xl max-w-2xl w-full animate-in fade-in-90 zoom-in-90 flex flex-col max-h-[90vh] rounded-2xl">
        
        {/* Header */}
        <div className="rounded-t-2xl bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-4 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Detalhes do {getTypeLabel()}</h2>
              <p className="text-orange-100 text-sm mt-1">ID: {formData._id}</p>
            </div>
            
            <div className="flex gap-2">
              {/* Botão de Editar (Alterna modo) */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white"
                  title="Editar informações"
                >
                  <FaPen size={16} />
                </button>
              )}

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
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          
          {/* Aviso de Modo Edição */}
          {isEditing && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm">
              Você está editando as informações deste registro.
            </div>
          )}

          {/* Informações Pessoais */}
          <Section title="Informações do Cliente">
            <div className="space-y-4">
              
              {/* Campo: Nome */}
              <EditableInfoItem 
                icon={FaUser} 
                label="Nome Completo" 
                value={isBudget ? (formData as BudgetRequestPayload).customerName : (formData as ContactMessagePayload).name}
                isEditing={isEditing}
                onChange={(val) => handleChange(isBudget ? 'customerName' : 'name', val)}
              />

              {/* Campo: Telefone */}
              <EditableInfoItem 
                icon={FaPhone} 
                label="Telefone" 
                value={isBudget ? (formData as BudgetRequestPayload).customerPhone : (formData as ContactMessagePayload).phone}
                isEditing={isEditing}
                onChange={(val) => handleChange(isBudget ? 'customerPhone' : 'phone', val)}
              />

              {/* Campo: Email (Só existe em ContactMessage) */}
              {!isBudget && (
                <EditableInfoItem 
                  icon={FaEnvelope} 
                  label="E-mail" 
                  value={(formData as ContactMessagePayload).email || ''}
                  isEditing={isEditing}
                  onChange={(val) => handleChange('email', val)}
                />
              )}

              {/* Data (Apenas Leitura) */}
              <InfoItem
                icon={FaCalendarCheck}
                label="Recebido em"
                value={formatDate(formData._createdAt)}
              />
            </div>
          </Section>

          {/* Itens do Orçamento (Apenas Leitura por enquanto - complexo de editar) */}
          {isBudget && (
            <Section title="Itens do Orçamento">
              <ul className="space-y-3">
                {(formData as BudgetRequestPayload).items.map((item) => (
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

          {/* Mensagem / Observações */}
          <Section title={isBudget ? "Observações Adicionais" : "Mensagem"}>
             {isEditing ? (
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none min-h-[100px]"
                  value={isBudget ? (formData as BudgetRequestPayload).additionalNotes : (formData as ContactMessagePayload).message}
                  onChange={(e) => handleChange(isBudget ? 'additionalNotes' : 'message', e.target.value)}
                />
             ) : (
               <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {(isBudget ? (formData as BudgetRequestPayload).additionalNotes : (formData as ContactMessagePayload).message) || "Nenhuma mensagem."}
                </p>
              </div>
             )}
          </Section>
        </div>

        {/* Footer */}
        <div className="rounded-b-2xl border-t border-gray-200 px-6 py-4 bg-gray-50 shrink-0">
          
          {/* MODO EDIÇÃO: Botões Salvar/Cancelar */}
          {isEditing ? (
             <div className="flex justify-end gap-3">
               <button
                 onClick={() => {
                   setFormData(data); // Reverte mudanças
                   setIsEditing(false); // Sai do modo edição
                 }}
                 className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                 disabled={isLoading}
               >
                 Cancelar
               </button>
               <button
                 onClick={handleSaveEdit}
                 disabled={isLoading}
                 className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
               >
                 {isLoading ? <FaSpinner className="animate-spin"/> : <FaSave />}
                 Salvar Alterações
               </button>
             </div>
          ) : (
            /* MODO PADRÃO: Alterar Status */
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="w-full sm:w-auto">
                <label htmlFor="status-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Atualizar Status
                </label>
                <select
                  id="status-select"
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value as any)}
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

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveStatus}
                  disabled={isLoading || currentStatus === data.status}
                  className="w-full sm:w-auto px-6 py-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                  {isLoading ? "Salvando..." : "Salvar Status"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Componentes Auxiliares ---

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// Novo componente que suporta edição
function EditableInfoItem({
  icon: Icon,
  label,
  value,
  isEditing,
  onChange
}: {
  icon: any;
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (val: string) => void;
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
        {isEditing ? (
          <input 
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        ) : (
          <p className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2 text-sm border border-gray-200 break-words">
            {value || "Não informado"}
          </p>
        )}
      </div>
    </div>
  );
}

// Componente antigo (apenas leitura) para datas ou campos fixos
function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mt-1">
        <Icon className="text-orange-600 text-base" />
      </div>
      <div className="flex-1 min-w-0">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <p className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2 text-sm border border-gray-200 break-words">
          {value || "Não informado"}
        </p>
      </div>
    </div>
  );
}