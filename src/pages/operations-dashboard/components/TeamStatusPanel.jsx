import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TeamStatusPanel = ({ teams = [], onAssignTask, onUpdateAvailability }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'busy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'busy': return 'Clock';
      case 'offline': return 'XCircle';
      case 'emergency': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const getWorkloadColor = (workload) => {
    if (workload >= 80) return 'text-red-600';
    if (workload >= 60) return 'text-orange-600';
    if (workload >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-threat-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Response Teams</h3>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              {teams?.filter(t => t?.status === 'available')?.length} available
            </span>
          </div>
          <Button variant="outline" size="sm" iconName="UserPlus" iconPosition="left">
            Add Team
          </Button>
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {teams?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No teams configured</p>
            <p className="text-sm text-muted-foreground mt-1">Add response teams to manage incidents</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {teams?.map((team) => (
              <div
                key={team?.id}
                className="p-4 hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="relative">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name="Shield" size={20} className="text-accent" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        team?.status === 'available' ? 'bg-green-500' :
                        team?.status === 'busy' ? 'bg-yellow-500' :
                        team?.status === 'emergency'? 'bg-red-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-semibold text-foreground">
                          {team?.name}
                        </h4>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(team?.status)}`}>
                          {team?.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {team?.specialization} • {team?.members?.length} members
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{team?.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>Response: {team?.responseTime}</span>
                        </span>
                      </div>
                      
                      {/* Workload Bar */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">Workload:</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              team?.workload >= 80 ? 'bg-red-500' :
                              team?.workload >= 60 ? 'bg-orange-500' :
                              team?.workload >= 40 ? 'bg-yellow-500': 'bg-green-500'
                            }`}
                            style={{ width: `${team?.workload}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${getWorkloadColor(team?.workload)}`}>
                          {team?.workload}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedTeam(team)}
                      title="View Details"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    {team?.status === 'available' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAssignTask(team?.id)}
                        iconName="Plus"
                      >
                        Assign
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Current Tasks */}
                {team?.currentTasks && team?.currentTasks?.length > 0 && (
                  <div className="mt-3 ml-13">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-1">Current Tasks:</h5>
                    <div className="space-y-1">
                      {team?.currentTasks?.slice(0, 2)?.map((task, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <div className={`w-2 h-2 rounded-full ${
                            task?.priority === 'high' ? 'bg-red-500' :
                            task?.priority === 'medium'? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <span className="text-muted-foreground truncate">{task?.title}</span>
                        </div>
                      ))}
                      {team?.currentTasks?.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{team?.currentTasks?.length - 2} more tasks
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Team Details Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-threat-modal max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {selectedTeam?.name} Details
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedTeam(null)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Team Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(selectedTeam?.status)}`}>
                          {selectedTeam?.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Specialization:</span>
                        <span className="text-foreground">{selectedTeam?.specialization}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="text-foreground">{selectedTeam?.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Response Time:</span>
                        <span className="text-foreground">{selectedTeam?.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Workload:</span>
                        <span className={`font-medium ${getWorkloadColor(selectedTeam?.workload)}`}>
                          {selectedTeam?.workload}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Success Rate:</span>
                        <span className="text-foreground">{selectedTeam?.successRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Resolution:</span>
                        <span className="text-foreground">{selectedTeam?.avgResolution}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Team Members</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedTeam?.members?.map((member, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {member?.name?.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{member?.name}</p>
                          <p className="text-xs text-muted-foreground">{member?.role}</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          member?.status === 'available' ? 'bg-green-500' :
                          member?.status === 'busy'? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedTeam?.currentTasks && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Current Tasks</h4>
                    <div className="space-y-2">
                      {selectedTeam?.currentTasks?.map((task, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded">
                          <div className={`w-2 h-2 rounded-full ${
                            task?.priority === 'high' ? 'bg-red-500' :
                            task?.priority === 'medium'? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{task?.title}</p>
                            <p className="text-xs text-muted-foreground">
                              Assigned: {task?.assignedAt} • ETA: {task?.eta}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">{task?.progress}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setSelectedTeam(null)}
                >
                  Close
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    onAssignTask(selectedTeam?.id);
                    setSelectedTeam(null);
                  }}
                >
                  Assign Task
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamStatusPanel;