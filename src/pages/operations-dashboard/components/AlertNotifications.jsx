import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertNotifications = ({ alerts = [], onDismiss, onViewDetails }) => {
  const [visibleAlerts, setVisibleAlerts] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Filter critical and high priority alerts for notifications
    const criticalAlerts = alerts?.filter(alert => 
      ['critical', 'high']?.includes(alert?.severity) && !alert?.dismissed
    );
    setVisibleAlerts(criticalAlerts?.slice(0, 5)); // Show max 5 alerts
  }, [alerts]);

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'bg-red-500',
          textColor: 'text-red-800',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: 'AlertTriangle',
          pulse: true
        };
      case 'high':
        return {
          color: 'bg-orange-500',
          textColor: 'text-orange-800',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          icon: 'AlertCircle',
          pulse: false
        };
      case 'medium':
        return {
          color: 'bg-yellow-500',
          textColor: 'text-yellow-800',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: 'Info',
          pulse: false
        };
      default:
        return {
          color: 'bg-blue-500',
          textColor: 'text-blue-800',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: 'Info',
          pulse: false
        };
    }
  };

  const handleDismiss = (alertId) => {
    setVisibleAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
    onDismiss(alertId);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  if (visibleAlerts?.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-40 space-y-2 max-w-sm">
      {/* Sound Toggle */}
      <div className="flex justify-end mb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="bg-card border border-border shadow-sm"
        >
          <Icon name={soundEnabled ? "Volume2" : "VolumeX"} size={16} />
        </Button>
      </div>
      {/* Alert Notifications */}
      {visibleAlerts?.map((alert) => {
        const config = getSeverityConfig(alert?.severity);
        return (
          <div
            key={alert?.id}
            className={`${config?.bgColor} ${config?.borderColor} border rounded-lg shadow-threat-elevated p-4 animate-in slide-in-from-right duration-300`}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-8 h-8 ${config?.color} rounded-full flex items-center justify-center ${config?.pulse ? 'animate-pulse-slow' : ''}`}>
                <Icon name={config?.icon} size={16} className="text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`text-sm font-semibold ${config?.textColor} mb-1`}>
                      {alert?.severity === 'critical' ? 'CRITICAL ALERT' : 'HIGH PRIORITY ALERT'}
                    </h4>
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                      {alert?.title}
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      {alert?.description}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDismiss(alert?.id)}
                    className="flex-shrink-0 ml-2 h-6 w-6"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Icon name="Clock" size={10} />
                    <span>{getTimeAgo(alert?.timestamp)}</span>
                    {alert?.source && (
                      <>
                        <span>•</span>
                        <span>{alert?.source}</span>
                      </>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(alert?.id)}
                    className="text-xs h-6 px-2"
                  >
                    View
                  </Button>
                </div>
                
                {/* Progress indicator for ongoing incidents */}
                {alert?.progress !== undefined && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Response Progress</span>
                      <span className="text-xs font-medium text-gray-700">{alert?.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className={`${config?.color} h-1 rounded-full transition-all duration-300`}
                        style={{ width: `${alert?.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Action Buttons for Critical Alerts */}
            {alert?.severity === 'critical' && (
              <div className="mt-3 flex space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onViewDetails(alert?.id)}
                  className="flex-1 text-xs"
                >
                  Respond Now
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDismiss(alert?.id)}
                  className="text-xs"
                >
                  Acknowledge
                </Button>
              </div>
            )}
          </div>
        );
      })}
      {/* Summary if more alerts exist */}
      {alerts?.filter(a => ['critical', 'high']?.includes(a?.severity) && !a?.dismissed)?.length > 5 && (
        <div className="bg-card border border-border rounded-lg shadow-threat-card p-3 text-center">
          <p className="text-sm text-muted-foreground">
            +{alerts?.filter(a => ['critical', 'high']?.includes(a?.severity) && !a?.dismissed)?.length - 5} more alerts
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails('all')}
            className="text-xs mt-1"
          >
            View All Alerts
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlertNotifications;