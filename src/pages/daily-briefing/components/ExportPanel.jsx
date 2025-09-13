import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportPanel = ({ onExport, onSchedule, isVisible, onClose }) => {
  const [exportOptions, setExportOptions] = useState({
    briefingCards: true,
    threatTrends: true,
    geographicData: true,
    personalizedInsights: true,
    charts: false,
    rawData: false
  });

  const [exportFormat, setExportFormat] = useState('pdf');
  const [scheduleOptions, setScheduleOptions] = useState({
    frequency: 'daily',
    time: '08:00',
    recipients: '',
    includeCharts: true
  });

  const handleExportOptionChange = (option, checked) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  const handleExport = () => {
    const exportData = {
      format: exportFormat,
      options: exportOptions,
      timestamp: new Date()?.toISOString()
    };
    onExport(exportData);
  };

  const handleSchedule = () => {
    const scheduleData = {
      ...scheduleOptions,
      exportOptions,
      format: exportFormat
    };
    onSchedule(scheduleData);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-threat-modal w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Export Briefing</h3>
            <p className="text-sm text-muted-foreground">
              Export or schedule daily briefing reports
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Export Format</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'pdf', label: 'PDF', icon: 'FileText' },
                { value: 'excel', label: 'Excel', icon: 'Table' },
                { value: 'json', label: 'JSON', icon: 'Code' }
              ]?.map((format) => (
                <button
                  key={format?.value}
                  onClick={() => setExportFormat(format?.value)}
                  className={`flex flex-col items-center p-3 rounded-lg border transition-smooth ${
                    exportFormat === format?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={format?.icon} size={20} className="mb-1" />
                  <span className="text-xs font-medium">{format?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Include Sections</h4>
            <div className="space-y-3">
              {[
                { key: 'briefingCards', label: 'Briefing Cards', description: 'Main threat summaries and insights' },
                { key: 'threatTrends', label: 'Threat Trends', description: 'Historical trend analysis' },
                { key: 'geographicData', label: 'Geographic Distribution', description: 'Regional threat mapping' },
                { key: 'personalizedInsights', label: 'Personalized Insights', description: 'Role-specific recommendations' },
                { key: 'charts', label: 'Interactive Charts', description: 'Visual data representations' },
                { key: 'rawData', label: 'Raw Data', description: 'Underlying threat intelligence data' }
              ]?.map((option) => (
                <div key={option?.key} className="flex items-start space-x-3">
                  <Checkbox
                    checked={exportOptions?.[option?.key]}
                    onChange={(e) => handleExportOptionChange(option?.key, e?.target?.checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground cursor-pointer">
                      {option?.label}
                    </label>
                    <p className="text-xs text-muted-foreground">{option?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Options */}
          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Icon name="Calendar" size={16} className="mr-2" />
              Schedule Automatic Export
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Frequency</label>
                <select
                  value={scheduleOptions?.frequency}
                  onChange={(e) => setScheduleOptions(prev => ({ ...prev, frequency: e?.target?.value }))}
                  className="w-full mt-1 px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Time</label>
                <input
                  type="time"
                  value={scheduleOptions?.time}
                  onChange={(e) => setScheduleOptions(prev => ({ ...prev, time: e?.target?.value }))}
                  className="w-full mt-1 px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Recipients (comma-separated emails)</label>
                <input
                  type="text"
                  placeholder="user1@company.com, user2@company.com"
                  value={scheduleOptions?.recipients}
                  onChange={(e) => setScheduleOptions(prev => ({ ...prev, recipients: e?.target?.value }))}
                  className="w-full mt-1 px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleSchedule}
            >
              <Icon name="Calendar" size={16} className="mr-2" />
              Schedule
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
            >
              <Icon name="Download" size={16} className="mr-2" />
              Export Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;