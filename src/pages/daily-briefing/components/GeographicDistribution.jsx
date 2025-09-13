import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const GeographicDistribution = ({ data }) => {
  const COLORS = {
    'North America': '#3b82f6',
    'Europe': '#10b981',
    'Asia Pacific': '#f59e0b',
    'Middle East': '#ef4444',
    'Africa': '#8b5cf6',
    'South America': '#06b6d4'
  };

  const formatTooltip = (value, name) => {
    return [`${value} threats`, name];
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  const totalThreats = data?.reduce((sum, item) => sum + item?.value, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Geographic Distribution</h3>
          <p className="text-sm text-muted-foreground">
            Threat origins by region - {totalThreats} total threats detected
          </p>
        </div>
        <Icon name="Globe" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="h-64" aria-label="Geographic Threat Distribution Pie Chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[entry?.name] || '#64748b'} />
                ))}
              </Pie>
              <Tooltip 
                formatter={formatTooltip}
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend with Details */}
        <div className="space-y-3">
          {data?.map((item, index) => {
            const percentage = ((item?.value / totalThreats) * 100)?.toFixed(1);
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS?.[item?.name] || '#64748b' }}
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">{item?.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {item?.topThreat && `Top: ${item?.topThreat}`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">{item?.value}</div>
                  <div className="text-xs text-muted-foreground">{percentage}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {Math.max(...data?.map(d => d?.value))}
            </div>
            <div className="text-xs text-muted-foreground">Highest Region</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {data?.length}
            </div>
            <div className="text-xs text-muted-foreground">Active Regions</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {(totalThreats / data?.length)?.toFixed(0)}
            </div>
            <div className="text-xs text-muted-foreground">Avg per Region</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicDistribution;