-- Additional database functions for analytics and reporting
-- Location: supabase/migrations/20250913124000_add_analytics_functions.sql

-- Function to get threat statistics
CREATE OR REPLACE FUNCTION public.get_threat_statistics()
RETURNS TABLE (
    total_threats BIGINT,
    critical_threats BIGINT,
    high_threats BIGINT,
    medium_threats BIGINT,
    low_threats BIGINT,
    active_threats BIGINT,
    resolved_threats BIGINT,
    threats_by_region JSONB,
    threats_by_month JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    WITH threat_counts AS (
        SELECT 
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE severity = 'critical') as critical,
            COUNT(*) FILTER (WHERE severity = 'high') as high,
            COUNT(*) FILTER (WHERE severity = 'medium') as medium,
            COUNT(*) FILTER (WHERE severity = 'low') as low,
            COUNT(*) FILTER (WHERE status = 'active') as active,
            COUNT(*) FILTER (WHERE status = 'resolved') as resolved
        FROM public.threats
    ),
    region_stats AS (
        SELECT jsonb_object_agg(region, count) as region_data
        FROM (
            SELECT 
                unnest(geographic_regions) as region,
                COUNT(*) as count
            FROM public.threats
            GROUP BY unnest(geographic_regions)
        ) region_counts
    ),
    monthly_stats AS (
        SELECT jsonb_object_agg(month, count) as monthly_data
        FROM (
            SELECT 
                to_char(created_at, 'YYYY-MM') as month,
                COUNT(*) as count
            FROM public.threats
            WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
            GROUP BY to_char(created_at, 'YYYY-MM')
            ORDER BY month
        ) monthly_counts
    )
    SELECT 
        tc.total,
        tc.critical,
        tc.high,
        tc.medium,
        tc.low,
        tc.active,
        tc.resolved,
        COALESCE(rs.region_data, '{}'::jsonb),
        COALESCE(ms.monthly_data, '{}'::jsonb)
    FROM threat_counts tc
    CROSS JOIN region_stats rs
    CROSS JOIN monthly_stats ms;
END;
$$;

-- Function to get user activity summary
CREATE OR REPLACE FUNCTION public.get_user_activity_summary(user_id_param UUID DEFAULT NULL)
RETURNS TABLE (
    total_actions BIGINT,
    actions_today BIGINT,
    actions_this_week BIGINT,
    most_common_action TEXT,
    recent_activities JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    WITH activity_stats AS (
        SELECT 
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as today,
            COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as week,
            mode() WITHIN GROUP (ORDER BY action) as common_action
        FROM public.user_activity_logs
        WHERE (user_id_param IS NULL OR user_id = user_id_param)
    ),
    recent_activities AS (
        SELECT jsonb_agg(
            jsonb_build_object(
                'action', action,
                'resource_type', resource_type,
                'created_at', created_at,
                'metadata', metadata
            ) ORDER BY created_at DESC
        ) as activities
        FROM (
            SELECT action, resource_type, created_at, metadata
            FROM public.user_activity_logs
            WHERE (user_id_param IS NULL OR user_id = user_id_param)
            ORDER BY created_at DESC
            LIMIT 10
        ) recent
    )
    SELECT 
        as_stats.total,
        as_stats.today,
        as_stats.week,
        as_stats.common_action,
        COALESCE(ra.activities, '[]'::jsonb)
    FROM activity_stats as_stats
    CROSS JOIN recent_activities ra;
END;
$$;

-- Function to get threat trends over time
CREATE OR REPLACE FUNCTION public.get_threat_trends(days_back INTEGER DEFAULT 30)
RETURNS TABLE (
    date DATE,
    threats_created BIGINT,
    threats_resolved BIGINT,
    severity_breakdown JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    WITH date_series AS (
        SELECT generate_series(
            CURRENT_DATE - INTERVAL '1 day' * days_back,
            CURRENT_DATE,
            INTERVAL '1 day'
        )::DATE as date
    ),
    daily_threats AS (
        SELECT 
            ds.date,
            COUNT(t.id) FILTER (WHERE DATE(t.created_at) = ds.date) as created,
            COUNT(t.id) FILTER (WHERE DATE(t.updated_at) = ds.date AND t.status = 'resolved') as resolved,
            jsonb_object_agg(
                t.severity, 
                COUNT(t.id) FILTER (WHERE DATE(t.created_at) = ds.date AND t.severity = t.severity)
            ) FILTER (WHERE COUNT(t.id) FILTER (WHERE DATE(t.created_at) = ds.date) > 0) as severity_data
        FROM date_series ds
        LEFT JOIN public.threats t ON TRUE
        GROUP BY ds.date
    )
    SELECT 
        dt.date,
        COALESCE(dt.created, 0),
        COALESCE(dt.resolved, 0),
        COALESCE(dt.severity_data, '{}'::jsonb)
    FROM daily_threats dt
    ORDER BY dt.date;
END;
$$;

-- Function to get investigation statistics
CREATE OR REPLACE FUNCTION public.get_investigation_stats()
RETURNS TABLE (
    total_investigations BIGINT,
    open_investigations BIGINT,
    in_progress_investigations BIGINT,
    closed_investigations BIGINT,
    avg_resolution_time INTERVAL,
    investigations_by_priority JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    WITH investigation_stats AS (
        SELECT 
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE status = 'open') as open,
            COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress,
            COUNT(*) FILTER (WHERE status = 'closed') as closed,
            AVG(closed_at - created_at) FILTER (WHERE status = 'closed' AND closed_at IS NOT NULL) as avg_resolution,
            jsonb_object_agg(priority::text, count) FILTER (WHERE count > 0) as priority_data
        FROM (
            SELECT 
                status,
                priority,
                created_at,
                closed_at,
                COUNT(*) as count
            FROM public.investigations
            GROUP BY status, priority, created_at, closed_at
        ) grouped
    )
    SELECT 
        is_stats.total,
        is_stats.open,
        is_stats.in_progress,
        is_stats.closed,
        is_stats.avg_resolution,
        COALESCE(is_stats.priority_data, '{}'::jsonb)
    FROM investigation_stats is_stats;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.get_threat_statistics() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_activity_summary(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_threat_trends(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_investigation_stats() TO authenticated;
