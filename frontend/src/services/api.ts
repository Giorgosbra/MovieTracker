import axios from 'axios'

// Create a reusable Axios client for backend API requests.
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
})

// Attach the JWT access token to every authenticated request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api


