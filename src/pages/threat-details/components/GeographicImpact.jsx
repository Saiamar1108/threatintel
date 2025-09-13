import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicImpact = ({ geographicData }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Globe" size={20} className="mr-2" />
        Geographic Impact Analysis
      </h2>
      {/* Interactive Map */}
      <div className="mb-6">
        <div className="bg-muted rounded-lg overflow-hidden" style={{ height: '400px' }}>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Global Threat Distribution"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7128,-74.0060&z=2&output=embed"
            className="border-0"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Interactive map showing global distribution of threat campaigns and affected regions
        </p>
      </div>
      {/* Regional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {geographicData?.regions?.map((region, index) => (
          <div 
            key={index} 
            className={`border rounded-lg p-4 cursor-pointer transition-smooth ${
              selectedRegion === region?.name 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedRegion(selectedRegion === region?.name ? null : region?.name)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-foreground">{region?.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                region?.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                region?.riskLevel === 'Medium'? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
              }`}>
                {region?.riskLevel} Risk
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Affected Systems:</span>
                <span className="font-medium text-foreground">{region?.affectedSystems?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Campaigns:</span>
                <span className="font-medium text-foreground">{region?.activeCampaigns}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Activity:</span>
                <span className="font-medium text-foreground">{region?.lastActivity}</span>
              </div>
            </div>

            {selectedRegion === region?.name && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">{region?.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Top Affected Countries:</h4>
                  {region?.topCountries?.map((country, countryIndex) => (
                    <div key={countryIndex} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{country?.name}</span>
                      <span className="font-medium text-foreground">{country?.incidents} incidents</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Campaign Distribution */}
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2" />
          Campaign Distribution Patterns
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attack Vectors by Region */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Attack Vectors by Region</h4>
            <div className="space-y-3">
              {geographicData?.attackVectors?.map((vector, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{vector?.type}</span>
                    <span className="font-medium text-foreground">{vector?.percentage}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-smooth" 
                      style={{ width: `${vector?.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Activity */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Recent Activity Timeline</h4>
            <div className="space-y-3">
              {geographicData?.timeline?.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{event?.region}</p>
                    <p className="text-xs text-muted-foreground">{event?.activity}</p>
                    <p className="text-xs text-muted-foreground">{event?.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Key Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Icon name="Lightbulb" size={18} className="mr-2" />
          Geographic Intelligence Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {geographicData?.insights?.map((insight, index) => (
            <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">{insight?.title}</p>
                  <p className="text-xs text-blue-700 mt-1">{insight?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeographicImpact;