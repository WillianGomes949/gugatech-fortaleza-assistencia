"use client";
// src/pages/AdminPage.tsx
import { useEffect, useState, useCallback } from "react";
import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";

import {
  FaCheck,
  FaEye,
  FaSpinner,
  FaTimes,
  FaTrash,
  FaEnvelope,
  FaChartBar,
  FaSearch,
  FaFilter,
  FaListAlt, // Novo ícone
} from "react-icons/fa";
import { DetailModal } from "@/components/ui/DetailModal";

// --- NOSSOS TIPOS REAIS DO SANITY ---
interface BasePayload {
  _id: string;
  _type: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  status: "pending" | "read" | "answered" | "completed";
  _createdAt?: string;
}

export interface BudgetRequestPayload extends BasePayload {
  _type: "budgetRequest";
  customerName: string;
  customerPhone: string;
  additionalNotes: string;
  items: { _key: string; name: string; quantity: number; notes?: string }[];
}

export interface ContactMessagePayload extends BasePayload {
  _type: "contactMessage";
  email: string;
  message: string;
  serviceType: string;
}

// Tipos da UI (o que o componente espera)
interface AdminDataItem {
  id: string;
  type: "budget" | "contact";
  name: string;
  phone: string;
  email: string;
  status: string;
  itemCount?: number;
  serviceType?: string;
  rawData: BudgetRequestPayload | ContactMessagePayload;
}

type AdminData = {
  budgets: AdminDataItem[];
  submissions: AdminDataItem[];
};

type LoadingStates = {
  budgets: boolean;
  submissions: boolean;
  actions: boolean;
};

// Componente de Card de Estatística (igual ao seu)
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: number; // Mantido do seu original
}

