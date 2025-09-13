import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ThreatDistributionChart = ({ data, chartType = "bar" }) => {
  const severityColors = {
    Critical: '#DC2626',
    High: '#EA580C',
    Medium: '#D97706',
    Low: '#059669',
    Info: '#0EA5E9'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-threat-modal">
          <p className="text-sm font-medium text-foreground">{`${label}: ${payload?.[0]?.value}`}</p>
          <p className="text-xs text-muted-foreground">threats detected</p>
        </div>
      );
    }
    return null;
  };

  if (chartType === "pie") {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Threat Distribution</h3>
          <div className="text-sm text-muted-foreground">Last 7 days</div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="count"
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={severityColors?.[entry?.severity]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {data?.map((item) => (
            <div key={item?.severity} className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: severityColors?.[item?.severity] }}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item?.severity}</p>
                <p className="text-xs text-muted-foreground">{item?.count} threats</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Weekly Threat Trends</h3>
        <div className="text-sm text-muted-foreground">Last 30 days</div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="severity" 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <YAxis 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              radius={[4, 4, 0, 0]}
              fill={(entry) => severityColors?.[entry?.severity]}
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={severityColors?.[entry?.severity]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThreatDistributionChart;