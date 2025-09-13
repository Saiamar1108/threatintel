import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedThreats = ({ relatedThreats, onThreatClick }) => {
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Link" size={20} className="mr-2" />
        Related Threats & Campaigns
      </h2>
      <div className="space-y-4">
        {relatedThreats?.map((threat, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-foreground">{threat?.cveId}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(threat?.severity)}`}>
                    {threat?.severity}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {threat?.similarity}% Similar
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {threat?.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Calendar" size={12} className="mr-1" />
                    {threat?.publishedDate}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Target" size={12} className="mr-1" />
                    CVSS {threat?.cvssScore}
                  </span>
                  {threat?.exploitAvailable && (
                    <span className="flex items-center text-red-600">
                      <Icon name="AlertTriangle" size={12} className="mr-1" />
                      Exploit Available
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowRight"
                onClick={() => onThreatClick(threat?.id)}
              >
                View
              </Button>
            </div>
            
            {/* Correlation Tags */}
            <div className="flex flex-wrap gap-2">
              {threat?.correlationTags?.map((tag, tagIndex) => (
                <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Campaign Analysis */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Icon name="Activity" size={18} className="mr-2" />
          Campaign Timeline
        </h3>
        
        <div className="space-y-3">
          {relatedThreats?.slice(0, 3)?.map((threat, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{threat?.cveId}</p>
                  <p className="text-xs text-muted-foreground">{threat?.campaignName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{threat?.publishedDate}</p>
                  <p className="text-xs font-medium text-foreground">{threat?.affectedSystems} systems</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Threat Actor Information */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Icon name="Users" size={18} className="mr-2" />
          Associated Threat Actors
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedThreats?.[0]?.threatActors?.map((actor, index) => (
            <div key={index} className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{actor?.name}</p>
                  <p className="text-xs text-muted-foreground">{actor?.type}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{actor?.description}</p>
              <div className="flex flex-wrap gap-1">
                {actor?.tactics?.map((tactic, tacticIndex) => (
                  <span key={tacticIndex} className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">
                    {tactic}
                  </span>
                ))}
              </div>
            </div>
          )) || (
            <div className="col-span-full text-center py-8">
              <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No threat actor information available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedThreats;