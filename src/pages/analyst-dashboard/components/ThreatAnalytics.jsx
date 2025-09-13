import React, { useState } from 'react';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatAnalytics = () => {
  const [activeTab, setActiveTab] = useState('distribution');

  const severityDistribution = [
    { name: 'Critical', value: 23, color: '#DC2626' },
    { name: 'High', value: 45, color: '#EA580C' },
    { name: 'Medium', value: 78, color: '#D97706' },
    { name: 'Low', value: 34, color: '#059669' }
  ];

  const threatTimeline = [
    { date: '09/04', critical: 3, high: 8, medium: 12, low: 5 },
    { date: '09/05', critical: 5, high: 12, medium: 15, low: 8 },
    { date: '09/06', critical: 2, high: 6, medium: 18, low: 12 },
    { date: '09/07', critical: 7, high: 15, medium: 22, low: 9 },
    { date: '09/08', critical: 4, high: 9, medium: 16, low: 7 },
    { date: '09/09', critical: 6, high: 11, medium: 20, low: 11 },
    { date: '09/10', critical: 8, high: 14, medium: 25, low: 13 }
  ];

  const threatTypes = [
    { name: 'Malware', count: 67, trend: '+12%', color: '#DC2626' },
    { name: 'Phishing', count: 89, trend: '+8%', color: '#EA580C' },
    { name: 'Vulnerabilities', count: 156, trend: '+15%', color: '#D97706' },
    { name: 'APT Activity', count: 23, trend: '-3%', color: '#059669' },
    { name: 'Ransomware', count: 34, trend: '+22%', color: '#7C3AED' }
  ];

  const correlationData = [
    { time: '00:00', incidents: 12, correlation: 0.3 },
    { time: '04:00', incidents: 8, correlation: 0.2 },
    { time: '08:00', incidents: 25, correlation: 0.7 },
    { time: '12:00', incidents: 32, correlation: 0.8 },
    { time: '16:00', incidents: 28, correlation: 0.6 },
    { time: '20:00', incidents: 18, correlation: 0.4 }
  ];

  const tabs = [
    { id: 'distribution', label: 'Distribution', icon: 'PieChart' },
    { id: 'timeline', label: 'Timeline', icon: 'TrendingUp' },
    { id: 'correlation', label: 'Correlation', icon: 'GitBranch' },
    { id: 'patterns', label: 'Patterns', icon: 'Zap' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-threat-modal p-3">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderDistributionView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Severity Pie Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Severity Distribution</h3>
          <Button variant="ghost" size="icon" iconName="MoreHorizontal" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={severityDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {severityDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {severityDistribution?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.color }} />
              <span className="text-sm text-foreground">{item?.name}</span>
              <span className="text-sm font-medium text-muted-foreground">{item?.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Threat Types */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Threat Types</h3>
          <Button variant="ghost" size="icon" iconName="MoreHorizontal" />
        </div>
        <div className="space-y-4">
          {threatTypes?.map((type, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: type?.color }} />
                <span className="text-sm font-medium text-foreground">{type?.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold text-foreground">{type?.count}</span>
                <span className={`text-sm font-medium ${
                  type?.trend?.startsWith('+') ? 'text-success' : 'text-error'
                }`}>
                  {type?.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimelineView = () => (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">7-Day Threat Timeline</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Calendar">
            Date Range
          </Button>
          <Button variant="ghost" size="icon" iconName="MoreHorizontal" />
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={threatTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="critical"
              stackId="1"
              stroke="#DC2626"
              fill="#DC2626"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="high"
              stackId="1"
              stroke="#EA580C"
              fill="#EA580C"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="medium"
              stackId="1"
              stroke="#D97706"
              fill="#D97706"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="low"
              stackId="1"
              stroke="#059669"
              fill="#059669"
              fillOpacity={0.8}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-600 rounded" />
          <span className="text-sm text-foreground">Critical</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-600 rounded" />
          <span className="text-sm text-foreground">High</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-600 rounded" />
          <span className="text-sm text-foreground">Medium</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-600 rounded" />
          <span className="text-sm text-foreground">Low</span>
        </div>
      </div>
    </div>
  );

  const renderCorrelationView = () => (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Threat Correlation Analysis</h3>
        <Button variant="outline" size="sm" iconName="RefreshCw">
          Refresh
        </Button>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={correlationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="left" dataKey="incidents" fill="var(--color-primary)" opacity={0.6} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="correlation"
              stroke="var(--color-accent)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderPatternsView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Attack Patterns</h3>
        <div className="space-y-4">
          {[
            { pattern: 'Credential Stuffing', frequency: 89, risk: 'High' },
            { pattern: 'SQL Injection', frequency: 67, risk: 'Critical' },
            { pattern: 'XSS Attacks', frequency: 45, risk: 'Medium' },
            { pattern: 'DDoS Attempts', frequency: 34, risk: 'High' }
          ]?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">{item?.pattern}</p>
                <p className="text-xs text-muted-foreground">Frequency: {item?.frequency}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                item?.risk === 'Critical' ? 'bg-red-100 text-red-800' :
                item?.risk === 'High'? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {item?.risk}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">AI Insights</h3>
        <div className="space-y-4">
          <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Pattern Detection</p>
                <p className="text-xs text-muted-foreground">
                  Increased APT activity detected in financial sector targeting. 
                  Recommend enhanced monitoring for banking institutions.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Correlation Alert</p>
                <p className="text-xs text-muted-foreground">
                  Multiple CVEs showing similar exploitation patterns. 
                  Potential coordinated campaign identified.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="TrendingDown" size={20} className="text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Trend Analysis</p>
                <p className="text-xs text-muted-foreground">
                  Phishing attempts decreased by 15% this week. 
                  Current mitigation strategies showing effectiveness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Tab Navigation */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Threat Analytics</h2>
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  activeTab === tab?.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'distribution' && renderDistributionView()}
        {activeTab === 'timeline' && renderTimelineView()}
        {activeTab === 'correlation' && renderCorrelationView()}
        {activeTab === 'patterns' && renderPatternsView()}
      </div>
    </div>
  );
};

export default ThreatAnalytics;