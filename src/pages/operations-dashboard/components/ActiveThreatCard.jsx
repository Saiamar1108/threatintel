import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveThreatCard = ({ threat, onAcknowledge, onEscalate, onAssignTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(new Set());

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'high': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const handleTaskToggle = (taskId) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted?.has(taskId)) {
      newCompleted?.delete(taskId);
    } else {
      newCompleted?.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const completionPercentage = threat?.mitigationTasks ? 
    Math.round((completedTasks?.size / threat?.mitigationTasks?.length) * 100) : 0;

  return (
    <div className="bg-card border border-border rounded-lg shadow-threat-card hover:shadow-threat-elevated transition-smooth">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${getSeverityColor(threat?.severity)}`}>
              <Icon name={getSeverityIcon(threat?.severity)} size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {threat?.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {threat?.description}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>Detected: {threat?.detectedAt}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Target" size={12} />
                  <span>Affected: {threat?.affectedSystems} systems</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(threat?.severity)}`}>
              {threat?.severity?.toUpperCase()}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {threat?.mitigationTasks && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">
                Mitigation Progress
              </span>
              <span className="text-xs font-medium text-foreground">
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 mb-3">
          <Button
            variant={threat?.acknowledged ? "secondary" : "default"}
            size="sm"
            onClick={() => onAcknowledge(threat?.id)}
            iconName={threat?.acknowledged ? "Check" : "Eye"}
            iconPosition="left"
          >
            {threat?.acknowledged ? "Acknowledged" : "Acknowledge"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEscalate(threat?.id)}
            iconName="ArrowUp"
            iconPosition="left"
          >
            Escalate
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAssignTask(threat?.id)}
            iconName="UserPlus"
            iconPosition="left"
          >
            Assign
          </Button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-border pt-4">
            {/* Threat Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Threat Intelligence</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CVE ID:</span>
                    <span className="text-foreground font-mono">{threat?.cveId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CVSS Score:</span>
                    <span className="text-foreground font-semibold">{threat?.cvssScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Attack Vector:</span>
                    <span className="text-foreground">{threat?.attackVector}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Response Team</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned To:</span>
                    <span className="text-foreground">{threat?.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority:</span>
                    <span className="text-foreground">{threat?.priority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ETA:</span>
                    <span className="text-foreground">{threat?.eta}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mitigation Checklist */}
            {threat?.mitigationTasks && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Mitigation Checklist</h4>
                <div className="space-y-2">
                  {threat?.mitigationTasks?.map((task, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2 rounded-md hover:bg-muted transition-smooth">
                      <button
                        onClick={() => handleTaskToggle(index)}
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth ${
                          completedTasks?.has(index)
                            ? 'bg-accent border-accent text-white' :'border-border hover:border-accent'
                        }`}
                      >
                        {completedTasks?.has(index) && (
                          <Icon name="Check" size={12} />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm ${
                          completedTasks?.has(index) 
                            ? 'text-muted-foreground line-through' 
                            : 'text-foreground'
                        }`}>
                          {task?.description}
                        </p>
                        {task?.priority && (
                          <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                            task?.priority === 'high' ? 'bg-red-100 text-red-700' :
                            task?.priority === 'medium'? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {task?.priority} priority
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveThreatCard;