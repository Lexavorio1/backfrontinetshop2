

/*import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:2026/api'
})

api.interceptors.request.use(config => {
  const token =
    localStorage.getItem('token') ||
    sessionStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})*/


import axios from 'axios'

export const api = axios.create({
  baseURL: baseURL: import.meta.env.VITE_API_URL
})


