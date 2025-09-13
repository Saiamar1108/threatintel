import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalizedInsights = ({ userRole, insights, onViewDetails, onScheduleAnalysis }) => {
  const getRoleIcon = () => {
    switch (userRole) {
      case 'leadership': return 'Crown';
      case 'analyst': return 'Search';
      case 'operations': return 'Settings';
      default: return 'User';
    }
  };

  const getRoleTitle = () => {
    switch (userRole) {
      case 'leadership': return 'Strategic Overview';
      case 'analyst': return 'Technical Analysis';
      case 'operations': return 'Operational Actions';
      default: return 'General Insights';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-error bg-red-50 border-red-200';
      case 'high': return 'text-warning bg-orange-50 border-orange-200';
      case 'medium': return 'text-accent bg-blue-50 border-blue-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getActionIcon = (actionType) => {
    switch (actionType) {
      case 'investigate': return 'Search';
      case 'escalate': return 'AlertTriangle';
      case 'monitor': return 'Eye';
      case 'implement': return 'Settings';
      case 'review': return 'FileText';
      default: return 'ArrowRight';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name={getRoleIcon()} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{getRoleTitle()}</h3>
            <p className="text-sm text-muted-foreground">
              Personalized insights for {userRole} role
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onScheduleAnalysis}
        >
          <Icon name="Calendar" size={14} className="mr-1" />
          Schedule Analysis
        </Button>
      </div>
      <div className="space-y-4">
        {/* Priority Insights */}
        {insights?.priority && insights?.priority?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Icon name="Star" size={16} className="mr-2 text-warning" />
              Priority Items
            </h4>
            <div className="space-y-3">
              {insights?.priority?.map((item, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(item?.priority)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium">{item?.title}</span>
                        <span className="px-2 py-1 text-xs font-medium bg-white/50 rounded-full">
                          {item?.priority?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm opacity-90 mb-3">{item?.description}</p>
                      {item?.actions && item?.actions?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item?.actions?.map((action, actionIndex) => (
                            <Button
                              key={actionIndex}
                              variant="ghost"
                              size="sm"
                              onClick={() => onViewDetails(action?.id)}
                              className="h-8 px-3 text-xs"
                            >
                              <Icon name={getActionIcon(action?.type)} size={12} className="mr-1" />
                              {action?.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {insights?.recommendations && insights?.recommendations?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
              AI Recommendations
            </h4>
            <div className="space-y-3">
              {insights?.recommendations?.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  <Icon name="Brain" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground mb-1">{rec?.text}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Confidence: {rec?.confidence}%
                      </span>
                      {rec?.actionable && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewDetails(rec?.id)}
                          className="h-6 px-2 text-xs"
                        >
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Metrics */}
        {insights?.metrics && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Icon name="BarChart3" size={16} className="mr-2 text-success" />
              Key Metrics
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(insights?.metrics)?.map(([key, value], index) => (
                <div key={index} className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-lg font-semibold text-foreground">{value?.value}</div>
                  <div className="text-xs text-muted-foreground">{value?.label}</div>
                  {value?.trend && (
                    <div className={`flex items-center justify-center mt-1 text-xs ${
                      value?.trend === 'up' ? 'text-success' : 
                      value?.trend === 'down' ? 'text-error' : 'text-muted-foreground'
                    }`}>
                      <Icon 
                        name={value?.trend === 'up' ? 'TrendingUp' : value?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                        size={12} 
                        className="mr-1" 
                      />
                      {value?.change}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activities */}
        {insights?.recentActivities && insights?.recentActivities?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Icon name="Activity" size={16} className="mr-2 text-muted-foreground" />
              Recent Activities
            </h4>
            <div className="space-y-2">
              {insights?.recentActivities?.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-smooth">
                  <Icon name="Clock" size={14} className="text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{activity?.description}</p>
                    <p className="text-xs text-muted-foreground">{activity?.timestamp}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(activity?.id)}
                    className="h-6 px-2 text-xs flex-shrink-0"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedInsights;