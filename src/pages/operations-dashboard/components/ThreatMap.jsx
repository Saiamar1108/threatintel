import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatMap = ({ threats = [] }) => {
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [mapView, setMapView] = useState('world');

  // Mock geographic data for threats
  const threatLocations = [
    { id: 1, lat: 40.7128, lng: -74.0060, city: "New York", country: "USA", threats: 15 },
    { id: 2, lat: 51.5074, lng: -0.1278, city: "London", country: "UK", threats: 8 },
    { id: 3, lat: 35.6762, lng: 139.6503, city: "Tokyo", country: "Japan", threats: 12 },
    { id: 4, lat: 55.7558, lng: 37.6176, city: "Moscow", country: "Russia", threats: 22 },
    { id: 5, lat: 39.9042, lng: 116.4074, city: "Beijing", country: "China", threats: 18 },
    { id: 6, lat: 52.5200, lng: 13.4050, city: "Berlin", country: "Germany", threats: 6 },
    { id: 7, lat: -33.8688, lng: 151.2093, city: "Sydney", country: "Australia", threats: 4 },
    { id: 8, lat: 19.0760, lng: 72.8777, city: "Mumbai", country: "India", threats: 9 }
  ];

  const getThreatIntensity = (count) => {
    if (count >= 20) return 'bg-red-500';
    if (count >= 15) return 'bg-orange-500';
    if (count >= 10) return 'bg-yellow-500';
    if (count >= 5) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getThreatSize = (count) => {
    if (count >= 20) return 'w-6 h-6';
    if (count >= 15) return 'w-5 h-5';
    if (count >= 10) return 'w-4 h-4';
    return 'w-3 h-3';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-threat-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Globe" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Global Threat Map</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'world' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMapView('world')}
            >
              World
            </Button>
            <Button
              variant={mapView === 'regional' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMapView('regional')}
            >
              Regional
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        {/* Map Container */}
        <div className="relative bg-slate-50 rounded-lg overflow-hidden" style={{ height: '400px' }}>
          {/* Google Maps Iframe */}
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Global Threat Intelligence Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7128,-74.0060&z=2&output=embed"
            className="absolute inset-0"
          />
          
          {/* Threat Markers Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {threatLocations?.map((location) => (
              <div
                key={location?.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
                style={{
                  left: `${((location?.lng + 180) / 360) * 100}%`,
                  top: `${((90 - location?.lat) / 180) * 100}%`
                }}
                onClick={() => setSelectedThreat(location)}
              >
                <div className={`${getThreatSize(location?.threats)} ${getThreatIntensity(location?.threats)} rounded-full animate-pulse-slow border-2 border-white shadow-lg`} />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                  {location?.city}: {location?.threats} threats
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Threat Intensity</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-xs text-gray-600">Critical (20+)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-xs text-gray-600">High (15-19)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-xs text-gray-600">Medium (10-14)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-xs text-gray-600">Low (5-9)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-xs text-gray-600">Minimal (&lt;5)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Threat Statistics */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {threatLocations?.filter(l => l?.threats >= 20)?.length}
            </div>
            <div className="text-xs text-muted-foreground">Critical Zones</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {threatLocations?.filter(l => l?.threats >= 15 && l?.threats < 20)?.length}
            </div>
            <div className="text-xs text-muted-foreground">High Risk Areas</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-accent">
              {threatLocations?.reduce((sum, l) => sum + l?.threats, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Threats</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {threatLocations?.length}
            </div>
            <div className="text-xs text-muted-foreground">Monitored Regions</div>
          </div>
        </div>

        {/* Selected Threat Details */}
        {selectedThreat && (
          <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-foreground">
                {selectedThreat?.city}, {selectedThreat?.country}
              </h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedThreat(null)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Active Threats:</span>
                <span className="ml-2 font-semibold text-foreground">{selectedThreat?.threats}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Risk Level:</span>
                <span className={`ml-2 font-semibold ${
                  selectedThreat?.threats >= 20 ? 'text-red-600' :
                  selectedThreat?.threats >= 15 ? 'text-orange-600' :
                  selectedThreat?.threats >= 10 ? 'text-yellow-600': 'text-green-600'
                }`}>
                  {selectedThreat?.threats >= 20 ? 'Critical' :
                   selectedThreat?.threats >= 15 ? 'High' :
                   selectedThreat?.threats >= 10 ? 'Medium' : 'Low'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatMap;