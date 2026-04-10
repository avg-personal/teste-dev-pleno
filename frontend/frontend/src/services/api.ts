import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

//adicionar o token automaticamente em todas as requisições se ele existir no localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@App:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;