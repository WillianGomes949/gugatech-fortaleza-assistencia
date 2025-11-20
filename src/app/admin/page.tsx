// app/admin/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
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
  FaListAlt,
} from "react-icons/fa";
import { DetailModal } from "@/components/ui/DetailModal";

// --- TIPOS ---
interface BasePayload {
  _id: string;
  _type: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  status: "pendente" | "lido" | "respondido" | "concluído";
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

// Tipo unificado para uso no Modal
type ModalData = BudgetRequestPayload | ContactMessagePayload;

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

// Componente de Card de Estatística
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      </div>
    </div>
  );
}

// Componente de Tabela
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
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
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
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {item.serviceType || "Não especificado"}
                    </span>
                  )}
                </td>

                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize
                    ${
                      item.status === "pendente"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "lido"
                        ? "bg-gray-100 text-gray-800"
                        : item.status === "respondido"
                        ? "bg-orange-100 text-orange-800"
                        : item.status === "concluído"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2
                      ${
                        item.status === "pendente"
                          ? "bg-yellow-500"
                          : item.status === "lido"
                          ? "bg-gray-500"
                          : item.status === "respondido"
                          ? "bg-orange-500"
                          : item.status === "concluído"
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
                      className="p-2 text-blue-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 border border-orange-200"
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

// Componente de Mensagem de Ação
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

// Função de adaptação
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
        email: "N/A",
        status: item.status,
        itemCount: item.items?.length || 0,
        rawData: item,
      };
    }
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
  const router = useRouter();
  const [data, setData] = useState<AdminData>({ budgets: [], submissions: [] });
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    budgets: true,
    submissions: true,
    actions: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"budgets" | "submissions">("budgets");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminDataItem | null>(null);

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/verify");
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/admin/login");
        }
      } catch (error) {
        setIsAuthenticated(false);
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  // Fetch data
  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;

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
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [fetchData, isAuthenticated]);

  // Cleanup de timeouts
  useEffect(() => {
    if (actionMessage) {
      const timer = setTimeout(() => setActionMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [actionMessage]);

  // Handlers
  const handleViewDetails = async (item: AdminDataItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);

    if (item.status === "pendente") {
      try {
        await fetch("/api/admin/update-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: item.id, status: "lido" }),
        });
        
        const updateData = (prevData: AdminDataItem[]) =>
          prevData.map((d) =>
            d.id === item.id ? { ...d, status: "lido" } : d
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSaveSuccess = async (newStatus: string) => {
    setIsModalOpen(false);

    if (!selectedItem) return;

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
      await fetchData();
    } catch (err: any) {
      setActionMessage({
        type: "error",
        text: err.message || "Erro ao atualizar.",
      });
    } finally {
      setSelectedItem(null);
    }
  };

  // --- NOVA FUNÇÃO: Salvar Dados Editados ---
  const handleUpdateData = async (updatedData: ModalData) => {
    // 1. Chama API para salvar no Sanity
    // (Você precisará criar o endpoint /api/admin/update se ele não existir)
    const response = await fetch("/api/admin/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Erro ao atualizar");

    // 2. Atualiza a UI Localmente (Optimistic Update)
    const updateLocalList = (list: AdminDataItem[]) => 
      list.map((item) => {
        if (item.id === updatedData._id) {
          // Mapeia os campos novos de volta para o formato da tabela
          const isBudget = updatedData._type === 'budgetRequest';
          return {
            ...item,
            name: isBudget ? (updatedData as BudgetRequestPayload).customerName : (updatedData as ContactMessagePayload).name,
            phone: isBudget ? (updatedData as BudgetRequestPayload).customerPhone : (updatedData as ContactMessagePayload).phone,
            email: isBudget ? 'N/A' : (updatedData as ContactMessagePayload).email,
            rawData: updatedData // Atualiza os dados brutos para reabrir o modal corretamente
          };
        }
        return item;
      });

    setData(prev => ({
      budgets: updateLocalList(prev.budgets),
      submissions: updateLocalList(prev.submissions)
    }));

    // Se o item selecionado for o mesmo que está sendo editado, atualiza ele também
    if (selectedItem && selectedItem.id === updatedData._id) {
       setSelectedItem(prev => {
          if (!prev) return null;
          const isBudget = updatedData._type === 'budgetRequest';
          return {
             ...prev,
             name: isBudget ? (updatedData as BudgetRequestPayload).customerName : (updatedData as ContactMessagePayload).name,
             rawData: updatedData
          }
       })
    }

    setActionMessage({
      type: "success",
      text: "Informações atualizadas com sucesso!",
    });
  };

  const handleDelete = async (item: AdminDataItem) => {
    if (!confirm(`Tem certeza que deseja excluir a solicitação de ${item.name}?`)) {
      return;
    }

    setActionLoading(item.id);
    setActionMessage(null);

    try {
      const response = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setActionMessage({ type: "success", text: result.message });
      await fetchData();
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

  // Loading de autenticação
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Já foi redirecionado para o login
  }

  const isLoading = loadingStates.budgets && loadingStates.submissions;
  const currentData = activeTab === "budgets" ? data.budgets : data.submissions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 pt-20">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Gerenciamento de Solicitações
        </h1>
        <p className="text-center text-gray-600 mb-8">Painel Administrativo</p>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total de Orçamentos"
            value={data.budgets.length}
            icon={<FaListAlt className="text-white text-xl" />}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
          />
          <StatCard
            title="Mensagens de Contato"
            value={data.submissions.length}
            icon={<FaEnvelope className="text-white text-xl" />}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
          />
          <StatCard
            title="Total de Solicitações"
            value={data.budgets.length + data.submissions.length}
            icon={<FaChartBar className="text-white text-xl" />}
            color="bg-gradient-to-r from-violet-500 to-violet-600"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-2 border border-gray-200">
            <button
              onClick={() => setActiveTab("budgets")}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === "budgets"
                  ? "bg-gradient-to-r from-orange-500 to-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Orçamentos
            </button>
            <button
              onClick={() => setActiveTab("submissions")}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === "submissions"
                  ? "bg-gradient-to-r from-orange-500 to-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Mensagens
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {error && <ActionMessage message={{ type: "error", text: error }} />}
          <ActionMessage message={actionMessage} />

          {isLoading ? (
            <div className="flex justify-center items-center p-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-center">
                <FaSpinner className="animate-spin size-8 text-orange-600 mx-auto mb-4" />
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

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          key={selectedItem?.id}
          data={selectedItem.rawData}
          type={selectedItem.type === "budget" ? "budgetRequest" : "contactMessage"}
          onSaveSuccess={handleSaveSuccess}
          // NOVA PROP ADICIONADA
          onUpdateData={handleUpdateData} 
        />
      )}
    </div>
  );
}