import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveSummaryCard = ({ title, value, change, changeType, icon, color = "blue" }) => {
  const getColorClasses = (color) => {
    const colors = {
      red: 'bg-red-50 border-red-200 text-red-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800'
    };
    return colors?.[color] || colors?.blue;
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'increase': return 'text-red-600';
      case 'decrease': return 'text-green-600';
      case 'neutral': return 'text-slate-600';
      default: return 'text-slate-600';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'increase': return 'TrendingUp';
      case 'decrease': return 'TrendingDown';
      case 'neutral': return 'Minus';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card hover:shadow-threat-elevated transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
          <Icon name={getChangeIcon(changeType)} size={16} />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default ExecutiveSummaryCard;