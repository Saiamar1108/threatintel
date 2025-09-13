# Threat Intelligence Platform - Setup Guide

## Prerequisites
- Node.js 18+ installed
- Supabase account
- Git

## Backend Setup (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### 2. Configure Environment Variables
1. Copy `env.example` to `.env`
2. Fill in your Supabase credentials:
```bash
cp env.example .env
```

Edit `.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Database Migrations
1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Link your project:
```bash
supabase link --project-ref your-project-ref
```

3. Run migrations:
```bash
supabase db push
```

Or manually run the SQL files in `supabase/migrations/` in your Supabase dashboard.

### 4. Set up Authentication
1. In Supabase Dashboard → Authentication → Settings
2. Configure email settings
3. Enable email confirmations if needed
4. Set up any additional auth providers

## Frontend Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Access the Application
- Open http://localhost:5173
- Use test credentials:
  - Leadership: `leader@threatintel.com` / `Leader123!`
  - Analyst: `analyst@threatintel.com` / `Analyst123!`
  - Operations: `ops@threatintel.com` / `Ops123!`

## Database Schema

The application includes these main tables:
- `user_profiles` - User management with role-based access
- `threats` - Threat intelligence data
- `threat_actors` - Known threat actors and groups
- `investigations` - Investigation tracking
- `briefings` - Daily/weekly briefings
- `threat_indicators` - IOCs and indicators
- `user_activity_logs` - Audit trail

## Features by Role

### Leadership Dashboard
- Executive summaries
- High-level threat metrics
- Geographic threat distribution
- AI-powered insights

### Analyst Dashboard
- Threat feed management
- Investigation tools
- Threat analysis
- Report generation

### Operations Dashboard
- Real-time threat monitoring
- Alert management
- Team coordination
- System status

## API Functions

The database includes these analytics functions:
- `get_threat_statistics()` - Overall threat metrics
- `get_user_activity_summary()` - User activity tracking
- `get_threat_trends()` - Time-based threat analysis
- `get_investigation_stats()` - Investigation metrics

## Security

- Row Level Security (RLS) enabled on all tables
- Role-based access control
- Secure authentication with Supabase Auth
- Activity logging for audit trails

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check Supabase project status
   - Verify environment variables
   - Ensure project is not paused

2. **Authentication Issues**
   - Check email confirmation settings
   - Verify user exists in database
   - Check RLS policies

3. **Migration Errors**
   - Run migrations in order
   - Check for existing data conflicts
   - Verify database permissions

### Getting Help

1. Check Supabase logs in dashboard
2. Review browser console for errors
3. Verify all environment variables are set
4. Ensure database migrations completed successfully
