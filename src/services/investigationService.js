import { supabase } from '../lib/supabase';

export const investigationService = {
  // Get all investigations for the current user
  async getInvestigations(filters = {}) {
    try {
      let query = supabase
        ?.from('investigations')
        ?.select(`
          *,
          threat:threats(id, title, severity, cve_id),
          investigator:user_profiles(id, full_name, email, role)
        `)
      
      // Apply filters
      if (filters?.status) {
        query = query?.eq('status', filters?.status)
      }
      if (filters?.priority) {
        query = query?.eq('priority', filters?.priority)
      }
      if (filters?.threat_id) {
        query = query?.eq('threat_id', filters?.threat_id)
      }
      if (filters?.search) {
        query = query?.or(`title.ilike.%${filters?.search}%,notes.ilike.%${filters?.search}%`)
      }
      
      // Apply sorting
      if (filters?.sort_by) {
        const direction = filters?.sort_direction === 'desc' ? false : true
        query = query?.order(filters?.sort_by, { ascending: direction })
      } else {
        query = query?.order('created_at', { ascending: false })
      }
      
      const { data, error } = await query
      
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

  // Get single investigation by ID
  async getInvestigation(id) {
    try {
      const { data, error } = await supabase
        ?.from('investigations')
        ?.select(`
          *,
          threat:threats(*),
          investigator:user_profiles(id, full_name, email, role)
        `)
        ?.eq('id', id)
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

  // Create new investigation
  async createInvestigation(investigationData) {
    try {
      const { data, error } = await supabase
        ?.from('investigations')
        ?.insert(investigationData)
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
  },

  // Update investigation
  async updateInvestigation(id, updates) {
    try {
      const { data, error } = await supabase
        ?.from('investigations')
        ?.update(updates)
        ?.eq('id', id)
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
  },

  // Close investigation
  async closeInvestigation(id, findings, recommendations) {
    try {
      const { data, error } = await supabase
        ?.from('investigations')
        ?.update({
          status: 'closed',
          findings,
          recommendations,
          closed_at: new Date()?.toISOString()
        })
        ?.eq('id', id)
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
  },

  // Delete investigation
  async deleteInvestigation(id) {
    try {
      const { error } = await supabase
        ?.from('investigations')
        ?.delete()
        ?.eq('id', id)
      
      if (error) {
        return { error }
      }
      
      return { error: null }
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          error: { 
            message: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
          } 
        }
      }
      return { error }
    }
  }
}

export default investigationService