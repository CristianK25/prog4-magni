import axios from "axios";

/**
 * Instancia centralizada de Axios configurada para las peticiones al backend.
 */
const api = axios.create({
  baseURL: "http://localhost:8002/api",
});

/**
 * Interceptor de peticiones que inyecta automáticamente el token JWT en las cabeceras.
 * Recupera el token desde localStorage si está disponible.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
