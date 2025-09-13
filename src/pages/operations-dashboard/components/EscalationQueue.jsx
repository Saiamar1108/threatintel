import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EscalationQueue = ({ escalations = [], onUpdateStatus, onAssignTeam }) => {
  const [selectedEscalation, setSelectedEscalation] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'escalated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'ArrowUp';
      case 'medium': return 'Minus';
      case 'low': return 'ArrowDown';
      default: return 'Minus';
    }
  };

  const getTimeUrgency = (timestamp) => {
    const now = new Date();
    const escalationTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - escalationTime) / (1000 * 60));
    
    if (diffMinutes < 60) return { text: `${diffMinutes}m ago`, urgent: diffMinutes > 30 };
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return { text: `${diffHours}h ago`, urgent: diffHours > 4 };
    const diffDays = Math.floor(diffHours / 24);
    return { text: `${diffDays}d ago`, urgent: diffDays > 1 };
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-threat-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUp" size={20} className="text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Escalation Queue</h3>
            <span className="px-2 py-1 text-xs font-medium bg-warning/20 text-warning rounded-full">
              {escalations?.filter(e => e?.status === 'pending')?.length} pending
            </span>
          </div>
          <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
            Filter
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {escalations?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No escalations in queue</p>
            <p className="text-sm text-muted-foreground mt-1">All threats are being handled at current levels</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {escalations?.map((escalation) => {
              const timeInfo = getTimeUrgency(escalation?.escalatedAt);
              return (
                <div
                  key={escalation?.id}
                  className="p-4 hover:bg-muted/50 transition-smooth cursor-pointer"
                  onClick={() => setSelectedEscalation(escalation)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        escalation?.priority === 'critical' ? 'bg-red-100 text-red-600' :
                        escalation?.priority === 'high' ? 'bg-orange-100 text-orange-600' :
                        escalation?.priority === 'medium'? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                      }`}>
                        <Icon name={getPriorityIcon(escalation?.priority)} size={16} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-semibold text-foreground truncate">
                            {escalation?.threatTitle}
                          </h4>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(escalation?.status)}`}>
                            {escalation?.status?.replace('-', ' ')}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {escalation?.reason}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Icon name="User" size={12} />
                            <span>From: {escalation?.escalatedBy}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Users" size={12} />
                            <span>To: {escalation?.escalatedTo}</span>
                          </span>
                          <span className={`flex items-center space-x-1 ${timeInfo?.urgent ? 'text-red-600 font-medium' : ''}`}>
                            <Icon name="Clock" size={12} />
                            <span>{timeInfo?.text}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {escalation?.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e?.stopPropagation();
                              onAssignTeam(escalation?.id);
                            }}
                            iconName="UserPlus"
                          />
                          <Button
                            variant="default"
                            size="sm"
                            onClick={(e) => {
                              e?.stopPropagation();
                              onUpdateStatus(escalation?.id, 'in-progress');
                            }}
                          >
                            Accept
                          </Button>
                        </>
                      )}
                      {escalation?.status === 'in-progress' && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={(e) => {
                            e?.stopPropagation();
                            onUpdateStatus(escalation?.id, 'resolved');
                          }}
                          iconName="Check"
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                  {/* Progress Timeline */}
                  {escalation?.timeline && (
                    <div className="mt-3 ml-11">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {escalation?.timeline?.map((step, index) => (
                            <React.Fragment key={index}>
                              <div className={`w-2 h-2 rounded-full ${
                                step?.completed ? 'bg-accent' : 'bg-muted-foreground/30'
                              }`} />
                              {index < escalation?.timeline?.length - 1 && (
                                <div className={`w-4 h-0.5 ${
                                  step?.completed ? 'bg-accent' : 'bg-muted-foreground/30'
                                }`} />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {escalation?.timeline?.filter(s => s?.completed)?.length}/{escalation?.timeline?.length} steps
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Selected Escalation Details Modal */}
      {selectedEscalation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-threat-modal max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Escalation Details
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedEscalation(null)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Threat Information</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="font-medium text-foreground">{selectedEscalation?.threatTitle}</p>
                    <p className="text-sm text-muted-foreground mt-1">{selectedEscalation?.threatDescription}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Escalation Reason</h4>
                  <p className="text-sm text-muted-foreground">{selectedEscalation?.reason}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Escalation Path</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">From:</span>
                        <span className="text-foreground">{selectedEscalation?.escalatedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">To:</span>
                        <span className="text-foreground">{selectedEscalation?.escalatedTo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Priority:</span>
                        <span className={`font-medium ${
                          selectedEscalation?.priority === 'critical' ? 'text-red-600' :
                          selectedEscalation?.priority === 'high'? 'text-orange-600' : 'text-yellow-600'
                        }`}>
                          {selectedEscalation?.priority?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Escalated:</span>
                        <span className="text-foreground">{selectedEscalation?.escalatedAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SLA:</span>
                        <span className="text-foreground">{selectedEscalation?.sla}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(selectedEscalation?.status)}`}>
                          {selectedEscalation?.status?.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedEscalation?.attachments && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {selectedEscalation?.attachments?.map((attachment, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded">
                          <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                          <span className="text-sm text-foreground">{attachment?.name}</span>
                          <span className="text-xs text-muted-foreground">({attachment?.size})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setSelectedEscalation(null)}
                >
                  Close
                </Button>
                {selectedEscalation?.status === 'pending' && (
                  <Button
                    variant="default"
                    onClick={() => {
                      onUpdateStatus(selectedEscalation?.id, 'in-progress');
                      setSelectedEscalation(null);
                    }}
                  >
                    Accept Escalation
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EscalationQueue;