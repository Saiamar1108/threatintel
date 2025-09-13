import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const [recentSearches, setRecentSearches] = useState([
    'CVE-2024-8956',
    'APT29 campaign',
    'Cobalt Strike',
    'Log4j vulnerability'
  ]);

  const quickActions = [
    {
      id: 'investigate',
      label: 'New Investigation',
      description: 'Start threat analysis workflow',
      icon: 'Search',
      color: 'bg-primary',
      shortcut: 'Ctrl+N'
    },
    {
      id: 'report',
      label: 'Generate Report',
      description: 'Create threat intelligence report',
      icon: 'FileText',
      color: 'bg-accent',
      shortcut: 'Ctrl+R'
    },
    {
      id: 'collaborate',
      label: 'Share Findings',
      description: 'Collaborate with ops team',
      icon: 'Share2',
      color: 'bg-success',
      shortcut: 'Ctrl+S'
    },
    {
      id: 'bookmark',
      label: 'Saved Views',
      description: 'Access bookmarked analyses',
      icon: 'Bookmark',
      color: 'bg-warning',
      shortcut: 'Ctrl+B'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Analyzed CVE-2024-8956',
      timestamp: '2 minutes ago',
      status: 'completed',
      icon: 'CheckCircle'
    },
    {
      id: 2,
      action: 'Shared APT29 findings',
      timestamp: '15 minutes ago',
      status: 'shared',
      icon: 'Share'
    },
    {
      id: 3,
      action: 'Generated weekly report',
      timestamp: '1 hour ago',
      status: 'generated',
      icon: 'FileText'
    },
    {
      id: 4,
      action: 'Bookmarked Cobalt Strike analysis',
      timestamp: '2 hours ago',
      status: 'bookmarked',
      icon: 'Bookmark'
    }
  ];

  const handleQuickSearch = (searchTerm) => {
    onActionClick('search', { term: searchTerm });
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <Button variant="ghost" size="icon" iconName="MoreHorizontal" />
        </div>
        <div className="grid grid-cols-1 gap-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => onActionClick(action?.id)}
              className="flex items-start space-x-4 p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-smooth text-left group w-full"
            >
              <div className={`flex items-center justify-center w-10 h-10 ${action?.color} rounded-lg text-white group-hover:scale-105 transition-transform`}>
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">{action?.label}</h4>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {action?.shortcut}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{action?.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Searches */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Searches</h3>
          <Button variant="ghost" size="sm" iconName="History">
            View All
          </Button>
        </div>
        <div className="space-y-2">
          {recentSearches?.map((search, index) => (
            <button
              key={index}
              onClick={() => handleQuickSearch(search)}
              className="flex items-center justify-between w-full p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-smooth text-left group"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{search}</span>
              </div>
              <Icon name="ArrowRight" size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
      {/* Recent Activities */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
          <Button variant="ghost" size="sm" iconName="Activity">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {recentActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full">
                <Icon name={activity?.icon} size={14} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity?.action}</p>
                <p className="text-xs text-muted-foreground">{activity?.timestamp}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                activity?.status === 'completed' ? 'bg-success' :
                activity?.status === 'shared' ? 'bg-accent' :
                activity?.status === 'generated'? 'bg-primary' : 'bg-warning'
              }`} />
            </div>
          ))}
        </div>
      </div>
      {/* Collaboration Panel */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Team Collaboration</h3>
          <Button variant="ghost" size="icon" iconName="Users" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">Shared APT analysis</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Review
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">SM</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Sarah Miller</p>
                <p className="text-xs text-muted-foreground">Requested collaboration</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Join
            </Button>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" className="w-full" iconName="Plus">
            Start New Collaboration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;