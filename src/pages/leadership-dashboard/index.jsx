import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ExecutiveSummaryCard from './components/ExecutiveSummaryCard';
import ThreatDistributionChart from './components/ThreatDistributionChart';
import GeographicThreatMap from './components/GeographicThreatMap';
import WeeklyThreatSummary from './components/WeeklyThreatSummary';
import KPIMetrics from './components/KPIMetrics';
import AIInsightsPanel from './components/AIInsightsPanel';

const LeadershipDashboard = () => {
  const [user] = useState({
    name: "Sarah Chen",
    email: "sarah.chen@threatintel.com",
    role: "leadership"
  });

  const [alerts] = useState([
    {
      title: "Critical APT Group Activity Detected",
      severity: "critical",
      timestamp: "2 minutes ago"
    },
    {
      title: "Ransomware Campaign Targeting Healthcare",
      severity: "high",
      timestamp: "15 minutes ago"
    },
    {
      title: "Phishing Domain Registration Spike",
      severity: "medium",
      timestamp: "1 hour ago"
    }
  ]);

  // Executive Summary Data
  const executiveSummaryData = [
    {
      title: "Critical Threats",
      value: "12",
      change: "+3 from last week",
      changeType: "increase",
      icon: "AlertTriangle",
      color: "red"
    },
    {
      title: "Active Campaigns",
      value: "47",
      change: "-5 from last week",
      changeType: "decrease",
      icon: "Target",
      color: "orange"
    },
    {
      title: "Risk Score",
      value: "7.2/10",
      change: "+0.3 from last week",
      changeType: "increase",
      icon: "Shield",
      color: "blue"
    },
    {
      title: "Mitigation Rate",
      value: "94.5%",
      change: "+2.1% from last week",
      changeType: "decrease",
      icon: "CheckCircle",
      color: "green"
    }
  ];

  // Threat Distribution Data
  const threatDistributionData = [
    { severity: "Critical", count: 12 },
    { severity: "High", count: 28 },
    { severity: "Medium", count: 45 },
    { severity: "Low", count: 23 },
    { severity: "Info", count: 15 }
  ];

  // Geographic Threat Locations
  const threatLocations = [
    { city: "New York", country: "USA", x: 25, y: 35, threats: 45, severity: "High" },
    { city: "London", country: "UK", x: 50, y: 25, threats: 32, severity: "Medium" },
    { city: "Tokyo", country: "Japan", x: 85, y: 40, threats: 67, severity: "Critical" },
    { city: "Sydney", country: "Australia", x: 90, y: 75, threats: 18, severity: "Low" },
    { city: "Moscow", country: "Russia", x: 65, y: 20, threats: 89, severity: "High" },
    { city: "São Paulo", country: "Brazil", x: 30, y: 70, threats: 23, severity: "Medium" }
  ];

  // Weekly Threat Summaries
  const weeklyThreatSummaries = [
    {
      title: "Advanced Persistent Threat Campaign",
      severity: "Critical",
      description: `A sophisticated APT group has been identified targeting financial institutions across North America. The campaign utilizes zero-day exploits in enterprise software and employs advanced evasion techniques to maintain persistence in compromised networks.`,
      affectedSystems: 156,
      detectionTime: "2.3 hours",
      mitigationStatus: "In Progress"
    },
    {
      title: "Ransomware-as-a-Service Operation",
      severity: "High",
      description: `Intelligence indicates a new RaaS operation is actively recruiting affiliates and targeting healthcare organizations. The group has developed custom encryption tools and is demanding payments in multiple cryptocurrencies.`,
      affectedSystems: 89,
      detectionTime: "4.7 hours",
      mitigationStatus: "Contained"
    },
    {
      title: "Supply Chain Compromise Attempt",
      severity: "Medium",
      description: `Threat actors have been observed attempting to compromise software supply chains by targeting development environments and code repositories. Enhanced monitoring has been implemented across all vendor relationships.`,
      affectedSystems: 34,
      detectionTime: "1.8 hours",
      mitigationStatus: "Resolved"
    }
  ];

  // KPI Metrics Data
  const kpiMetrics = [
    {
      label: "Avg Response Time",
      value: "2.4h",
      change: "-23%",
      trend: "down",
      icon: "Clock",
      description: "Time to initial response"
    },
    {
      label: "Mitigation Success",
      value: "98.5%",
      change: "+1.2%",
      trend: "up",
      icon: "Shield",
      description: "Successful threat containment"
    },
    {
      label: "False Positives",
      value: "3.2%",
      change: "-0.8%",
      trend: "down",
      icon: "AlertCircle",
      description: "Accuracy improvement"
    }
  ];

  const kpiTrendData = [
    { day: 1, responseTime: 3.2 },
    { day: 5, responseTime: 2.8 },
    { day: 10, responseTime: 2.6 },
    { day: 15, responseTime: 2.4 },
    { day: 20, responseTime: 2.1 },
    { day: 25, responseTime: 2.3 },
    { day: 30, responseTime: 2.4 }
  ];

  // AI Insights Data
  const aiInsights = [
    {
      type: "prediction",
      priority: "high",
      title: "Predicted Threat Campaign Escalation",
      summary: "AI models predict a 78% probability of the current APT campaign expanding to target additional sectors within the next 72 hours.",
      confidence: 78,
      timeframe: "Next 72 hours",
      actionable: true,
      detailedAnalysis: `Machine learning analysis of historical attack patterns, current threat actor behavior, and geopolitical indicators suggests a high likelihood of campaign expansion. The threat group's infrastructure scaling and reconnaissance activities align with previous escalation patterns observed in similar campaigns.`,
      recommendations: [
        "Increase monitoring for lateral movement indicators",
        "Deploy additional honeypots in target sectors",
        "Enhance threat hunting activities across subsidiaries",
        "Coordinate with industry partners for intelligence sharing"
      ],
      metrics: {
        riskIncrease: "+15%",
        affectedSectors: 3,
        confidenceLevel: "78%"
      }
    },
    {
      type: "recommendation",
      priority: "medium",
      title: "Security Posture Optimization",
      summary: "Analysis suggests implementing zero-trust architecture could reduce attack surface by 45% and improve detection capabilities.",
      confidence: 85,
      timeframe: "Next quarter",
      actionable: true,
      detailedAnalysis: `Comprehensive security assessment indicates that current perimeter-based defenses are insufficient against modern threat vectors. Zero-trust implementation would provide enhanced visibility, granular access controls, and improved incident response capabilities.`,
      recommendations: [
        "Conduct zero-trust readiness assessment",
        "Pilot implementation in critical business units",
        "Develop phased migration strategy",
        "Establish success metrics and KPIs"
      ],
      metrics: {
        riskReduction: "45%",
        implementationTime: "6 months",
        costSavings: "$2.3M"
      }
    },
    {
      type: "analysis",
      priority: "low",
      title: "Threat Intelligence Quality Assessment",
      summary: "Current threat intelligence feeds show 92% accuracy with room for improvement in attribution and timing precision.",
      confidence: 92,
      timeframe: "Ongoing",
      actionable: false,
      detailedAnalysis: `Evaluation of threat intelligence sources reveals strong overall performance with opportunities for enhancement in specific areas. Attribution accuracy and threat timing predictions could benefit from additional data sources and improved correlation algorithms.`,
      recommendations: [
        "Integrate additional commercial threat feeds",
        "Enhance internal threat hunting capabilities",
        "Improve correlation algorithms",
        "Establish feedback loops with security teams"
      ],
      metrics: {
        accuracy: "92%",
        coverage: "87%",
        timeliness: "89%"
      }
    }
  ];

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} alerts={alerts} onLogout={handleLogout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Leadership Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Strategic threat intelligence overview and executive insights
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Schedule Briefing
                </Button>
                <Link to="/daily-briefing">
                  <Button variant="default" size="sm">
                    <Icon name="FileText" size={16} className="mr-2" />
                    Daily Briefing
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Executive Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {executiveSummaryData?.map((data, index) => (
              <ExecutiveSummaryCard key={index} {...data} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Threat Distribution Chart */}
            <ThreatDistributionChart data={threatDistributionData} chartType="pie" />
            
            {/* Geographic Threat Map */}
            <GeographicThreatMap threatLocations={threatLocations} />
          </div>

          {/* KPI Metrics */}
          <div className="mb-8">
            <KPIMetrics metrics={kpiMetrics} trendData={kpiTrendData} />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Weekly Threat Summary */}
            <WeeklyThreatSummary summaries={weeklyThreatSummaries} />
            
            {/* AI Insights Panel */}
            <AIInsightsPanel insights={aiInsights} />
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6 shadow-threat-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/analyst-dashboard" className="block">
                <div className="p-4 border border-border rounded-lg hover:shadow-threat-elevated transition-smooth cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Icon name="BarChart3" size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Analyst Dashboard</h4>
                      <p className="text-xs text-muted-foreground">Detailed threat analysis</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/operations-dashboard" className="block">
                <div className="p-4 border border-border rounded-lg hover:shadow-threat-elevated transition-smooth cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Icon name="Settings" size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Operations Center</h4>
                      <p className="text-xs text-muted-foreground">Incident response</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/threat-details" className="block">
                <div className="p-4 border border-border rounded-lg hover:shadow-threat-elevated transition-smooth cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <Icon name="Shield" size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Threat Intelligence</h4>
                      <p className="text-xs text-muted-foreground">Detailed threat data</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeadershipDashboard;