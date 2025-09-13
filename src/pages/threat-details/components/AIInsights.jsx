import React from 'react';
import Icon from '../../../components/AppIcon';

const AIInsights = ({ insights }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 90) return 'CheckCircle';
    if (confidence >= 70) return 'AlertTriangle';
    return 'XCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Icon name="Brain" size={18} color="white" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">AI-Powered Insights</h2>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          Beta
        </span>
      </div>
      <div className="space-y-6">
        {/* Contextual Analysis */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-foreground flex items-center">
              <Icon name="Target" size={16} className="mr-2 text-primary" />
              Contextual Analysis
            </h3>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(insights?.contextualAnalysis?.confidence)}`}>
              <Icon name={getConfidenceIcon(insights?.contextualAnalysis?.confidence)} size={12} />
              <span>{insights?.contextualAnalysis?.confidence}% Confidence</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {insights?.contextualAnalysis?.analysis}
          </p>
        </div>

        {/* Attack Vector Assessment */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-foreground flex items-center">
              <Icon name="Zap" size={16} className="mr-2 text-primary" />
              Attack Vector Assessment
            </h3>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(insights?.attackVectorAssessment?.confidence)}`}>
              <Icon name={getConfidenceIcon(insights?.attackVectorAssessment?.confidence)} size={12} />
              <span>{insights?.attackVectorAssessment?.confidence}% Confidence</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {insights?.attackVectorAssessment?.assessment}
          </p>
          <div className="flex flex-wrap gap-2">
            {insights?.attackVectorAssessment?.vectors?.map((vector, index) => (
              <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                {vector}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Countermeasures */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-foreground flex items-center">
              <Icon name="Shield" size={16} className="mr-2 text-primary" />
              Recommended Countermeasures
            </h3>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(insights?.countermeasures?.confidence)}`}>
              <Icon name={getConfidenceIcon(insights?.countermeasures?.confidence)} size={12} />
              <span>{insights?.countermeasures?.confidence}% Confidence</span>
            </div>
          </div>
          <div className="space-y-3">
            {insights?.countermeasures?.recommendations?.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  rec?.priority === 'High' ? 'bg-red-100 text-red-800' :
                  rec?.priority === 'Medium'? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-foreground text-sm">{rec?.action}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      rec?.priority === 'High' ? 'bg-red-100 text-red-800' :
                      rec?.priority === 'Medium'? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {rec?.priority}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{rec?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted rounded-lg p-4 text-center">
            <Icon name="TrendingUp" size={24} className="mx-auto text-red-500 mb-2" />
            <p className="text-sm font-medium text-foreground">Exploitation Risk</p>
            <p className="text-2xl font-bold text-red-600">{insights?.riskAssessment?.exploitationRisk}%</p>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <Icon name="Clock" size={24} className="mx-auto text-orange-500 mb-2" />
            <p className="text-sm font-medium text-foreground">Time to Exploit</p>
            <p className="text-2xl font-bold text-orange-600">{insights?.riskAssessment?.timeToExploit}</p>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <Icon name="Users" size={24} className="mx-auto text-blue-500 mb-2" />
            <p className="text-sm font-medium text-foreground">Affected Users</p>
            <p className="text-2xl font-bold text-blue-600">{insights?.riskAssessment?.affectedUsers}</p>
          </div>
        </div>

        {/* AI Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">AI-Generated Analysis</p>
              <p className="text-xs text-blue-700 mt-1">
                These insights are generated by AI and should be validated by security experts. 
                Confidence scores indicate the reliability of each assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;