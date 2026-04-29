import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userResponse = await api.get("/auth/me");
        setUser(userResponse.data);
        const messagesResponse = await api.get("/messages");
        setMessages(messagesResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadData();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Falha no logout. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-8 bg-[#f0f2f5] p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao SayIt</h1>
        {user && (
          <p className="text-gray-600 mb-4">Olá, {user.email}!</p>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Mensagens</h2>
          <div className="mt-4 space-y-4">
            {messages.length ? (
              messages.map((message) => (
                <div key={message.id} className="rounded-2xl border p-4 bg-slate-50">
                  <h3 className="font-bold">{message.title}</h3>
                  <p className="text-gray-700">{message.content}</p>
                </div>
              ))
            ) : (
              <p>Carregando mensagens...</p>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-md text-white bg-[#1D98F0] w-full font-bold hover:bg-[#1981c9] py-2 cursor-pointer"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default Home;