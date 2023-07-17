import axios from "axios"

export const nsolucoesApi = axios.create({
  baseURL: import.meta.env.VITE_APP_NSOLUCOES_API,
  headers: {
    secret: import.meta.env.VITE_APP_NSOLUCOES_SECRET
  }
})

export const backendApi = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_API
})