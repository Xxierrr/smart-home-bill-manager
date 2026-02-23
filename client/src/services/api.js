import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api/v1'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
}

// Household API
export const householdAPI = {
  create: (data) => api.post('/households', data),
  getById: (id) => api.get(`/households/${id}`),
  update: (id, data) => api.put(`/households/${id}`, data)
}

// Bill API
export const billAPI = {
  create: (data) => api.post('/bills', data),
  getAll: (params) => api.get('/bills', { params }),
  getUpcoming: (householdId) => api.get('/bills/upcoming', { params: { householdId } }),
  update: (id, data) => api.put(`/bills/${id}`, data),
  markAsPaid: (id) => api.patch(`/bills/${id}/pay`),
  delete: (id) => api.delete(`/bills/${id}`)
}

// Insight API
export const insightAPI = {
  getAll: (householdId) => api.get('/insights', { params: { householdId } }),
  markAsRead: (id) => api.patch(`/insights/${id}/read`)
}

export default api
