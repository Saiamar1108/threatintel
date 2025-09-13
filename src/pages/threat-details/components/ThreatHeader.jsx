import React from 'react';

import Button from '../../../components/ui/Button';

const ThreatHeader = ({ threat, onBookmark, onShare, onEscalate, isBookmarked }) => {
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'patched': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-2xl font-bold text-foreground">{threat?.cveId}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(threat?.severity)}`}>
              {threat?.severity} Risk
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(threat?.status)}`}>
              {threat?.status}
            </span>
          </div>
          
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {threat?.description}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">CVSS Score</p>
              <p className="text-lg font-bold text-foreground">{threat?.cvssScore}/10</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Published</p>
              <p className="text-sm text-foreground">{threat?.publishedDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
              <p className="text-sm text-foreground">{threat?.lastUpdated}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Affected Systems</p>
              <p className="text-sm text-foreground">{threat?.affectedSystems}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-row lg:flex-col gap-2">
          <Button
            variant={isBookmarked ? "default" : "outline"}
            size="sm"
            iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
            onClick={onBookmark}
          >
            {isBookmarked ? "Saved" : "Save"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Share2"
            onClick={onShare}
          >
            Share
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            iconName="AlertTriangle"
            onClick={onEscalate}
          >
            Escalate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreatHeader;