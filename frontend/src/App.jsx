import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import api from "./api";


const ProtectedRoute = ({ user, children }) => {
  const token = user || localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data); // Usuário logado
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setUser(null); // Token inválido ou inexistente
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Carregando...</div>;



  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={
          <ProtectedRoute user={user}>
          
          <Home />
        
          </ProtectedRoute>  } />
      
      </Routes>

    </BrowserRouter>
  )
}

export default App
