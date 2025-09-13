import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ThreatFilters = ({ onFilterChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filterCategories = [
    {
      id: 'severity',
      label: 'Severity Level',
      options: [
        { value: 'critical', label: 'Critical', count: 23, color: 'bg-red-500' },
        { value: 'high', label: 'High', count: 45, color: 'bg-orange-500' },
        { value: 'medium', label: 'Medium', count: 78, color: 'bg-yellow-500' },
        { value: 'low', label: 'Low', count: 34, color: 'bg-green-500' }
      ]
    },
    {
      id: 'type',
      label: 'Threat Type',
      options: [
        { value: 'malware', label: 'Malware Campaigns', count: 67, icon: 'Bug' },
        { value: 'phishing', label: 'Phishing Domains', count: 89, icon: 'Fish' },
        { value: 'vulnerability', label: 'Vulnerabilities', count: 156, icon: 'Shield' },
        { value: 'apt', label: 'APT Activity', count: 23, icon: 'Target' },
        { value: 'ransomware', label: 'Ransomware', count: 34, icon: 'Lock' }
      ]
    },
    {
      id: 'source',
      label: 'Intelligence Source',
      options: [
        { value: 'osint', label: 'OSINT', count: 234, icon: 'Globe' },
        { value: 'commercial', label: 'Commercial Feeds', count: 123, icon: 'Building' },
        { value: 'government', label: 'Government', count: 45, icon: 'Flag' },
        { value: 'community', label: 'Community', count: 78, icon: 'Users' }
      ]
    },
    {
      id: 'timeframe',
      label: 'Time Frame',
      options: [
        { value: '1h', label: 'Last Hour', count: 12 },
        { value: '24h', label: 'Last 24 Hours', count: 89 },
        { value: '7d', label: 'Last 7 Days', count: 234 },
        { value: '30d', label: 'Last 30 Days', count: 567 }
      ]
    }
  ];

  const handleFilterToggle = (categoryId, optionValue) => {
    const currentFilters = activeFilters?.[categoryId] || [];
    const newFilters = currentFilters?.includes(optionValue)
      ? currentFilters?.filter(f => f !== optionValue)
      : [...currentFilters, optionValue];
    
    onFilterChange({
      ...activeFilters,
      [categoryId]: newFilters
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e?.target?.value);
    onFilterChange({
      ...activeFilters,
      search: e?.target?.value
    });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.reduce((count, filters) => {
      if (Array.isArray(filters)) {
        return count + filters?.length;
      }
      return filters ? count + 1 : count;
    }, 0);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={20} className="text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Threat Filters</h3>
            {getActiveFilterCount() > 0 && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {getActiveFilterCount()} active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {getActiveFilterCount() > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Search Bar */}
      <div className="px-6 py-4 border-b border-border">
        <Input
          type="search"
          placeholder="Search CVE IDs, keywords, actors..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>
      {/* Filter Categories */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-96 overflow-hidden'}`}>
        <div className="p-6 space-y-6">
          {filterCategories?.map((category) => (
            <div key={category?.id}>
              <h4 className="text-sm font-medium text-foreground mb-3">{category?.label}</h4>
              <div className="space-y-2">
                {category?.options?.map((option) => {
                  const isActive = activeFilters?.[category?.id]?.includes(option?.value);
                  return (
                    <label
                      key={option?.value}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-smooth"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => handleFilterToggle(category?.id, option?.value)}
                          className="rounded border-border focus:ring-2 focus:ring-ring"
                        />
                        <div className="flex items-center space-x-2">
                          {option?.color && (
                            <div className={`w-3 h-3 rounded-full ${option?.color}`} />
                          )}
                          {option?.icon && (
                            <Icon name={option?.icon} size={16} className="text-muted-foreground" />
                          )}
                          <span className="text-sm text-foreground">{option?.label}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {option?.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="px-6 py-4 border-t border-border bg-muted/30">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export Filtered
          </Button>
          <Button variant="outline" size="sm" iconName="Bell">
            Create Alert
          </Button>
          <Button variant="outline" size="sm" iconName="BookmarkPlus">
            Save View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreatFilters;