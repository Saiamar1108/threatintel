# 🛡️ Threat Intelligence Platform

A comprehensive, role-based threat intelligence platform built with React and Supabase, designed for security teams to manage, analyze, and respond to cyber threats.

## ✨ Features

### 🔐 Role-Based Access Control
- **Leadership Dashboard**: Executive summaries, high-level metrics, and strategic insights
- **Analyst Dashboard**: Threat analysis, investigation tools, and detailed reporting
- **Operations Dashboard**: Real-time monitoring, alert management, and team coordination

### 🎯 Core Capabilities
- **Threat Management**: Create, track, and analyze security threats
- **Investigation Tracking**: Manage security investigations with detailed notes and findings
- **Daily Briefings**: Generate and distribute threat intelligence briefings
- **Threat Actors**: Maintain database of known threat groups and actors
- **IOC Management**: Track indicators of compromise (IPs, domains, hashes)
- **Geographic Analysis**: Visualize threat distribution across regions
- **Real-time Updates**: Live threat feed with instant notifications

### 📊 Analytics & Reporting
- Threat statistics and trends
- Investigation metrics
- User activity tracking
- Geographic threat distribution
- AI-powered insights and recommendations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Git

### 1. Clone and Setup
```bash
git clone <repository-url>
cd threatintel
npm run setup
```

### 2. Configure Environment
Edit `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup
1. Create a Supabase project
2. Run the migrations in `supabase/migrations/`
3. Configure authentication settings

### 4. Start Development
```bash
npm start
```

Visit `http://localhost:5173` and use test credentials:
- **Leadership**: `leader@threatintel.com` / `Leader123!`
- **Analyst**: `analyst@threatintel.com` / `Analyst123!`
- **Operations**: `ops@threatintel.com` / `Ops123!`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI elements
│   └── ...
├── contexts/           # React contexts (Auth, etc.)
├── hooks/              # Custom React hooks
├── lib/                # External library configurations
├── pages/              # Page components
│   ├── analyst-dashboard/
│   ├── leadership-dashboard/
│   ├── operations-dashboard/
│   ├── daily-briefing/
│   └── threat-details/
├── services/           # API service layers
├── styles/             # CSS and styling
└── utils/              # Utility functions
```

## 🗄️ Database Schema

The platform uses a comprehensive PostgreSQL schema with:
- **User Management**: Role-based profiles with authentication
- **Threat Intelligence**: Threats, actors, indicators, and associations
- **Investigations**: Case management and tracking
- **Briefings**: Intelligence reports and distribution
- **Activity Logging**: Audit trails and user actions

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Preview production build
- `npm run setup` - Run setup script
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **React Router** - Client-side routing

### Backend
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database
- **Row Level Security** - Data protection
- **Real-time subscriptions** - Live updates

### Authentication
- **Supabase Auth** - User management
- **JWT tokens** - Secure sessions
- **Role-based access** - Permission control

## 📚 Documentation

- [Setup Guide](SETUP.md) - Detailed setup instructions
- [Deployment Guide](DEPLOYMENT.md) - Production deployment
- [API Documentation](docs/api.md) - Service layer documentation

## 🔒 Security Features

- Row Level Security (RLS) on all database tables
- Role-based access control
- Secure authentication with JWT
- Activity logging and audit trails
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the [Setup Guide](SETUP.md) for common issues
- Review the [Deployment Guide](DEPLOYMENT.md) for production concerns
- Open an issue for bugs or feature requests

---

Built with ❤️ for the security community