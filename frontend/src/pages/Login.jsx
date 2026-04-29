import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function UserLogin() {

        
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.access_token);
            navigate("/home");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Falha no login. Verifique suas credenciais.");
        }
    };    






    return <div className="flex flex-col min-h-screen items-center justify-center gap-8 bg-[#f0f2f5]">
        <div>
            <img src="./Logo.png" alt="Logo do SayIt" />
        </div>
        <form className="flex flex-col w-full h-full max-w-md gap-4 border 
        bg-white rounded-2xl border-slate-100 shadow-xl items-center p-4 py-8 " 
        onSubmit={handleLogin}>
            
            <p className="font-bold text-[#111827] text-[28px] mb-8">Entrar na sua conta</p>
            
            <input 
            type="email" 
            placeholder="Email"
            className="bg-white border border-zinc-800 px-4 py-2 w-full rounded-md focus:ring focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)} />
            
            <input 
            type="password" 
            placeholder="Senha" 
            className="bg-white border border-zinc-800 px-4 py-2 w-full rounded-md focus:ring focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)} />
            
            <button
            className="rounded-md text-white bg-[#1D98F0] w-full font-bold hover:bg-[#1981c9] 
            py-2 cursor-pointer" type="submit">Entrar</button>
            
            <p className="text-gray-500 hover:text-[#1981c9] cursor-pointer">Esqueceu sua senha?</p>
            
            <p className="text-gray-500">Não tem uma conta? <Link to="/register" className="text-[#1D98F0] hover:text-[#1981c9]">Inscreva-se</Link></p>
        </form>
    </div>
}

export default UserLogin;