import axios from 'axios'
import { env } from './env'

const API_BASE = env.VITE_API_URL

const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
