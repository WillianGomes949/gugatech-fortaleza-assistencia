// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaShieldAlt } from "react-icons/fa";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Redireciona para a página admin principal
        router.push("/admin");
        // Força o reload para garantir que o middleware detecte o cookie
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || "Senha incorreta.");
      }
    } catch (err) {
      setError("Ocorreu um erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-full max-w-sm border border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-orange-600 rounded-full">
            <FaShieldAlt className="text-white text-3xl" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Acesso Restrito
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Esta área é protegida. Por favor, insira a senha de administrador.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 sr-only"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center"
              placeholder="Digite sua senha"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Verificando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}