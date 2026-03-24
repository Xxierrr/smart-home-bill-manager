import { createContext, useContext, useState, useEffect } from 'react'
import { auth, supabase } from '../config/supabase'

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const currentUser = await auth.getCurrentUser()
        if (currentUser) {
          setIsAuthenticated(true)
          setUser(currentUser)
        }
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setIsAuthenticated(true)
        setUser(session.user)
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    try {
      const data = await auth.signIn(email, password)
      
      // Check if user exists but email not confirmed
      if (!data.user) {
        return { 
          success: false, 
          message: 'Please check your email and confirm your account before logging in.' 
        }
      }
      
      setIsAuthenticated(true)
      setUser(data.user)
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      
      // Better error messages
      let errorMessage = 'Invalid email or password'
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please check your credentials.'
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'Please confirm your email address before logging in. Check your inbox.'
      } else if (error.message?.includes('User not found')) {
        errorMessage = 'No account found with this email. Please register first.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      return { success: false, message: errorMessage }
    }
  }

  const register = async (userData) => {
    try {
      const { email, password, firstName, lastName } = userData
      const data = await auth.signUp(email, password, {
        first_name: firstName,
        last_name: lastName
      })
      
      // Check if email confirmation is required
      if (data.user && !data.session) {
        return { 
          success: true, 
          requiresConfirmation: true,
          message: 'Registration successful! Please check your email to confirm your account before logging in.' 
        }
      }
      
      // If no confirmation required, user is logged in immediately
      if (data.user && data.session) {
        setIsAuthenticated(true)
        setUser(data.user)
        return { success: true, requiresConfirmation: false }
      }
      
      return { success: false, message: 'Registration failed. Please try again.' }
    } catch (error) {
      console.error('Registration error:', error)
      
      // Better error messages
      let errorMessage = 'Registration failed'
      
      if (error.message?.includes('already registered')) {
        errorMessage = 'This email is already registered. Please login instead.'
      } else if (error.message?.includes('Password should be')) {
        errorMessage = 'Password must be at least 6 characters long.'
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'Please enter a valid email address.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      return { success: false, message: errorMessage }
    }
  }

  const loginWithGoogle = async () => {
    try {
      await auth.signInWithGoogle()
      // User will be redirected to Google, then back to app
      return { success: true }
    } catch (error) {
      console.error('Google login error:', error)
      return { success: false, message: error.message || 'Google login failed' }
    }
  }

  const logout = async () => {
    try {
      await auth.signOut()
      setIsAuthenticated(false)
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, loginWithGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}



