import { supabase } from '../lib/supabase';

export const threatService = {
  // Get all threats with filtering and sorting
  async getThreats(filters = {}) {
    try {
      let query = supabase
        ?.from('threats')
        ?.select(`
          *,
          analyst:analyst_assigned(id, full_name, email),
          creator:created_by(id, full_name, email),
          threat_actors:threat_actor_associations(
            confidence_level,
            actor:threat_actors(id, name, aliases)
          ),
          indicators:threat_indicators(id, indicator_type, indicator_value, confidence_level),
          investigations(id, title, status, priority)
        `)
      
      // Apply filters
      if (filters?.severity) {
        query = query?.eq('severity', filters?.severity)
      }
      if (filters?.status) {
        query = query?.eq('status', filters?.status)
      }
      if (filters?.analyst_assigned) {
        query = query?.eq('analyst_assigned', filters?.analyst_assigned)
      }
      if (filters?.search) {
        query = query?.or(`title.ilike.%${filters?.search}%,description.ilike.%${filters?.search}%,cve_id.ilike.%${filters?.search}%`)
      }
      
      // Apply sorting
      if (filters?.sort_by) {
        const direction = filters?.sort_direction === 'desc' ? false : true
        query = query?.order(filters?.sort_by, { ascending: direction })
      } else {
        query = query?.order('created_at', { ascending: false })
      }
      
      // Apply pagination
      if (filters?.limit) {
        query = query?.limit(filters?.limit)
      }
      if (filters?.offset) {
        query = query?.range(filters?.offset, filters?.offset + (filters?.limit || 10) - 1)
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

  // Get single threat by ID
  async getThreat(id) {
    try {
      const { data, error } = await supabase
        ?.from('threats')
        ?.select(`
          *,
          analyst:analyst_assigned(id, full_name, email, role),
          creator:created_by(id, full_name, email, role),
          threat_actors:threat_actor_associations(
            confidence_level,
            actor:threat_actors(*)
          ),
          indicators:threat_indicators(*),
          investigations(*)
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

  // Create new threat
  async createThreat(threatData) {
    try {
      const { data, error } = await supabase
        ?.from('threats')
        ?.insert(threatData)
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

  // Update threat
  async updateThreat(id, updates) {
    try {
      const { data, error } = await supabase
        ?.from('threats')
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

  // Delete threat
  async deleteThreat(id) {
    try {
      const { error } = await supabase
        ?.from('threats')
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

  // Get threat statistics for dashboards
  async getThreatStats() {
    try {
      const { data, error } = await supabase?.rpc('get_threat_statistics')
      
      if (error) {
        // Fallback to manual calculations if function doesn't exist
        const [critical, high, medium, low, active, resolved] = await Promise.all([
          supabase?.from('threats')?.select('id', { count: 'exact' })?.eq('severity', 'critical'),
          supabase?.from('threats')?.select('id', { count: 'exact' })?.eq('severity', 'high'),
          supabase?.from('threats')?.select('id', { count: 'exact' })?.eq('severity', 'medium'),
          supabase?.from('threats')?.select('id', { count: 'exact' })?.eq('severity', 'low'),
          supabase?.from('threats')?.select('id', { count: 'exact' })?.eq('status', 'active'),
          supabase?.from('threats')?.select('id', { count: 'exact' })?.eq('status', 'resolved')
        ])
        
        const fallbackData = {
          total_threats: (critical?.count || 0) + (high?.count || 0) + (medium?.count || 0) + (low?.count || 0),
          critical_threats: critical?.count || 0,
          high_threats: high?.count || 0,
          medium_threats: medium?.count || 0,
          low_threats: low?.count || 0,
          active_threats: active?.count || 0,
          resolved_threats: resolved?.count || 0
        }
        
        return { data: fallbackData, error: null }
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

  // Subscribe to threat changes (real-time)
  subscribeToThreats(callback) {
    const channel = supabase
      ?.channel('threats')
      ?.on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'threats' },
        callback
      )
      ?.subscribe()
    
    return channel
  },

  // Unsubscribe from threat changes
  unsubscribeFromThreats(channel) {
    if (channel) {
      supabase?.removeChannel(channel)
    }
  }
}

export default threatService