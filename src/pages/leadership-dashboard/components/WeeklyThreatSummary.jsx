import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeeklyThreatSummary = ({ summaries }) => {
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Critical': return 'AlertTriangle';
      case 'High': return 'AlertCircle';
      case 'Medium': return 'Info';
      case 'Low': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Weekly Threat Summary</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Sep 3 - Sep 10, 2025</span>
        </div>
      </div>
      <div className="space-y-4">
        {summaries?.map((summary, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:shadow-threat-elevated transition-smooth">
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg border ${getSeverityColor(summary?.severity)}`}>
                <Icon name={getSeverityIcon(summary?.severity)} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-foreground">{summary?.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(summary?.severity)}`}>
                    {summary?.severity}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {summary?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Target" size={12} />
                      <span>{summary?.affectedSystems} systems</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{summary?.detectionTime}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Shield" size={12} />
                      <span>{summary?.mitigationStatus}</span>
                    </span>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details
                    <Icon name="ChevronRight" size={12} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {summaries?.length} of {summaries?.length} threat summaries
          </div>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyThreatSummary;