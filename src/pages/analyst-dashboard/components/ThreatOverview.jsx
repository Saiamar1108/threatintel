import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatOverview = () => {
  const overviewStats = [
    {
      label: 'Active Threats',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: 'Shield',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      label: 'Critical CVEs',
      value: '23',
      change: '+3',
      trend: 'up',
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      label: 'IOCs Detected',
      value: '456',
      change: '+8%',
      trend: 'up',
      icon: 'Target',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Mitigated',
      value: '89%',
      change: '+5%',
      trend: 'up',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      title: 'CVE-2024-8956 - Critical RCE in Apache Struts',
      severity: 'critical',
      timestamp: '2 minutes ago',
      source: 'NVD',
      status: 'investigating'
    },
    {
      id: 2,
      title: 'APT29 Campaign Targeting Financial Sector',
      severity: 'high',
      timestamp: '15 minutes ago',
      source: 'OSINT',
      status: 'analyzing'
    },
    {
      id: 3,
      title: 'Cobalt Strike Beacon Activity Detected',
      severity: 'high',
      timestamp: '32 minutes ago',
      source: 'Commercial',
      status: 'confirmed'
    },
    {
      id: 4,
      title: 'Phishing Campaign Using COVID-19 Lures',
      severity: 'medium',
      timestamp: '1 hour ago',
      source: 'Community',
      status: 'monitoring'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'analyzing': return 'bg-purple-100 text-purple-800';
      case 'confirmed': return 'bg-red-100 text-red-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className={`flex items-center justify-center w-12 h-12 ${stat?.bgColor} rounded-lg`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                stat?.trend === 'up' ? 'text-success' : 'text-error'
              }`}>
                <Icon name={stat?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                <span>{stat?.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-foreground">{stat?.value}</h3>
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Recent Threat Alerts */}
      <div className="bg-card border border-border rounded-lg">
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Recent Threat Alerts</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Filter">
                Filter
              </Button>
              <Button variant="outline" size="sm" iconName="RefreshCw">
                Refresh
              </Button>
            </div>
          </div>
        </div>
        <div className="divide-y divide-border">
          {recentAlerts?.map((alert) => (
            <div key={alert?.id} className="p-6 hover:bg-muted/30 transition-smooth">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {alert?.title}
                    </h4>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert?.severity)}`}>
                      {alert?.severity?.toUpperCase()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{alert?.timestamp}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Database" size={12} />
                      <span>{alert?.source}</span>
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(alert?.status)}`}>
                      {alert?.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="icon" iconName="Eye" />
                  <Button variant="ghost" size="icon" iconName="BookmarkPlus" />
                  <Button variant="ghost" size="icon" iconName="Share" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-border bg-muted/30">
          <Button variant="outline" className="w-full">
            View All Alerts
          </Button>
        </div>
      </div>
      {/* Intelligence Sources */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Intelligence Sources</h3>
          <Button variant="ghost" size="icon" iconName="Settings" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'NVD', status: 'active', feeds: 234, icon: 'Database' },
            { name: 'MITRE ATT&CK', status: 'active', feeds: 156, icon: 'Shield' },
            { name: 'Commercial Feeds', status: 'active', feeds: 89, icon: 'Building' },
            { name: 'OSINT', status: 'syncing', feeds: 345, icon: 'Globe' }
          ]?.map((source, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name={source?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{source?.name}</p>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    source?.status === 'active' ? 'bg-success' : 'bg-warning'
                  }`} />
                  <span className="text-xs text-muted-foreground">{source?.feeds} feeds</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreatOverview;