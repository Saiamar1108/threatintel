import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicThreatMap = ({ threatLocations }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regionStats = {
    'North America': { threats: 245, campaigns: 12, severity: 'High' },
    'Europe': { threats: 189, campaigns: 8, severity: 'Medium' },
    'Asia Pacific': { threats: 312, campaigns: 15, severity: 'Critical' },
    'South America': { threats: 67, campaigns: 4, severity: 'Low' },
    'Africa': { threats: 89, campaigns: 5, severity: 'Medium' },
    'Middle East': { threats: 134, campaigns: 7, severity: 'High' }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Global Threat Map</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Globe" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Real-time</span>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative bg-slate-100 rounded-lg overflow-hidden mb-6" style={{ height: '300px' }}>
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Global Threat Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=2&output=embed"
          className="border-0"
        />
        
        {/* Threat Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {threatLocations?.map((location, index) => (
            <div
              key={index}
              className={`absolute w-3 h-3 rounded-full ${getSeverityColor(location?.severity)} animate-pulse-slow pointer-events-auto cursor-pointer`}
              style={{
                left: `${location?.x}%`,
                top: `${location?.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              title={`${location?.city}: ${location?.threats} threats`}
            />
          ))}
        </div>
      </div>
      {/* Regional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(regionStats)?.map(([region, stats]) => (
          <div
            key={region}
            className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
              selectedRegion === region
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
            onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-foreground">{region}</h4>
              <div className={`w-2 h-2 rounded-full ${getSeverityColor(stats?.severity)}`} />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {stats?.threats} threats • {stats?.campaigns} campaigns
              </p>
              <p className="text-xs font-medium text-foreground">{stats?.severity} Risk</p>
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-xs text-muted-foreground">Critical</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-xs text-muted-foreground">High</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="text-xs text-muted-foreground">Medium</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-muted-foreground">Low</span>
        </div>
      </div>
    </div>
  );
};

export default GeographicThreatMap;