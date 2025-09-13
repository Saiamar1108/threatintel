import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemStatusIndicators = ({ systems = [], onSystemAction }) => {
  const [selectedSystem, setSelectedSystem] = useState(null);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'operational':
        return {
          color: 'bg-green-500',
          textColor: 'text-green-800',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: 'CheckCircle',
          label: 'Operational'
        };
      case 'warning':
        return {
          color: 'bg-yellow-500',
          textColor: 'text-yellow-800',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: 'AlertTriangle',
          label: 'Warning'
        };
      case 'critical':
        return {
          color: 'bg-red-500',
          textColor: 'text-red-800',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: 'XCircle',
          label: 'Critical'
        };
      case 'maintenance':
        return {
          color: 'bg-blue-500',
          textColor: 'text-blue-800',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: 'Settings',
          label: 'Maintenance'
        };
      default:
        return {
          color: 'bg-gray-500',
          textColor: 'text-gray-800',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: 'Circle',
          label: 'Unknown'
        };
    }
  };

  const getProtectionLevel = (level) => {
    switch (level) {
      case 'maximum': return { color: 'text-green-600', icon: 'Shield' };
      case 'high': return { color: 'text-blue-600', icon: 'Shield' };
      case 'medium': return { color: 'text-yellow-600', icon: 'ShieldAlert' };
      case 'low': return { color: 'text-orange-600', icon: 'ShieldAlert' };
      case 'minimal': return { color: 'text-red-600', icon: 'ShieldX' };
      default: return { color: 'text-gray-600', icon: 'Shield' };
    }
  };

  const overallStatus = systems?.length > 0 ? 
    systems?.some(s => s?.status === 'critical') ? 'critical' :
    systems?.some(s => s?.status === 'warning') ? 'warning' :
    'operational' : 'unknown';

  const overallConfig = getStatusConfig(overallStatus);

  return (
    <div className="bg-card border border-border rounded-lg shadow-threat-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">System Status</h3>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border ${overallConfig?.bgColor} ${overallConfig?.borderColor}`}>
              <div className={`w-2 h-2 rounded-full ${overallConfig?.color}`} />
              <span className={`text-xs font-medium ${overallConfig?.textColor}`}>
                {overallConfig?.label}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
      </div>
      <div className="p-4">
        {/* Overall System Health */}
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-foreground">Overall System Health</h4>
            <span className="text-sm text-muted-foreground">
              {systems?.filter(s => s?.status === 'operational')?.length}/{systems?.length} systems operational
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {systems?.filter(s => s?.status === 'operational')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Operational</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">
                {systems?.filter(s => s?.status === 'warning')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Warning</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">
                {systems?.filter(s => s?.status === 'critical')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Critical</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">
                {systems?.filter(s => s?.status === 'maintenance')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Maintenance</div>
            </div>
          </div>
        </div>

        {/* Individual System Status */}
        <div className="space-y-3">
          {systems?.map((system) => {
            const config = getStatusConfig(system?.status);
            const protection = getProtectionLevel(system?.protectionLevel);
            
            return (
              <div
                key={system?.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
                onClick={() => setSelectedSystem(system)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${config?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={config?.icon} size={16} className="text-white" />
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-semibold text-foreground">{system?.name}</h5>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{system?.type}</span>
                      <span>•</span>
                      <span>Uptime: {system?.uptime}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Icon name={protection?.icon} size={10} className={protection?.color} />
                        <span className={protection?.color}>{system?.protectionLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Performance Metrics */}
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {system?.performance}%
                    </div>
                    <div className="text-xs text-muted-foreground">Performance</div>
                  </div>
                  
                  {/* Status Badge */}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${config?.bgColor} ${config?.borderColor} ${config?.textColor}`}>
                    {config?.label}
                  </span>
                  
                  {/* Action Button */}
                  {system?.status === 'critical' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onSystemAction(system?.id, 'emergency-response');
                      }}
                    >
                      Respond
                    </Button>
                  )}
                  {system?.status === 'warning' && (
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onSystemAction(system?.id, 'investigate');
                      }}
                    >
                      Investigate
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSystemAction('all', 'security-scan')}
              iconName="Search"
              iconPosition="left"
            >
              Security Scan
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSystemAction('all', 'update-protection')}
              iconName="Shield"
              iconPosition="left"
            >
              Update Protection
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSystemAction('all', 'backup')}
              iconName="Database"
              iconPosition="left"
            >
              Backup Systems
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSystemAction('all', 'maintenance')}
              iconName="Settings"
              iconPosition="left"
            >
              Maintenance
            </Button>
          </div>
        </div>
      </div>
      {/* System Details Modal */}
      {selectedSystem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-threat-modal max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {selectedSystem?.name} Details
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedSystem(null)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">System Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusConfig(selectedSystem?.status)?.bgColor} ${getStatusConfig(selectedSystem?.status)?.borderColor} ${getStatusConfig(selectedSystem?.status)?.textColor}`}>
                          {getStatusConfig(selectedSystem?.status)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="text-foreground">{selectedSystem?.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uptime:</span>
                        <span className="text-foreground">{selectedSystem?.uptime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Check:</span>
                        <span className="text-foreground">{selectedSystem?.lastCheck}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Performance:</span>
                        <span className="text-foreground font-semibold">{selectedSystem?.performance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CPU Usage:</span>
                        <span className="text-foreground">{selectedSystem?.cpuUsage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Memory Usage:</span>
                        <span className="text-foreground">{selectedSystem?.memoryUsage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Protection Level:</span>
                        <span className={`font-medium ${getProtectionLevel(selectedSystem?.protectionLevel)?.color}`}>
                          {selectedSystem?.protectionLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedSystem?.alerts && selectedSystem?.alerts?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Recent Alerts</h4>
                    <div className="space-y-2">
                      {selectedSystem?.alerts?.map((alert, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded">
                          <Icon name="AlertCircle" size={16} className="text-warning" />
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{alert?.message}</p>
                            <p className="text-xs text-muted-foreground">{alert?.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setSelectedSystem(null)}
                >
                  Close
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    onSystemAction(selectedSystem?.id, 'detailed-scan');
                    setSelectedSystem(null);
                  }}
                >
                  Run Detailed Scan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemStatusIndicators;