-- CyberShield Database Schema
-- Advanced Threat Intelligence Platform
-- Built for Hack with Hyderabad 2024

-- Create custom types for threat intelligence
CREATE TYPE public.user_role AS ENUM ('leadership', 'analyst', 'operations');
CREATE TYPE public.threat_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.threat_status AS ENUM ('active', 'monitoring', 'resolved', 'archived');
CREATE TYPE public.investigation_status AS ENUM ('open', 'in_progress', 'closed');
CREATE TYPE public.geographic_region AS ENUM ('north_america', 'south_america', 'europe', 'asia', 'africa', 'oceania', 'unknown');

-- Core database tables
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    organization TEXT NOT NULL DEFAULT 'ThreatIntel Corp',
    role public.user_role NOT NULL DEFAULT 'analyst'::public.user_role,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.threat_actors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    aliases TEXT[],
    description TEXT,
    origin_country TEXT,
    first_observed TIMESTAMPTZ,
    last_activity TIMESTAMPTZ,
    sophistication_level TEXT,
    motivation TEXT,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.threats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cve_id TEXT UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    severity public.threat_severity NOT NULL,
    status public.threat_status DEFAULT 'active'::public.threat_status,
    score DECIMAL(3,1) CHECK (score >= 0 AND score <= 10),
    affected_systems TEXT[],
    geographic_regions public.geographic_region[] DEFAULT '{}',
    first_detected TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    analyst_assigned UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.threat_actor_associations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    threat_id UUID REFERENCES public.threats(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.threat_actors(id) ON DELETE CASCADE,
    confidence_level DECIMAL(3,1) CHECK (confidence_level >= 0 AND confidence_level <= 10),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(threat_id, actor_id)
);

CREATE TABLE public.investigations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    threat_id UUID REFERENCES public.threats(id) ON DELETE CASCADE,
    investigator_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    status public.investigation_status DEFAULT 'open'::public.investigation_status,
    priority INTEGER CHECK (priority >= 1 AND priority <= 5) DEFAULT 3,
    notes TEXT,
    findings TEXT,
    recommendations TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMPTZ
);

CREATE TABLE public.threat_indicators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    threat_id UUID REFERENCES public.threats(id) ON DELETE CASCADE,
    indicator_type TEXT NOT NULL,
    indicator_value TEXT NOT NULL,
    confidence_level DECIMAL(3,1) CHECK (confidence_level >= 0 AND confidence_level <= 10),
    first_seen TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_seen TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    briefing_date DATE NOT NULL,
    target_audience public.user_role[] DEFAULT '{}',
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.user_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id UUID,
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Indexes
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_threats_severity ON public.threats(severity);
CREATE INDEX idx_threats_status ON public.threats(status);
CREATE INDEX idx_threats_analyst ON public.threats(analyst_assigned);
CREATE INDEX idx_threats_cve ON public.threats(cve_id);
CREATE INDEX idx_threat_actors_name ON public.threat_actors(name);
CREATE INDEX idx_investigations_status ON public.investigations(status);
CREATE INDEX idx_investigations_threat ON public.investigations(threat_id);
CREATE INDEX idx_threat_indicators_type ON public.threat_indicators(indicator_type);
CREATE INDEX idx_threat_indicators_value ON public.threat_indicators(indicator_value);
CREATE INDEX idx_briefings_date ON public.briefings(briefing_date);
CREATE INDEX idx_user_activity_logs_user ON public.user_activity_logs(user_id);

-- 4. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_actors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_actor_associations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investigations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_logs ENABLE ROW LEVEL SECURITY;

-- 5. Create Functions
CREATE OR REPLACE FUNCTION public.get_user_role_from_auth() 
RETURNS TEXT 
LANGUAGE sql 
STABLE 
SECURITY DEFINER 
AS $$ 
SELECT COALESCE(
    (SELECT role::TEXT FROM public.user_profiles WHERE id = auth.uid()),
    'analyst'
)
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role, organization)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'analyst'::public.user_role),
    COALESCE(NEW.raw_user_meta_data->>'organization', 'ThreatIntel Corp')
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 6. Create RLS Policies (Fixed type casting)
CREATE POLICY "users_manage_own_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

CREATE POLICY "leadership_full_access_threats"
ON public.threats
FOR ALL
TO authenticated
USING (public.get_user_role_from_auth() = 'leadership')
WITH CHECK (public.get_user_role_from_auth() = 'leadership');

CREATE POLICY "analysts_manage_threats"
ON public.threats
FOR ALL
TO authenticated
USING (
    public.get_user_role_from_auth() IN ('analyst', 'operations') AND 
    (analyst_assigned = auth.uid() OR created_by = auth.uid() OR analyst_assigned IS NULL)
)
WITH CHECK (public.get_user_role_from_auth() IN ('analyst', 'operations'));

CREATE POLICY "users_manage_own_investigations"
ON public.investigations
FOR ALL
TO authenticated
USING (investigator_id = auth.uid())
WITH CHECK (investigator_id = auth.uid());

CREATE POLICY "users_manage_own_activity_logs"
ON public.user_activity_logs
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "authenticated_read_threat_actors"
ON public.threat_actors
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "users_create_threat_actors"
ON public.threat_actors
FOR INSERT
TO authenticated
WITH CHECK (created_by = auth.uid());

CREATE POLICY "creators_update_threat_actors"
ON public.threat_actors
FOR UPDATE
TO authenticated
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

