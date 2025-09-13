import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BriefingCard from './components/BriefingCard';
import ThreatTrendsChart from './components/ThreatTrendsChart';
import GeographicDistribution from './components/GeographicDistribution';
import PersonalizedInsights from './components/PersonalizedInsights';
import ExportPanel from './components/ExportPanel';

const DailyBriefing = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock user data - in real app, get from auth context
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@threatintel.com",
      role: "analyst" // leadership, analyst, operations
    };
    setUser(mockUser);
  }, []);

  // Mock briefing data
  const briefingData = [
    {
      id: 1,
      title: "Critical APT Campaign Targeting Financial Sector",
      severity: "critical",
      timestamp: "2025-01-10 06:30 AM",
      affectedSectors: ["Financial", "Healthcare"],
      confidence: 95,
      summary: "A sophisticated Advanced Persistent Threat (APT) campaign has been identified targeting major financial institutions across North America and Europe. The attack leverages zero-day vulnerabilities in widely-used banking software.",
      strategicSummary: "This campaign poses significant risk to organizational reputation and regulatory compliance. Immediate board-level attention required for crisis management planning and stakeholder communication strategy.",
      technicalDetails: "The malware uses advanced evasion techniques including process hollowing, API hooking, and encrypted C2 communications. Initial vector appears to be spear-phishing emails with weaponized PDF attachments exploiting CVE-2025-0001.",
      actionableItems: "1. Immediately patch all banking software to latest versions\n2. Deploy additional network monitoring on financial transaction systems\n3. Conduct emergency phishing awareness training for all staff\n4. Review and test incident response procedures",
      emergingThreats: [
        "New variant of banking trojan detected in the wild",
        "Increased targeting of mobile banking applications",
        "Social engineering attacks on customer service representatives"
      ],
      recommendations: [
        "Implement zero-trust network architecture for critical systems",
        "Deploy advanced email security solutions with AI-powered detection",
        "Conduct red team exercises to test current security posture"
      ],
      metrics: {
        threatsDetected: 47,
        incidentsResolved: 12,
        riskReduction: 23
      }
    },
    {
      id: 2,
      title: "Ransomware Group Shifts Tactics to Cloud Infrastructure",
      severity: "high",
      timestamp: "2025-01-10 05:45 AM",
      affectedSectors: ["Technology", "Manufacturing"],
      confidence: 88,
      summary: "The notorious RansomCloud group has pivoted their attack methodology to specifically target cloud infrastructure and SaaS platforms, affecting multiple organizations globally.",
      strategicSummary: "Cloud security investments require immediate review and enhancement. Consider engaging with cloud security specialists and reviewing vendor security agreements.",
      technicalDetails: "Attackers are exploiting misconfigured cloud storage buckets and weak IAM policies. They\'re using legitimate cloud management tools to maintain persistence and avoid detection.",
      actionableItems: "1. Audit all cloud storage configurations and access policies\n2. Enable multi-factor authentication on all cloud admin accounts\n3. Review and restrict cloud service permissions\n4. Implement cloud security monitoring tools",
      emergingThreats: [
        "Targeting of Kubernetes clusters with cryptomining malware",
        "Abuse of cloud automation tools for lateral movement"
      ],
      recommendations: [
        "Implement cloud security posture management (CSPM) tools",
        "Regular security assessments of cloud configurations"
      ],
      metrics: {
        threatsDetected: 23,
        incidentsResolved: 8,
        riskReduction: 15
      }
    },
    {
      id: 3,
      title: "Supply Chain Attack on Software Development Tools",
      severity: "medium",
      timestamp: "2025-01-10 04:20 AM",
      affectedSectors: ["Technology", "Software"],
      confidence: 76,
      summary: "A supply chain compromise has been discovered in a popular software development framework, potentially affecting thousands of applications built using the compromised tools.",
      strategicSummary: "Review all third-party software dependencies and establish vendor risk management protocols. Consider impact on product development timelines and customer communications.",
      technicalDetails: "The compromise involves malicious code injection into the build pipeline of a widely-used JavaScript framework. The malicious code collects environment variables and API keys during the build process.",
      actionableItems: "1. Inventory all applications using the affected framework\n2. Scan development environments for indicators of compromise\n3. Rotate all API keys and credentials used in affected projects\n4. Review and enhance software supply chain security practices",
      emergingThreats: [
        "Increased targeting of open-source package repositories",
        "Sophisticated attacks on CI/CD pipelines"
      ],
      recommendations: [
        "Implement software composition analysis (SCA) tools",
        "Establish secure software development lifecycle practices"
      ],
      metrics: {
        threatsDetected: 15,
        incidentsResolved: 6,
        riskReduction: 8
      }
    }
  ];

  // Mock threat trends data
  const threatTrendsData = [
    { time: "Jan 04", critical: 12, high: 28, medium: 45, low: 23 },
    { time: "Jan 05", critical: 8, high: 32, medium: 38, low: 28 },
    { time: "Jan 06", critical: 15, high: 25, medium: 42, low: 31 },
    { time: "Jan 07", critical: 6, high: 29, medium: 48, low: 25 },
    { time: "Jan 08", critical: 11, high: 35, medium: 41, low: 29 },
    { time: "Jan 09", critical: 9, high: 31, medium: 44, low: 33 },
    { time: "Jan 10", critical: 18, high: 27, medium: 39, low: 27 }
  ];

  // Mock geographic distribution data
  const geographicData = [
    { name: "North America", value: 156, topThreat: "Banking Malware" },
    { name: "Europe", value: 142, topThreat: "Ransomware" },
    { name: "Asia Pacific", value: 98, topThreat: "APT Campaigns" },
    { name: "Middle East", value: 67, topThreat: "State-sponsored" },
    { name: "Africa", value: 34, topThreat: "Cryptomining" },
    { name: "South America", value: 28, topThreat: "Phishing" }
  ];

  // Mock personalized insights based on user role
  const getPersonalizedInsights = (userRole) => {
    const baseInsights = {
      leadership: {
        priority: [
          {
            title: "Board-Level Security Briefing Required",
            description: "Critical APT campaign requires immediate executive attention and potential crisis management activation.",
            priority: "urgent",
            actions: [
              { type: "escalate", label: "Schedule Board Meeting", id: "board-1" },
              { type: "review", label: "Review Crisis Plan", id: "crisis-1" }
            ]
          },
          {
            title: "Quarterly Security Investment Review",
            description: "Current threat landscape suggests need for increased cloud security investments and vendor risk management.",
            priority: "high",
            actions: [
              { type: "review", label: "Budget Analysis", id: "budget-1" },
              { type: "implement", label: "Vendor Assessment", id: "vendor-1" }
            ]
          }
        ],
        recommendations: [
          { text: "Consider engaging external incident response firm for critical APT campaign", confidence: 92, actionable: true, id: "rec-1" },
          { text: "Implement board-level cybersecurity dashboard for real-time threat visibility", confidence: 85, actionable: true, id: "rec-2" }
        ],
        metrics: {
          riskScore: { value: "High", label: "Overall Risk Score", trend: "up", change: "+12%" },
          budgetImpact: { value: "$2.3M", label: "Potential Impact", trend: "up", change: "+15%" },
          compliance: { value: "87%", label: "Compliance Score", trend: "down", change: "-3%" },
          incidents: { value: "23", label: "Active Incidents", trend: "up", change: "+8" }
        },
        recentActivities: [
          { description: "Emergency security meeting scheduled with CISO", timestamp: "2 hours ago", id: "act-1" },
          { description: "Board notification sent regarding critical threats", timestamp: "4 hours ago", id: "act-2" },
          { description: "Crisis management team activated", timestamp: "6 hours ago", id: "act-3" }
        ]
      },
      analyst: {
        priority: [
          {
            title: "Zero-Day Vulnerability Analysis Required",
            description: "CVE-2025-0001 exploitation detected in APT campaign requires immediate technical analysis and IOC development.",
            priority: "urgent",
            actions: [
              { type: "investigate", label: "Analyze Samples", id: "analysis-1" },
              { type: "implement", label: "Create IOCs", id: "ioc-1" }
            ]
          },
          {
            title: "Threat Intelligence Correlation",
            description: "Multiple campaigns showing similar TTPs suggest coordinated threat actor activity requiring deeper investigation.",
            priority: "high",
            actions: [
              { type: "investigate", label: "TTP Analysis", id: "ttp-1" },
              { type: "monitor", label: "Actor Tracking", id: "actor-1" }
            ]
          }
        ],
        recommendations: [
          { text: "Deploy additional honeypots to capture APT campaign artifacts", confidence: 89, actionable: true, id: "rec-3" },
          { text: "Enhance YARA rules for banking malware detection", confidence: 94, actionable: true, id: "rec-4" },
          { text: "Correlate with external threat intelligence feeds for attribution", confidence: 78, actionable: false, id: "rec-5" }
        ],
        metrics: {
          iocs: { value: "247", label: "New IOCs", trend: "up", change: "+34" },
          samples: { value: "89", label: "Samples Analyzed", trend: "up", change: "+12" },
          attribution: { value: "73%", label: "Attribution Confidence", trend: "up", change: "+5%" },
          coverage: { value: "94%", label: "Detection Coverage", trend: "stable", change: "0%" }
        },
        recentActivities: [
          { description: "Completed malware family analysis for banking trojan", timestamp: "1 hour ago", id: "act-4" },
          { description: "Updated threat intelligence database with new IOCs", timestamp: "3 hours ago", id: "act-5" },
          { description: "Collaborated with external researchers on APT attribution", timestamp: "5 hours ago", id: "act-6" }
        ]
      },
      operations: {
        priority: [
          {
            title: "Immediate Patch Deployment Required",
            description: "Critical vulnerabilities in banking software require emergency patching across all financial systems.",
            priority: "urgent",
            actions: [
              { type: "implement", label: "Deploy Patches", id: "patch-1" },
              { type: "monitor", label: "System Monitoring", id: "monitor-1" }
            ]
          },
          {
            title: "Network Segmentation Review",
            description: "APT campaign lateral movement requires immediate review and enhancement of network segmentation controls.",
            priority: "high",
            actions: [
              { type: "review", label: "Segment Analysis", id: "segment-1" },
              { type: "implement", label: "Enhanced Controls", id: "controls-1" }
            ]
          }
        ],
        recommendations: [
          { text: "Implement additional network monitoring on financial transaction systems", confidence: 96, actionable: true, id: "rec-6" },
          { text: "Deploy emergency phishing awareness training for all staff", confidence: 91, actionable: true, id: "rec-7" },
          { text: "Review and test incident response procedures", confidence: 87, actionable: true, id: "rec-8" }
        ],
        metrics: {
          patches: { value: "156", label: "Patches Deployed", trend: "up", change: "+23" },
          monitoring: { value: "99.2%", label: "System Uptime", trend: "stable", change: "0%" },
          incidents: { value: "12", label: "Active Incidents", trend: "down", change: "-3" },
          response: { value: "8.5min", label: "Avg Response Time", trend: "down", change: "-2.1min" }
        },
        recentActivities: [
          { description: "Completed emergency patching of banking software", timestamp: "30 minutes ago", id: "act-7" },
          { description: "Enhanced monitoring deployed on critical systems", timestamp: "2 hours ago", id: "act-8" },
          { description: "Incident response team briefed on APT campaign", timestamp: "4 hours ago", id: "act-9" }
        ]
      }
    };

    return baseInsights?.[userRole] || baseInsights?.analyst;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastRefresh(new Date());
    setIsRefreshing(false);
  };

  const handleShare = (briefingId) => {
    // Mock share functionality
    console.log('Sharing briefing:', briefingId);
  };

  const handleEscalate = (briefingId) => {
    // Mock escalation functionality
    console.log('Escalating briefing:', briefingId);
  };

  const handleViewDetails = (itemId) => {
    navigate('/threat-details', { state: { itemId } });
  };

  const handleScheduleAnalysis = () => {
    // Mock schedule analysis functionality
    console.log('Scheduling analysis');
  };

  const handleExport = (exportData) => {
    console.log('Exporting briefing:', exportData);
    setIsExportPanelOpen(false);
  };

  const handleScheduleExport = (scheduleData) => {
    console.log('Scheduling export:', scheduleData);
    setIsExportPanelOpen(false);
  };

  const handleLogout = () => {
    navigate('/authentication');
  };

  // Mock alerts for header
  const mockAlerts = [
    {
      title: "Critical APT Campaign Detected",
      severity: "critical",
      timestamp: "5 minutes ago"
    },
    {
      title: "Ransomware Activity Increased",
      severity: "high",
      timestamp: "15 minutes ago"
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        alerts={mockAlerts}
        onLogout={handleLogout}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Daily Briefing</h1>
              <p className="text-muted-foreground mt-2">
                Automated threat intelligence summary for {new Date()?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>Last updated: {lastRefresh?.toLocaleTimeString()}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="User" size={14} />
                  <span>Personalized for {user?.role} role</span>
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
                loading={isRefreshing}
              >
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsExportPanelOpen(true)}
              >
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/threat-details')}
              >
                <Icon name="Search" size={16} className="mr-2" />
                Detailed Analysis
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-8">
              {/* Briefing Cards */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Icon name="FileText" size={20} className="mr-2" />
                  Threat Intelligence Summary
                </h2>
                <div className="space-y-6">
                  {briefingData?.map((briefing) => (
                    <BriefingCard
                      key={briefing?.id}
                      briefing={briefing}
                      userRole={user?.role}
                      onShare={handleShare}
                      onEscalate={handleEscalate}
                    />
                  ))}
                </div>
              </div>

              {/* Threat Trends Chart */}
              <ThreatTrendsChart data={threatTrendsData} timeframe="7d" />

              {/* Geographic Distribution */}
              <GeographicDistribution data={geographicData} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Personalized Insights */}
              <PersonalizedInsights
                userRole={user?.role}
                insights={getPersonalizedInsights(user?.role)}
                onViewDetails={handleViewDetails}
                onScheduleAnalysis={handleScheduleAnalysis}
              />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Zap" size={18} className="mr-2" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/threat-details')}
                  >
                    <Icon name="Search" size={16} className="mr-2" />
                    Search Threat Database
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate(`/${user?.role}-dashboard`)}
                  >
                    <Icon name="LayoutDashboard" size={16} className="mr-2" />
                    Return to Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setIsExportPanelOpen(true)}
                  >
                    <Icon name="Share2" size={16} className="mr-2" />
                    Share Briefing
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={handleScheduleAnalysis}
                  >
                    <Icon name="Calendar" size={16} className="mr-2" />
                    Schedule Follow-up
                  </Button>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Activity" size={18} className="mr-2" />
                  System Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Threat Feeds</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm text-success">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">AI Analysis</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm text-success">Running</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Data Sync</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-warning rounded-full animate-pulse-slow"></div>
                      <span className="text-sm text-warning">Syncing</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Export Service</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm text-success">Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Export Panel */}
      <ExportPanel
        isVisible={isExportPanelOpen}
        onClose={() => setIsExportPanelOpen(false)}
        onExport={handleExport}
        onSchedule={handleScheduleExport}
      />
    </div>
  );
};

export default DailyBriefing;