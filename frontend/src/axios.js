import axios from 'axios';

const api = axios.create({
  // baseURL: '/api', // Isso já é tratado pelo proxy do Vite
  withCredentials: true, // ESSENCIAL: Envia cookies automáticos para o backend
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;