CREATE POLICY "analysts_manage_threat_indicators"
ON public.threat_indicators
FOR ALL
TO authenticated
USING (public.get_user_role_from_auth() IN ('analyst', 'operations', 'leadership'))
WITH CHECK (public.get_user_role_from_auth() IN ('analyst', 'operations', 'leadership'));

CREATE POLICY "authenticated_read_threat_associations"
ON public.threat_actor_associations
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "analysts_manage_threat_associations_insert"
ON public.threat_actor_associations
FOR INSERT
TO authenticated
WITH CHECK (public.get_user_role_from_auth() IN ('analyst', 'operations', 'leadership'));

CREATE POLICY "analysts_manage_threat_associations_update"
ON public.threat_actor_associations
FOR UPDATE
TO authenticated
USING (public.get_user_role_from_auth() IN ('analyst', 'operations', 'leadership'))
WITH CHECK (public.get_user_role_from_auth() IN ('analyst', 'operations', 'leadership'));

CREATE POLICY "analysts_manage_threat_associations_delete"
ON public.threat_actor_associations
FOR DELETE
TO authenticated
USING (public.get_user_role_from_auth() IN ('analyst', 'operations', 'leadership'));

-- Fixed briefing policies with proper type casting
CREATE POLICY "briefings_role_based_access"
ON public.briefings
FOR SELECT
TO authenticated
USING (
    is_published = true OR 
    created_by = auth.uid() OR 
    public.get_user_role_from_auth()::public.user_role = ANY(target_audience) OR
    public.get_user_role_from_auth() = 'leadership'
);

CREATE POLICY "users_manage_own_briefings"
ON public.briefings
FOR INSERT
TO authenticated
WITH CHECK (created_by = auth.uid());

CREATE POLICY "users_update_own_briefings"
ON public.briefings
FOR UPDATE
TO authenticated
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

CREATE POLICY "users_delete_own_briefings"
ON public.briefings
FOR DELETE
TO authenticated
USING (created_by = auth.uid());

-- 7. Create Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_threats_updated_at
  BEFORE UPDATE ON public.threats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_threat_actors_updated_at
  BEFORE UPDATE ON public.threat_actors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_investigations_updated_at
  BEFORE UPDATE ON public.investigations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_briefings_updated_at
  BEFORE UPDATE ON public.briefings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Insert Sample Data
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data, raw_app_meta_data, is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, email_change_token_current, email_change_confirm_status, reauthentication_token, reauthentication_sent_at, phone, phone_change, phone_change_token, phone_change_sent_at) VALUES 
('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'leader@threatintel.com', crypt('Leader123!', gen_salt('bf', 10)), now(), now(), now(), '{"full_name": "Sarah Johnson", "role": "leadership", "organization": "ThreatIntel Corp"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb, false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'analyst@threatintel.com', crypt('Analyst123!', gen_salt('bf', 10)), now(), now(), now(), '{"full_name": "Michael Chen", "role": "analyst", "organization": "ThreatIntel Corp"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb, false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'ops@threatintel.com', crypt('Ops123!', gen_salt('bf', 10)), now(), now(), now(), '{"full_name": "Alex Rodriguez", "role": "operations", "organization": "ThreatIntel Corp"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb, false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

-- Insert sample threats
INSERT INTO public.threats (id, cve_id, title, description, severity, score, affected_systems, geographic_regions, analyst_assigned, created_by) VALUES 
('00000000-0000-0000-0000-000000000101', 'CVE-2024-0001', 'Zero-Day Vulnerability in Microsoft Exchange Server', 'A critical remote code execution vulnerability affecting Microsoft Exchange Server versions 2016, 2019, and Online. Attackers can execute arbitrary code with SYSTEM privileges.', 'critical', 9.8, '{"Microsoft Exchange Server 2016", "Microsoft Exchange Server 2019", "Exchange Online"}', '{"north_america", "europe", "asia"}', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002'),
('00000000-0000-0000-0000-000000000102', 'CVE-2024-0002', 'Phishing Campaign Targeting Financial Institutions', 'Large-scale phishing campaign using sophisticated social engineering techniques to target employees at major financial institutions.', 'high', 7.5, '{"Email Systems", "Banking Applications", "Employee Workstations"}', '{"north_america", "europe"}', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002'),
('00000000-0000-0000-0000-000000000103', 'CVE-2024-0003', 'Supply Chain Attack on Software Development Tools', 'Compromised software development tools distributing malware through legitimate software updates.', 'critical', 9.2, '{"Software Development Environments", "CI/CD Pipelines", "Code Repositories"}', '{"north_america", "europe", "asia"}', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002');

-- Insert sample briefings
INSERT INTO public.briefings (title, content, briefing_date, target_audience, created_by, is_published) VALUES 
('Daily Threat Intelligence Briefing - Critical Exchange Vulnerability', 'A critical zero-day vulnerability has been discovered in Microsoft Exchange Server. Immediate action required for all organizations running Exchange. Patch expected within 72 hours.', CURRENT_DATE, '{"leadership", "analyst", "operations"}', '00000000-0000-0000-0000-000000000001', true),
('Weekly Leadership Summary - Emerging APT Campaigns', 'Summary of advanced persistent threat activities observed this week, including increased activity from state-sponsored groups targeting critical infrastructure.', CURRENT_DATE - INTERVAL '1 day', '{"leadership"}', '00000000-0000-0000-0000-000000000001', true);
