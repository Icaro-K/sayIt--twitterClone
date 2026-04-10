import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";




function Home () {
    
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/logout");
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            alert("Falha no logout. Tente novamente.");
        }
    };

    return <button
    onClick={handleLogout}
    className="rounded-md text-white bg-[#1D98F0] w-full font-bold hover:bg-[#1981c9] 
    py-2 cursor-pointer">Sair</button>
}
    

export default Home;