import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post("/users/register", { name, username, email, password });
            alert("Conta criada com sucesso!");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao cadastrar");
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-[#f0f2f5] p-4">
            <form 
                className="flex flex-col w-full max-w-md gap-4 border bg-white rounded-2xl shadow-xl p-8" 
                onSubmit={handleRegister}
            >
                <h2 className="font-bold text-2xl text-center mb-4">Criar conta no SayIt</h2>
                
                <input 
                    type="text" placeholder="Nome completo" required
                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D98F0]"
                    onChange={(e) => setName(e.target.value)} 
                />

                <div className="relative">
                  <span className="absolute left-2 top-2 text-gray-500">@</span>
                  <input 
                      type="text" placeholder="username" required
                      className="border p-2 pl-6 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#1D98F0]"
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))} 
                  />
                </div>
                
                <input 
                    type="email" placeholder="E-mail" required
                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D98F0]"
                    onChange={(e) => setEmail(e.target.value)} 
                />
                
                <input 
                    type="password" placeholder="Senha" required
                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D98F0]"
                    onChange={(e) => setPassword(e.target.value)} 
                />
                
                <button type="submit" className="bg-[#1D98F0] text-white font-bold py-2 rounded-md hover:bg-[#1981c9] transition-colors">
                    Cadastrar
                </button>

                <p className="text-center text-sm">
                    Já tem uma conta? <Link to="/login" className="text-[#1D98F0] hover:underline">Entre aqui</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;