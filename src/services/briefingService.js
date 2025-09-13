import { supabase } from '../lib/supabase';

export const briefingService = {
  // Get briefings based on user role and access
  async getBriefings(filters = {}) {
    try {
      let query = supabase
        ?.from('briefings')
        ?.select(`
          *,
          creator:created_by(id, full_name, email, role)
        `)
      
      // Apply filters
      if (filters?.date) {
        query = query?.eq('briefing_date', filters?.date)
      }
      if (filters?.is_published !== undefined) {
        query = query?.eq('is_published', filters?.is_published)
      }
      if (filters?.search) {
        query = query?.or(`title.ilike.%${filters?.search}%,content.ilike.%${filters?.search}%`)
      }
      
      // Apply sorting
      query = query?.order('briefing_date', { ascending: false })
      
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

  // Get single briefing by ID
  async getBriefing(id) {
    try {
      const { data, error } = await supabase
        ?.from('briefings')
        ?.select(`
          *,
          creator:created_by(id, full_name, email, role)
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

  // Create new briefing
  async createBriefing(briefingData) {
    try {
      const { data, error } = await supabase
        ?.from('briefings')
        ?.insert(briefingData)
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

  // Update briefing
  async updateBriefing(id, updates) {
    try {
      const { data, error } = await supabase
        ?.from('briefings')
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

  // Publish briefing
  async publishBriefing(id) {
    try {
      const { data, error } = await supabase
        ?.from('briefings')
        ?.update({ is_published: true })
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

  // Delete briefing
  async deleteBriefing(id) {
    try {
      const { error } = await supabase
        ?.from('briefings')
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
  },

  // Get today's briefing
  async getTodaysBriefing() {
    try {
      const today = new Date()?.toISOString()?.split('T')?.[0] // YYYY-MM-DD format
      
      const { data, error } = await supabase
        ?.from('briefings')
        ?.select(`
          *,
          creator:created_by(id, full_name, email, role)
        `)
        ?.eq('briefing_date', today)
        ?.eq('is_published', true)
        ?.order('created_at', { ascending: false })
        ?.limit(1)
        ?.maybeSingle()
      
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

export default briefingService