import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user = null, alerts = [], onLogout = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: user?.role === 'leadership' ? '/leadership-dashboard' : 
            user?.role === 'analyst'? '/analyst-dashboard' : '/operations-dashboard',
      icon: 'LayoutDashboard',
      roleAccess: ['leadership', 'analyst', 'operations']
    },
    {
      label: 'Threat Details',
      path: '/threat-details',
      icon: 'Shield',
      roleAccess: ['leadership', 'analyst', 'operations']
    },
    {
      label: 'Daily Briefing',
      path: '/daily-briefing',
      icon: 'FileText',
      roleAccess: ['leadership', 'analyst', 'operations']
    }
  ];

  const criticalAlerts = alerts?.filter(alert => alert?.severity === 'critical')?.length;
  const highAlerts = alerts?.filter(alert => alert?.severity === 'high')?.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.profile-menu') && !event?.target?.closest('.profile-button')) {
        setIsProfileMenuOpen(false);
      }
      if (!event?.target?.closest('.notification-menu') && !event?.target?.closest('.notification-button')) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'leadership': return 'Leadership';
      case 'analyst': return 'Security Analyst';
      case 'operations': return 'Operations Team';
      default: return 'User';
    }
  };

  const isActivePath = (path) => {
    if (path?.includes('dashboard')) {
      return location?.pathname?.includes('dashboard');
    }
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Shield" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">ThreatIntel Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search CVE, IOCs..."
                className="w-64 pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="notification-button relative"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <Icon name="Bell" size={20} />
              {(criticalAlerts > 0 || highAlerts > 0) && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-error rounded-full animate-pulse-slow">
                  {criticalAlerts + highAlerts > 9 ? '9+' : criticalAlerts + highAlerts}
                </span>
              )}
            </Button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="notification-menu absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-threat-modal z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-foreground">Threat Alerts</h3>
                  <p className="text-xs text-muted-foreground">
                    {criticalAlerts} critical, {highAlerts} high priority
                  </p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {alerts?.slice(0, 5)?.map((alert, index) => (
                    <div key={index} className="p-3 border-b border-border last:border-b-0 hover:bg-muted transition-smooth">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          alert?.severity === 'critical' ? 'bg-error animate-pulse-slow' :
                          alert?.severity === 'high'? 'bg-warning' : 'bg-accent'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {alert?.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {alert?.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Alerts
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          {user && (
            <div className="relative">
              <Button
                variant="ghost"
                className="profile-button flex items-center space-x-2 px-3"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{getRoleDisplayName(user?.role)}</p>
                </div>
                <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
              </Button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="profile-menu absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-threat-modal z-50">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <p className="text-xs text-accent font-medium">{getRoleDisplayName(user?.role)}</p>
                  </div>
                  <div className="py-1">
                    <button className="flex items-center w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth">
                      <Icon name="User" size={16} className="mr-2" />
                      Profile Settings
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth">
                      <Icon name="Settings" size={16} className="mr-2" />
                      Preferences
                    </button>
                    <div className="border-t border-border my-1" />
                    <button 
                      onClick={onLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-error hover:bg-error/10 transition-smooth"
                    >
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
            
            {/* Mobile Search */}
            <div className="px-3 py-3">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Search CVE, IOCs..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;