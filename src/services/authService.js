import { supabase } from '../lib/supabase';

export const authService = {
  // Sign in with email and password
  async signIn(email, password) {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        return { 
          data: null, 
          error: { 
            message: 'Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.' 
          } 
        }
      }
      return { data: null, error }
    }
  },

  // Sign up with email, password and metadata
  async signUp(email, password, metadata = {}) {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata?.name || email?.split('@')?.[0],
            role: metadata?.role || 'analyst',
            organization: metadata?.organization || 'ThreatIntel Corp'
          }
        }
      })
      
      if (error) {
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        return { 
          data: null, 
          error: { 
            message: 'Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.' 
          } 
        }
      }
      return { data: null, error }
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase?.auth?.signOut()
      return { error }
    } catch (error) {
      return { error }
    }
  },

  // Get current session
  async getSession() {
    try {
      const { data, error } = await supabase?.auth?.getSession()
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Get current user
  async getUser() {
    try {
      const { data, error } = await supabase?.auth?.getUser()
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Get user profile from user_profiles table
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        ?.from('user_profiles')
        ?.select('*')
        ?.eq('id', userId)
        ?.single()
      
      if (error) {
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          data: null, 
          error: { 
            message: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
          } 
        }
      }
      return { data: null, error }
    }
  },

  // Update user profile
  async updateProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        ?.from('user_profiles')
        ?.update(updates)
        ?.eq('id', userId)
        ?.select()
        ?.single()
      
      if (error) {
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          data: null, 
          error: { 
            message: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
          } 
        }
      }
      return { data: null, error }
    }
  }
}

export default authService