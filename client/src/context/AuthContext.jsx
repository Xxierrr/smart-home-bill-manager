import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken')
    const savedUser = localStorage.getItem('currentUser')
    
    if (token && savedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (email, password) => {
    // Simple authentication - in production, this would call an API
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      const token = 'token_' + Date.now()
      localStorage.setItem('authToken', token)
      localStorage.setItem('currentUser', JSON.stringify(user))
      setIsAuthenticated(true)
      setUser(user)
      return { success: true }
    }
    
    return { success: false, message: 'Invalid email or password' }
  }

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: 'User already exists' }
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    
    // Auto login after registration
    const token = 'token_' + Date.now()
    localStorage.setItem('authToken', token)
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    setIsAuthenticated(true)
    setUser(newUser)
    
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}



