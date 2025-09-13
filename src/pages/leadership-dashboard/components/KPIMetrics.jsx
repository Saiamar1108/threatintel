import React from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const KPIMetrics = ({ metrics, trendData }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-threat-modal">
          <p className="text-sm font-medium text-foreground">{`Day ${label}`}</p>
          <p className="text-xs text-muted-foreground">{`Response Time: ${payload?.[0]?.value} hours`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Key Performance Indicators</h3>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} className="text-green-600" />
          <span className="text-sm text-green-600 font-medium">Improving</span>
        </div>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {metrics?.map((metric, index) => (
          <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <Icon name={metric?.icon} size={20} className="text-primary" />
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                metric?.trend === 'up' ? 'text-green-600 bg-green-50' :
                metric?.trend === 'down'? 'text-red-600 bg-red-50' : 'text-slate-600 bg-slate-50'
              }`}>
                {metric?.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{metric?.value}</p>
              <p className="text-sm text-muted-foreground">{metric?.label}</p>
              <p className="text-xs text-muted-foreground">{metric?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Trend Chart */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground">Response Time Trend (Last 30 Days)</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="day" 
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis 
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="responseTime" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Performance Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-foreground">This Week's Achievements</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} className="text-green-600" />
                <span>Reduced average response time by 23%</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} className="text-green-600" />
                <span>Achieved 98.5% threat mitigation success rate</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} className="text-green-600" />
                <span>Zero critical incidents escalated</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-foreground">Areas for Improvement</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={14} className="text-orange-600" />
                <span>Increase proactive threat hunting activities</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={14} className="text-orange-600" />
                <span>Enhance cross-team communication protocols</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={14} className="text-orange-600" />
                <span>Expand threat intelligence data sources</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIMetrics;