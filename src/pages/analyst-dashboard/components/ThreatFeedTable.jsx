import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatFeedTable = ({ threats, onSort, sortConfig }) => {
  const [selectedThreats, setSelectedThreats] = useState(new Set());

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedThreats(new Set(threats.map(threat => threat.id)));
    } else {
      setSelectedThreats(new Set());
    }
  };

  const handleSelectThreat = (threatId, checked) => {
    const newSelected = new Set(selectedThreats);
    if (checked) {
      newSelected?.add(threatId);
    } else {
      newSelected?.delete(threatId);
    }
    setSelectedThreats(newSelected);
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header Actions */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-foreground">
              {selectedThreats?.size > 0 ? `${selectedThreats?.size} selected` : `${threats?.length} threats`}
            </span>
            {selectedThreats?.size > 0 && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="Download">
                  Export
                </Button>
                <Button variant="outline" size="sm" iconName="Share">
                  Share
                </Button>
                <Button variant="outline" size="sm" iconName="Archive">
                  Archive
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="Settings">
              Columns
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedThreats?.size === threats?.length && threats?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border focus:ring-2 focus:ring-ring"
                />
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => onSort('cveId')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>CVE ID</span>
                  <Icon name={getSortIcon('cveId')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => onSort('title')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Threat Description</span>
                  <Icon name={getSortIcon('title')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => onSort('severity')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Severity</span>
                  <Icon name={getSortIcon('severity')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => onSort('score')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Score</span>
                  <Icon name={getSortIcon('score')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-sm font-medium text-foreground">Related Actors</span>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => onSort('timestamp')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Detected</span>
                  <Icon name={getSortIcon('timestamp')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {threats?.map((threat) => (
              <tr key={threat?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedThreats?.has(threat?.id)}
                    onChange={(e) => handleSelectThreat(threat?.id, e?.target?.checked)}
                    className="rounded border-border focus:ring-2 focus:ring-ring"
                  />
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/threat-details?id=${threat?.id}`}
                    className="text-sm font-mono text-primary hover:text-primary/80 transition-smooth"
                  >
                    {threat?.cveId}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-md">
                    <p className="text-sm font-medium text-foreground truncate">
                      {threat?.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {threat?.description}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(threat?.severity)}`}>
                    <Icon name={getSeverityIcon(threat?.severity)} size={12} />
                    <span className="capitalize">{threat?.severity}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{threat?.score}</span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          threat?.score >= 9 ? 'bg-red-500' :
                          threat?.score >= 7 ? 'bg-orange-500' :
                          threat?.score >= 4 ? 'bg-yellow-500': 'bg-green-500'
                        }`}
                        style={{ width: `${(threat?.score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {threat?.actors?.slice(0, 2)?.map((actor, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs bg-accent/10 text-accent rounded border border-accent/20"
                      >
                        {actor}
                      </span>
                    ))}
                    {threat?.actors?.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{threat?.actors?.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(threat?.timestamp)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" iconName="Eye" />
                    <Button variant="ghost" size="icon" iconName="BookmarkPlus" />
                    <Button variant="ghost" size="icon" iconName="Share" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {threats?.map((threat) => (
          <div key={threat?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedThreats?.has(threat?.id)}
                  onChange={(e) => handleSelectThreat(threat?.id, e?.target?.checked)}
                  className="rounded border-border focus:ring-2 focus:ring-ring"
                />
                <Link
                  to={`/threat-details?id=${threat?.id}`}
                  className="text-sm font-mono text-primary hover:text-primary/80 transition-smooth"
                >
                  {threat?.cveId}
                </Link>
              </div>
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(threat?.severity)}`}>
                <Icon name={getSeverityIcon(threat?.severity)} size={12} />
                <span className="capitalize">{threat?.severity}</span>
              </div>
            </div>
            
            <h3 className="text-sm font-medium text-foreground mb-2">{threat?.title}</h3>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{threat?.description}</p>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Score:</span>
                <span className="text-sm font-medium text-foreground">{threat?.score}</span>
                <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      threat?.score >= 9 ? 'bg-red-500' :
                      threat?.score >= 7 ? 'bg-orange-500' :
                      threat?.score >= 4 ? 'bg-yellow-500': 'bg-green-500'
                    }`}
                    style={{ width: `${(threat?.score / 10) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDate(threat?.timestamp)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {threat?.actors?.slice(0, 2)?.map((actor, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs bg-accent/10 text-accent rounded border border-accent/20"
                  >
                    {actor}
                  </span>
                ))}
                {threat?.actors?.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{threat?.actors?.length - 2}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" iconName="Eye" />
                <Button variant="ghost" size="icon" iconName="BookmarkPlus" />
                <Button variant="ghost" size="icon" iconName="Share" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatFeedTable;