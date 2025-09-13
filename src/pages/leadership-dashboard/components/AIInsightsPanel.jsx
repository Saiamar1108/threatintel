import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightsPanel = ({ insights }) => {
  const [expandedInsight, setExpandedInsight] = useState(null);

  const getInsightIcon = (type) => {
    switch (type) {
      case 'prediction': return 'Brain';
      case 'recommendation': return 'Lightbulb';
      case 'alert': return 'AlertTriangle';
      case 'analysis': return 'BarChart3';
      default: return 'Zap';
    }
  };

  const getInsightColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const toggleExpansion = (index) => {
    setExpandedInsight(expandedInsight === index ? null : index);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Brain" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI-Powered Insights</h3>
            <p className="text-sm text-muted-foreground">Strategic recommendations and predictions</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
          <span className="text-xs text-muted-foreground">Live Analysis</span>
        </div>
      </div>
      <div className="space-y-4">
        {insights?.map((insight, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden hover:shadow-threat-elevated transition-smooth">
            <div className="p-4">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg border ${getInsightColor(insight?.priority)}`}>
                  <Icon name={getInsightIcon(insight?.type)} size={18} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-foreground">{insight?.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getInsightColor(insight?.priority)}`}>
                        {insight?.priority?.toUpperCase()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpansion(index)}
                        className="p-1"
                      >
                        <Icon 
                          name={expandedInsight === index ? "ChevronUp" : "ChevronDown"} 
                          size={16} 
                        />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {insight?.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Target" size={12} />
                        <span>{insight?.confidence}% confidence</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{insight?.timeframe}</span>
                      </span>
                    </div>
                    
                    {insight?.actionable && (
                      <Button variant="outline" size="sm" className="text-xs">
                        Take Action
                        <Icon name="ArrowRight" size={12} className="ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedInsight === index && (
              <div className="border-t border-border bg-muted/30 p-4">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Detailed Analysis</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {insight?.detailedAnalysis}
                    </p>
                  </div>
                  
                  {insight?.recommendations && (
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Recommended Actions</h5>
                      <ul className="space-y-1">
                        {insight?.recommendations?.map((rec, recIndex) => (
                          <li key={recIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {insight?.metrics && (
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Key Metrics</h5>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(insight?.metrics)?.map(([key, value]) => (
                          <div key={key} className="text-center p-2 bg-card rounded border border-border">
                            <p className="text-lg font-bold text-foreground">{value}</p>
                            <p className="text-xs text-muted-foreground capitalize">{key?.replace(/([A-Z])/g, ' $1')?.trim()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            AI analysis updated 2 minutes ago
          </div>
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;