// ### COMPONENTE QUE FALTAVA ###
function StatCard({ title, value, icon, color, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend !== undefined && (
            <div
              className={`flex items-center mt-1 text-sm ${trend >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              <span>{trend >= 0 ? "↗" : "↘"}</span>
              <span className="ml-1">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      </div>
    </div>
  );
}
// ### FIM DO COMPONENTE QUE FALTAVA ###

// Componente de Tabela (MODIFICADO para nossos dados)
interface AdminTableProps {
  data: AdminDataItem[];
  type: "budgets" | "submissions";
  onViewDetails: (item: AdminDataItem) => void;
  onDelete: (item: AdminDataItem) => void;
  actionLoading: string | null;
}

function AdminTable({
  data,
  type,
  onViewDetails,
  onDelete,
  actionLoading,
}: AdminTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.email &&
        item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.phone.includes(searchTerm)
  );

  if (data.length === 0) {
    return (
      <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaEnvelope className="text-gray-400 text-xl" />
        </div>
        <p className="text-gray-500 text-lg">Nenhuma solicitação encontrada</p>
        <p className="text-gray-400 text-sm mt-1">
          Quando houver novas solicitações, elas aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header da Tabela com Busca */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredData.length} de {data.length} itens
            </span>
          </div>
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">
                Cliente
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">
                Contato
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">
                {type === "budgets" ? "Nº de Itens" : "Serviço"}
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">
                Status
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors group"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-500 text-sm">
                        ID: {item.id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-gray-900 font-medium">{item.phone}</div>
                  <div className="text-gray-500 text-sm">{item.email}</div>
                </td>

                <td className="py-4 px-6">
                  {type === "budgets" ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                      {item.itemCount} {item.itemCount === 1 ? "item" : "itens"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.serviceType || "Não especificado"}
                    </span>
                  )}
                </td>

                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize
                    ${
                      item.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "read"
                          ? "bg-gray-100 text-gray-800" // Adicionado 'read'
                          : item.status === "answered"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2
                      ${
                        item.status === "pending"
                          ? "bg-yellow-500"
                          : item.status === "read"
                            ? "bg-gray-500" // Adicionado 'read'
                            : item.status === "answered"
                              ? "bg-blue-500"
                              : item.status === "completed"
                                ? "bg-green-500"
                                : "bg-gray-500"
                      }`}
                    ></div>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 border border-blue-200"
                      title="Ver detalhes"
                      onClick={() => onViewDetails(item)}
                      disabled={!!actionLoading}
                    >
                      {actionLoading === item.id ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 border border-red-200"
                      title="Excluir"
                      onClick={() => onDelete(item)}
                      disabled={!!actionLoading}
                    >
                      {actionLoading === item.id ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente de Mensagem de Ação (igual ao seu)
interface ActionMessageProps {
  message: { type: "success" | "error"; text: string } | null;
}

function ActionMessage({ message }: ActionMessageProps) {
  if (!message) return null;

  return (
    <div
      className={`p-4 rounded-xl border ${
        message.type === "success"
          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      <div className="flex items-center gap-3">
        {message.type === "success" ? (
          <FaCheck className="text-emerald-600 shrink-0" />
        ) : (
          <FaTimes className="text-red-600 shrink-0" />
        )}
        <span className="font-medium">{message.text}</span>
      </div>
    </div>
  );
}

// FUNÇÃO DE ADAPTAÇÃO: Converte dados do Sanity para a UI
const mapSanityDataToUI = (
  sanityItems: (BudgetRequestPayload | ContactMessagePayload)[]
): AdminDataItem[] => {
  return sanityItems.map((item) => {
    if (item._type === "budgetRequest") {
      return {
        id: item._id,
        type: "budget",
        name: item.customerName,
        phone: item.customerPhone,
        email: "N/A", // Budget request não pede email
        status: item.status,
        itemCount: item.items?.length || 0,
        rawData: item,
      };
    }
    // else it's 'contactMessage'
    return {
      id: item._id,
      type: "contact",
      name: item.name,
      phone: item.phone,
      email: item.email,
      status: item.status,
      serviceType: item.serviceType,
      rawData: item,
    };
  });
};

export default function AdminPage() {
  const [data, setData] = useState<AdminData>({ budgets: [], submissions: [] });
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    budgets: true,
    submissions: true,
    actions: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"budgets" | "submissions">(
    "budgets"
  );
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminDataItem | null>(null);

  // FETCHDATA MODIFICADO
  const fetchData = useCallback(async () => {
    setLoadingStates((prev) => ({
      ...prev,
      budgets: true,
      submissions: true,
    }));
    setError(null);

    try {
      const budgetQuery = groq`*[_type == "budgetRequest"] | order(_createdAt desc)`;
      const contactQuery = groq`*[_type == "contactMessage"] | order(_createdAt desc)`;

      const [budgetResponse, submissionsResponse] = await Promise.all([
        sanityClient.fetch<BudgetRequestPayload[]>(budgetQuery),
        sanityClient.fetch<ContactMessagePayload[]>(contactQuery),
      ]);

      setData({
        budgets: mapSanityDataToUI(budgetResponse),
        submissions: mapSanityDataToUI(submissionsResponse),
      });
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Erro de conexão. Verifique sua internet.");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        budgets: false,
        submissions: false,
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Cleanup de timeouts (igual ao seu)
  useEffect(() => {
    if (actionMessage) {
      const timer = setTimeout(() => setActionMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [actionMessage]);

  // Abrir o modal (MODIFICADO)
  const handleViewDetails = async (item: AdminDataItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);

    // Otimização: Marcar como 'lido' se estiver 'pendente'
    if (item.status === "pending") {
      try {
        await fetch("/api/admin/update-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: item.id, status: "read" }), // Marcar como 'lido'
        });
        // Atualiza a UI localmente para resposta imediata
        const updateData = (prevData: AdminDataItem[]) =>
          prevData.map((d) =>
            d.id === item.id ? { ...d, status: "read" } : d
          );

        if (item.type === "budget") {
          setData((prev) => ({ ...prev, budgets: updateData(prev.budgets) }));
        } else {
          setData((prev) => ({
            ...prev,
            submissions: updateData(prev.submissions),
          }));
        }
      } catch (err) {
        console.error("Falha ao marcar como 'lido'", err);
      }
    }
  };

  // Fechar o modal (igual ao seu)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Função para lidar com sucesso na edição (MODIFICADO)
  const handleSaveSuccess = async (newStatus: string) => {
    setIsModalOpen(false);

    if (!selectedItem) return;

    // Chamar nossa nova API de atualização
    try {
      const response = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedItem.id, status: newStatus }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setActionMessage({
        type: "success",
        text: "Status atualizado com sucesso!",
      });
      await fetchData(); // Recarregar dados
    } catch (err: any) {
      setActionMessage({
        type: "error",
        text: err.message || "Erro ao atualizar.",
      });
    } finally {
      setSelectedItem(null);
    }
  };

  // Função de deletar (MODIFICADO)
  const handleDelete = async (item: AdminDataItem) => {
    if (
      !confirm(`Tem certeza que deseja excluir a solicitação de ${item.name}?`)
    ) {
      return;
    }

    setActionLoading(item.id);
    setActionMessage(null);

    try {
      // Chamar nossa nova API de delete
      const response = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setActionMessage({ type: "success", text: result.message });
      await fetchData(); // Recarregar dados
    } catch (err: any) {
      console.error("Erro ao deletar:", err);
      setActionMessage({
        type: "error",
        text: err.message || "Erro ao excluir item.",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const isLoading = loadingStates.budgets && loadingStates.submissions;
  const currentData = activeTab === "budgets" ? data.budgets : data.submissions;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 pt-20">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <h2 className="mb-8 text-center">Gerenciamento de Solicitações</h2>
        <p>Painel Administrativo</p>

        {/* Statistics Cards (MODIFICADO) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total de Orçamentos"
            value={data.budgets.length}
            icon={<FaListAlt className="text-white text-xl" />} // Ícone mudado
            color="bg-linear-to-r from-blue-500 to-blue-600"
          />
          <StatCard
            title="Mensagens de Contato"
            value={data.submissions.length}
            icon={<FaEnvelope className="text-white text-xl" />}
            color="bg-linear-to-r from-cyan-500 to-cyan-600"
          />
          <StatCard
            title="Total de Solicitações"
            value={data.budgets.length + data.submissions.length}
            icon={<FaChartBar className="text-white text-xl" />}
            color="bg-linear-to-r from-violet-500 to-violet-600"
          />
        </div>

        {/* Tab Navigation (MODIFICADO) */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-2 border border-gray-200">
            <button
              onClick={() => setActiveTab("budgets")}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === "budgets"
                  ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Orçamentos
            </button>
            <button
              onClick={() => setActiveTab("submissions")}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === "submissions"
                  ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Mensagens
            </button>
          </div>
        </div>

        {/* Content (MODIFICADO) */}
        <div className="space-y-6">
          {error && <ActionMessage message={{ type: "error", text: error }} />}
          <ActionMessage message={actionMessage} />

          {isLoading ? (
            <div className="flex justify-center items-center p-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-center">
                <FaSpinner className="animate-spin size-8 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Carregando solicitações...
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Isso pode levar alguns segundos
                </p>
              </div>
            </div>
          ) : (
            <AdminTable
              data={currentData}
              type={activeTab}
              onViewDetails={handleViewDetails}
              onDelete={handleDelete}
              actionLoading={actionLoading}
            />
          )}
        </div>
      </div>
      {/* Modal (MODIFICADO) */}
      {isModalOpen && selectedItem && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          // Adaptamos os dados para o modal
          data={selectedItem.rawData}
          type={
            selectedItem.type === "budget" ? "budgetRequest" : "contactMessage"
          }
          onSaveSuccess={handleSaveSuccess}
        />
      )}
    </div>
  );
}
