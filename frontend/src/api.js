import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true, // Permite enviar cookies (para autenticação)
});


export default api;