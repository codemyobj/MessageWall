import { baseURL } from './env'
import axios from 'axios'

const service = axios.create({
  baseURL: baseURL,
  timeout: 10000,
})

// Request interceptor
service.interceptors.request.use(
  (config) => {
    // You can add headers or other configurations here
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
