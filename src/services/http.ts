import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000
})

api.interceptors.response.use(
  r => r,
  err => {
    console.error('[API ERROR]', err?.response?.status, err?.response?.data || err.message)
    return Promise.reject(err)
  }
)

export default api
