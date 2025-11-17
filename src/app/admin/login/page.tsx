// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaShieldAlt } from "react-icons/fa"; // Ícone de exemplo

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
      // 3. Envia a senha para a nossa API de "Porteiro"
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // 4. Se a senha estiver correta, a API cria o cookie.
        // O router.push() agora vai funcionar, pois o Middleware vai ver o cookie.
        router.push("/admin");
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
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 text-center"
              placeholder="Digite sua senha"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}