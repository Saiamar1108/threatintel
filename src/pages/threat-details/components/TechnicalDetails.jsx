import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TechnicalDetails = ({ threat }) => {
  const [expandedSections, setExpandedSections] = useState({
    exploitCode: false,
    patchInfo: false,
    impactAssessment: false,
    references: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const sections = [
    {
      key: 'exploitCode',
      title: 'Exploit Code Availability',
      icon: 'Code',
      content: threat?.exploitCode,
      status: threat?.exploitAvailable ? 'Available' : 'Not Available',
      statusColor: threat?.exploitAvailable ? 'text-red-600' : 'text-green-600'
    },
    {
      key: 'patchInfo',
      title: 'Patch Information',
      icon: 'Shield',
      content: threat?.patchInfo,
      status: threat?.patchAvailable ? 'Available' : 'Pending',
      statusColor: threat?.patchAvailable ? 'text-green-600' : 'text-orange-600'
    },
    {
      key: 'impactAssessment',
      title: 'Impact Assessment',
      icon: 'TrendingUp',
      content: threat?.impactAssessment,
      status: `${threat?.impactLevel} Impact`,
      statusColor: threat?.impactLevel === 'High' ? 'text-red-600' : 
                  threat?.impactLevel === 'Medium' ? 'text-orange-600' : 'text-green-600'
    },
    {
      key: 'references',
      title: 'External References',
      icon: 'ExternalLink',
      content: threat?.references,
      status: `${threat?.references?.length || 0} References`,
      statusColor: 'text-blue-600'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Settings" size={20} className="mr-2" />
        Technical Details
      </h2>
      <div className="space-y-4">
        {sections?.map((section) => (
          <div key={section?.key} className="border border-border rounded-lg">
            <button
              onClick={() => toggleSection(section?.key)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted transition-smooth"
            >
              <div className="flex items-center space-x-3">
                <Icon name={section?.icon} size={18} className="text-primary" />
                <span className="font-medium text-foreground">{section?.title}</span>
                <span className={`text-sm font-medium ${section?.statusColor}`}>
                  {section?.status}
                </span>
              </div>
              <Icon 
                name={expandedSections?.[section?.key] ? "ChevronUp" : "ChevronDown"} 
                size={18} 
                className="text-muted-foreground" 
              />
            </button>
            
            {expandedSections?.[section?.key] && (
              <div className="px-4 pb-4 border-t border-border">
                <div className="pt-4">
                  {section?.key === 'references' ? (
                    <div className="space-y-2">
                      {section?.content?.map((ref, index) => (
                        <a
                          key={index}
                          href={ref?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-smooth"
                        >
                          <Icon name="ExternalLink" size={14} />
                          <span className="text-sm">{ref?.title}</span>
                        </a>
                      )) || <p className="text-sm text-muted-foreground">No references available</p>}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {section?.content || "No information available"}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Affected Systems Grid */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-medium text-foreground mb-4">Affected Systems & Versions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {threat?.affectedSystemsDetails?.map((system, index) => (
            <div key={index} className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Server" size={16} className="text-primary" />
                <span className="font-medium text-foreground">{system?.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                Versions: {system?.versions}
              </p>
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                system?.patchStatus === 'Patched' ? 'bg-green-100 text-green-800' :
                system?.patchStatus === 'Pending'? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
              }`}>
                {system?.patchStatus}
              </span>
            </div>
          )) || (
            <div className="col-span-full text-center py-8">
              <Icon name="AlertCircle" size={48} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No affected systems data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicalDetails;