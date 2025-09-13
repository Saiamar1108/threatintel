import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BriefingCard = ({ briefing, userRole, onShare, onEscalate }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'high': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRoleSpecificContent = () => {
    switch (userRole) {
      case 'leadership':
        return briefing?.strategicSummary;
      case 'analyst':
        return briefing?.technicalDetails;
      case 'operations':
        return briefing?.actionableItems;
      default:
        return briefing?.summary;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card hover:shadow-threat-elevated transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{briefing?.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(briefing?.severity)}`}>
              {briefing?.severity?.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{briefing?.timestamp}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Target" size={14} />
              <span>{briefing?.affectedSectors?.join(', ')}</span>
            </span>
            <span className={`flex items-center space-x-1 ${getConfidenceColor(briefing?.confidence)}`}>
              <Icon name="Brain" size={14} />
              <span>{briefing?.confidence}% confidence</span>
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onShare(briefing?.id)}
          >
            <Icon name="Share2" size={16} />
          </Button>
          {briefing?.severity === 'critical' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEscalate(briefing?.id)}
              className="text-error border-error hover:bg-error/10"
            >
              <Icon name="AlertTriangle" size={14} className="mr-1" />
              Escalate
            </Button>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Key Findings</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {getRoleSpecificContent()}
          </p>
        </div>

        {/* Emerging Threats */}
        {briefing?.emergingThreats && briefing?.emergingThreats?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Emerging Threats</h4>
            <div className="space-y-2">
              {briefing?.emergingThreats?.map((threat, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <Icon name="AlertCircle" size={14} className="text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{threat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {briefing?.recommendations && briefing?.recommendations?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Priority Recommendations</h4>
            <div className="space-y-2">
              {briefing?.recommendations?.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metrics */}
        {briefing?.metrics && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{briefing?.metrics?.threatsDetected}</div>
              <div className="text-xs text-muted-foreground">Threats Detected</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{briefing?.metrics?.incidentsResolved}</div>
              <div className="text-xs text-muted-foreground">Incidents Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{briefing?.metrics?.riskReduction}%</div>
              <div className="text-xs text-muted-foreground">Risk Reduction</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BriefingCard;