import { useState, useEffect } from 'react';
import { threatService } from '../services/threatService';

export const useThreats = (filters = {}) => {
  const [threats, setThreats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadThreats = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: threatError } = await threatService?.getThreats(filters)
      
      if (threatError) {
        setError(threatError?.message || 'Failed to load threats')
        return
      }
      
      setThreats(data || [])
    } catch (error) {
      setError('Failed to load threats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadThreats()
  }, [JSON.stringify(filters)])

  const refreshThreats = () => {
    loadThreats()
  }

  return {
    threats,
    loading,
    error,
    refreshThreats
  }
}

export const useThreatStats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data, error: statsError } = await threatService?.getThreatStats()
        
        if (statsError) {
          setError(statsError?.message || 'Failed to load threat statistics')
          return
        }
        
        setStats(data)
      } catch (error) {
        setError('Failed to load threat statistics')
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return {
    stats,
    loading,
    error
  }
}

export const useRealTimeThreats = (callback) => {
  useEffect(() => {
    const channel = threatService?.subscribeToThreats(callback)

    return () => {
      threatService?.unsubscribeFromThreats(channel)
    };
  }, [callback])
}

export default useThreats