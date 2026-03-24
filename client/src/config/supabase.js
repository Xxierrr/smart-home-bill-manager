/**
 * Supabase Configuration
 * Smart Home Bill Manager Database Connection
 */

import { createClient } from '@supabase/supabase-js'

// Supabase credentials - Replace with your actual values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

// Debug: Log if environment variables are missing (only in development)
if (import.meta.env.DEV) {
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Key exists:', !!supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY')
}

// Throw error if credentials are missing
if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.error('❌ Supabase credentials are missing! Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,      // Auto refresh JWT tokens
    persistSession: true,         // Persist session in localStorage
    detectSessionInUrl: true,     // Detect OAuth redirects
    flowType: 'pkce'             // Use PKCE flow for security
  }
})

// Database helper functions
export const db = {
  // Bills operations
  bills: {
    getAll: async (userId) => {
      const { data, error } = await supabase
        .from('bills')
        .select('*')
        .eq('user_id', userId)
        .order('due_date', { ascending: true })
      
      if (error) throw error
      return data
    },
    
    create: async (bill) => {
      const { data, error } = await supabase
        .from('bills')
        .insert([bill])
        .select()
      
      if (error) throw error
      return data[0]
    },
    
    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('bills')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data[0]
    },
    
    delete: async (id) => {
      const { error } = await supabase
        .from('bills')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return true
    }
  },
  
  // Users operations
  users: {
    getCurrent: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    },
    
    getProfile: async (userId) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) throw error
      return data
    },
    
    updateProfile: async (userId, updates) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
      
      if (error) throw error
      return data[0]
    }
  },
  
  // Households operations
  households: {
    get: async (userId) => {
      const { data, error } = await supabase
        .from('households')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (error) throw error
      return data
    },
    
    create: async (household) => {
      const { data, error } = await supabase
        .from('households')
        .insert([household])
        .select()
      
      if (error) throw error
      return data[0]
    },
    
    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('households')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data[0]
    }
  },
  
  // Insights operations
  insights: {
    getAll: async (userId) => {
      const { data, error} = await supabase
        .from('insights')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  },
  
  // Bill Splits operations
  billSplits: {
    create: async (splitData) => {
      const { data, error } = await supabase
        .from('bill_splits')
        .insert([splitData])
        .select()
      
      if (error) throw error
      return data[0]
    },
    
    getByBillId: async (billId) => {
      const { data, error } = await supabase
        .from('bill_splits')
        .select('*')
        .eq('bill_id', billId)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') return null // No split found
        throw error
      }
      return data
    },
    
    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('bill_splits')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data[0]
    },
    
    delete: async (billId) => {
      const { error } = await supabase
        .from('bill_splits')
        .delete()
        .eq('bill_id', billId)
      
      if (error) throw error
      return true
    }
  }
}

// Auth helper functions
export const auth = {
  signUp: async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,  // Stored in raw_user_meta_data
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (error) throw error
    
    // Check if email confirmation is required
    const requiresConfirmation = data.user && !data.session
    
    return {
      ...data,
      requiresConfirmation
    }
  },
  
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },
  
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })
    
    if (error) throw error
    return data
  },
  
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },
  
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },
  
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}
