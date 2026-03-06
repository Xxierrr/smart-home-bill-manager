/**
 * Supabase Configuration
 * Smart Home Bill Manager Database Connection
 */

import { createClient } from '@supabase/supabase-js'

// Supabase credentials - Replace with your actual values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
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
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
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
        data: metadata
      }
    })
    
    if (error) throw error
    return data
  },
  
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
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
