import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import AuthForm from './components/AuthForm';
import TrustSignals from './components/TrustSignals';
import SecurityGuidelines from './components/SecurityGuidelines';

const Authentication = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showSecurityGuidelines, setShowSecurityGuidelines] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated
    const storedUser = localStorage.getItem('threatintel_user');
    const storedToken = localStorage.getItem('threatintel_token');
    
    if (storedUser && storedToken) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Redirect to appropriate dashboard
      const dashboardRoutes = {
        leadership: '/leadership-dashboard',
        analyst: '/analyst-dashboard',
        operations: '/operations-dashboard'
      };
      navigate(dashboardRoutes?.[userData?.role] || '/analyst-dashboard');
    }
  }, [navigate]);

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setShowSecurityGuidelines(!isLogin); // Show guidelines when switching to registration
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Shield" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">ThreatIntel Pro</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>24/7 Threat Monitoring</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-success">
                <Icon name="Shield" size={16} />
                <span className="hidden sm:inline">Secure Platform</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
            <div className="max-w-lg">
              <h1 className="text-4xl xl:text-5xl font-bold text-foreground mb-6">
                Advanced Threat Intelligence Platform
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Protect your organization with AI-powered threat detection, 
                real-time monitoring, and comprehensive security analytics.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                  </div>
                  <span className="text-foreground">Real-time threat intelligence feeds</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                    <Icon name="Brain" size={16} className="text-primary" />
                  </div>
                  <span className="text-foreground">AI-powered threat analysis</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full">
                    <Icon name="Users" size={16} className="text-accent" />
                  </div>
                  <span className="text-foreground">Role-based security dashboards</span>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">50M+</div>
                  <div className="text-sm text-muted-foreground">Threats Blocked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Image */}
          <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop"
              alt="Cybersecurity Network"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Authentication Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Icon name="Shield" size={24} color="white" />
                </div>
                <span className="text-2xl font-semibold text-foreground">ThreatIntel Pro</span>
              </div>
              <p className="text-muted-foreground">Enterprise Threat Intelligence Platform</p>
            </div>

            {/* Authentication Form */}
            <AuthForm
              isLogin={isLogin}
              onToggleMode={handleToggleMode}
              onAuthSuccess={handleAuthSuccess}
            />

            {/* Security Guidelines (shown during registration) */}
            <SecurityGuidelines isVisible={showSecurityGuidelines} />

            {/* Trust Signals */}
            <TrustSignals />
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-smooth">Privacy Policy</button>
              <button className="hover:text-foreground transition-smooth">Terms of Service</button>
              <button className="hover:text-foreground transition-smooth">Security</button>
              <button className="hover:text-foreground transition-smooth">Support</button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={14} />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} ThreatIntel Pro. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Authentication;