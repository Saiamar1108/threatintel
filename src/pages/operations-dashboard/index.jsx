import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ActiveThreatCard from './components/ActiveThreatCard';
import ThreatMap from './components/ThreatMap';
import EscalationQueue from './components/EscalationQueue';
import TeamStatusPanel from './components/TeamStatusPanel';
import AlertNotifications from './components/AlertNotifications';
import SystemStatusIndicators from './components/SystemStatusIndicators';

const OperationsDashboard = () => {
  const [user] = useState({
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah.mitchell@threatintel.com",
    role: "operations"
  });

  // Mock data for active threats
  const [activeThreats] = useState([
    {
      id: 1,
      title: "Advanced Persistent Threat - APT29 Campaign",
      description: "Sophisticated phishing campaign targeting government infrastructure with custom malware deployment.",
      severity: "critical",
      detectedAt: "2025-01-10 15:30:00",
      affectedSystems: 12,
      cveId: "CVE-2025-0001",
      cvssScore: 9.8,
      attackVector: "Email/Network",
      assignedTo: "Alpha Team",
      priority: "P1",
      eta: "2 hours",
      acknowledged: false,
      mitigationTasks: [
        { description: "Isolate affected network segments", priority: "high" },
        { description: "Deploy emergency patches to vulnerable systems", priority: "high" },
        { description: "Monitor for lateral movement indicators", priority: "medium" },
        { description: "Coordinate with threat intelligence team", priority: "medium" },
        { description: "Prepare incident response documentation", priority: "low" }
      ]
    },
    {
      id: 2,
      title: "Ransomware Detection - BlackCat Variant",
      description: "Encrypted file signatures detected across multiple endpoints. Immediate containment required.",
      severity: "critical",
      detectedAt: "2025-01-10 14:45:00",
      affectedSystems: 8,
      cveId: "CVE-2025-0002",
      cvssScore: 9.2,
      attackVector: "RDP/SMB",
      assignedTo: "Bravo Team",
      priority: "P1",
      eta: "1.5 hours",
      acknowledged: true,
      mitigationTasks: [
        { description: "Disconnect affected systems from network", priority: "high" },
        { description: "Activate backup restoration procedures", priority: "high" },
        { description: "Analyze encryption patterns", priority: "medium" },
        { description: "Contact law enforcement if required", priority: "low" }
      ]
    },
    {
      id: 3,
      title: "Suspicious Network Traffic - Data Exfiltration",
      description: "Unusual outbound traffic patterns detected. Potential data theft in progress.",
      severity: "high",
      detectedAt: "2025-01-10 13:20:00",
      affectedSystems: 3,
      cveId: "CVE-2025-0003",
      cvssScore: 7.8,
      attackVector: "Network",
      assignedTo: "Charlie Team",
      priority: "P2",
      eta: "3 hours",
      acknowledged: true,
      mitigationTasks: [
        { description: "Block suspicious IP addresses", priority: "high" },
        { description: "Analyze network logs for IOCs", priority: "medium" },
        { description: "Implement DLP controls", priority: "medium" }
      ]
    }
  ]);

  // Mock data for escalations
  const [escalations] = useState([
    {
      id: 1,
      threatTitle: "Zero-Day Exploit in Production Systems",
      threatDescription: "Critical vulnerability discovered in core infrastructure components",
      reason: "Requires immediate C-level approval for emergency patching during business hours",
      escalatedBy: "Operations Team Lead",
      escalatedTo: "CISO Office",
      escalatedAt: "2025-01-10 16:15:00",
      status: "pending",
      priority: "critical",
      sla: "30 minutes",
      timeline: [
        { step: "Initial Detection", completed: true },
        { step: "Impact Assessment", completed: true },
        { step: "Escalation Request", completed: true },
        { step: "Leadership Review", completed: false },
        { step: "Response Authorization", completed: false }
      ],
      attachments: [
        { name: "vulnerability_report.pdf", size: "2.4 MB" },
        { name: "impact_analysis.xlsx", size: "1.1 MB" }
      ]
    },
    {
      id: 2,
      threatTitle: "Multi-Vector Attack Campaign",
      threatDescription: "Coordinated attack involving multiple threat vectors and advanced techniques",
      reason: "Complexity requires specialized threat hunting team and additional resources",
      escalatedBy: "Security Analyst",
      escalatedTo: "Threat Intelligence Team",
      escalatedAt: "2025-01-10 14:30:00",
      status: "in-progress",
      priority: "high",
      sla: "2 hours",
      timeline: [
        { step: "Threat Identification", completed: true },
        { step: "Initial Analysis", completed: true },
        { step: "Resource Request", completed: true },
        { step: "Team Assignment", completed: true },
        { step: "Deep Analysis", completed: false }
      ]
    }
  ]);

  // Mock data for response teams
  const [teams] = useState([
    {
      id: 1,
      name: "Alpha Response Team",
      specialization: "Critical Incident Response",
      location: "SOC - Floor 3",
      status: "available",
      responseTime: "< 5 minutes",
      workload: 25,
      successRate: 98,
      avgResolution: "2.3 hours",
      members: [
        { name: "John Carter", role: "Team Lead", status: "available" },
        { name: "Lisa Wong", role: "Security Analyst", status: "available" },
        { name: "Mike Rodriguez", role: "Incident Handler", status: "available" },
        { name: "Emma Thompson", role: "Forensics Specialist", status: "busy" }
      ],
      currentTasks: [
        { title: "APT29 Campaign Investigation", priority: "high", assignedAt: "14:30", eta: "2 hours", progress: 65 }
      ]
    },
    {
      id: 2,
      name: "Bravo Response Team",
      specialization: "Malware Analysis & Containment",
      location: "SOC - Floor 2",
      status: "busy",
      responseTime: "< 10 minutes",
      workload: 85,
      successRate: 95,
      avgResolution: "3.1 hours",
      members: [
        { name: "David Kim", role: "Team Lead", status: "busy" },
        { name: "Sarah Johnson", role: "Malware Analyst", status: "busy" },
        { name: "Alex Chen", role: "Reverse Engineer", status: "busy" },
        { name: "Maria Garcia", role: "Containment Specialist", status: "available" }
      ],
      currentTasks: [
        { title: "BlackCat Ransomware Analysis", priority: "high", assignedAt: "13:45", eta: "1.5 hours", progress: 80 },
        { title: "Malware Sample Processing", priority: "medium", assignedAt: "15:00", eta: "45 minutes", progress: 40 }
      ]
    },
    {
      id: 3,
      name: "Charlie Response Team",
      specialization: "Network Security & Monitoring",
      location: "NOC - Floor 1",
      status: "available",
      responseTime: "< 15 minutes",
      workload: 45,
      successRate: 92,
      avgResolution: "1.8 hours",
      members: [
        { name: "Robert Taylor", role: "Team Lead", status: "available" },
        { name: "Jennifer Lee", role: "Network Analyst", status: "available" },
        { name: "Tom Wilson", role: "Traffic Analyst", status: "available" }
      ],
      currentTasks: [
        { title: "Network Traffic Analysis", priority: "medium", assignedAt: "15:30", eta: "2 hours", progress: 30 }
      ]
    }
  ]);

  // Mock data for system status
  const [systems] = useState([
    {
      id: 1,
      name: "Primary Firewall Cluster",
      type: "Network Security",
      status: "operational",
      uptime: "99.98%",
      performance: 94,
      protectionLevel: "maximum",
      lastCheck: "2 minutes ago",
      cpuUsage: 45,
      memoryUsage: 62,
      alerts: []
    },
    {
      id: 2,
      name: "SIEM Platform",
      type: "Security Monitoring",
      status: "warning",
      uptime: "99.85%",
      performance: 87,
      protectionLevel: "high",
      lastCheck: "1 minute ago",
      cpuUsage: 78,
      memoryUsage: 85,
      alerts: [
        { message: "High CPU usage detected", timestamp: "5 minutes ago" },
        { message: "Log ingestion rate above threshold", timestamp: "12 minutes ago" }
      ]
    },
    {
      id: 3,
      name: "Endpoint Protection Suite",
      type: "Endpoint Security",
      status: "operational",
      uptime: "99.92%",
      performance: 96,
      protectionLevel: "maximum",
      lastCheck: "30 seconds ago",
      cpuUsage: 32,
      memoryUsage: 48
    },
    {
      id: 4,
      name: "Backup Infrastructure",
      type: "Data Protection",
      status: "maintenance",
      uptime: "99.95%",
      performance: 0,
      protectionLevel: "high",
      lastCheck: "Scheduled maintenance",
      cpuUsage: 0,
      memoryUsage: 0,
      alerts: [
        { message: "Scheduled maintenance in progress", timestamp: "30 minutes ago" }
      ]
    }
  ]);

  // Mock data for alerts
  const [alerts] = useState([
    {
      id: 1,
      title: "Critical System Breach Detected",
      description: "Unauthorized access attempt on production database server",
      severity: "critical",
      timestamp: "2025-01-10 16:45:00",
      source: "Database Monitor",
      progress: 25,
      dismissed: false
    },
    {
      id: 2,
      title: "Suspicious Login Activity",
      description: "Multiple failed login attempts from foreign IP addresses",
      severity: "high",
      timestamp: "2025-01-10 16:30:00",
      source: "Identity Management",
      dismissed: false
    },
    {
      id: 3,
      title: "Malware Signature Update Required",
      description: "New threat signatures available for deployment",
      severity: "medium",
      timestamp: "2025-01-10 16:00:00",
      source: "Antivirus Console",
      dismissed: false
    }
  ]);

  const handleThreatAcknowledge = (threatId) => {
    console.log(`Acknowledging threat: ${threatId}`);
  };

  const handleThreatEscalate = (threatId) => {
    console.log(`Escalating threat: ${threatId}`);
  };

  const handleAssignTask = (teamId) => {
    console.log(`Assigning task to team: ${teamId}`);
  };

  const handleUpdateEscalationStatus = (escalationId, status) => {
    console.log(`Updating escalation ${escalationId} to status: ${status}`);
  };

  const handleAssignTeam = (escalationId) => {
    console.log(`Assigning team to escalation: ${escalationId}`);
  };

  const handleUpdateAvailability = (teamId, status) => {
    console.log(`Updating team ${teamId} availability to: ${status}`);
  };

  const handleSystemAction = (systemId, action) => {
    console.log(`Performing ${action} on system: ${systemId}`);
  };

  const handleDismissAlert = (alertId) => {
    console.log(`Dismissing alert: ${alertId}`);
  };

  const handleViewAlertDetails = (alertId) => {
    console.log(`Viewing details for alert: ${alertId}`);
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        alerts={alerts}
        onLogout={handleLogout}
      />
      {/* Alert Notifications */}
      <AlertNotifications
        alerts={alerts}
        onDismiss={handleDismissAlert}
        onViewDetails={handleViewAlertDetails}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Operations Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Real-time threat monitoring and incident response coordination
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Last Updated</div>
                  <div className="text-sm font-medium text-foreground">
                    {new Date()?.toLocaleTimeString()}
                  </div>
                </div>
                <Button variant="default" iconName="RefreshCw" iconPosition="left">
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Threats</p>
                  <p className="text-3xl font-bold text-red-600">
                    {activeThreats?.filter(t => ['critical', 'high']?.includes(t?.severity))?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-red-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Icon name="TrendingUp" size={16} className="text-red-600 mr-1" />
                <span className="text-red-600">+2 from last hour</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Response Teams</p>
                  <p className="text-3xl font-bold text-green-600">
                    {teams?.filter(t => t?.status === 'available')?.length}/{teams?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Icon name="CheckCircle" size={16} className="text-green-600 mr-1" />
                <span className="text-green-600">All teams operational</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-3xl font-bold text-blue-600">8.5m</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Icon name="TrendingDown" size={16} className="text-green-600 mr-1" />
                <span className="text-green-600">-2.3m from target</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-threat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">System Health</p>
                  <p className="text-3xl font-bold text-accent">94%</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={24} className="text-accent" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Icon name="Shield" size={16} className="text-accent mr-1" />
                <span className="text-accent">All systems protected</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Active Threats */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Active Threats</h2>
                  <Link to="/threat-details">
                    <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
                      View All
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {activeThreats?.map((threat) => (
                    <ActiveThreatCard
                      key={threat?.id}
                      threat={threat}
                      onAcknowledge={handleThreatAcknowledge}
                      onEscalate={handleThreatEscalate}
                      onAssignTask={handleAssignTask}
                    />
                  ))}
                </div>
              </div>

              {/* Threat Map */}
              <ThreatMap threats={activeThreats} />
            </div>

            {/* Right Column - Status Panels */}
            <div className="space-y-6">
              {/* Escalation Queue */}
              <EscalationQueue
                escalations={escalations}
                onUpdateStatus={handleUpdateEscalationStatus}
                onAssignTeam={handleAssignTeam}
              />

              {/* Team Status */}
              <TeamStatusPanel
                teams={teams}
                onAssignTask={handleAssignTask}
                onUpdateAvailability={handleUpdateAvailability}
              />

              {/* System Status */}
              <SystemStatusIndicators
                systems={systems}
                onSystemAction={handleSystemAction}
              />
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6 shadow-threat-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => console.log('Emergency response activated')}
              >
                <Icon name="AlertTriangle" size={24} className="mb-2 text-red-600" />
                <span className="text-sm">Emergency Response</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => console.log('Lockdown initiated')}
              >
                <Icon name="Lock" size={24} className="mb-2 text-orange-600" />
                <span className="text-sm">Initiate Lockdown</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => console.log('Backup systems activated')}
              >
                <Icon name="Database" size={24} className="mb-2 text-blue-600" />
                <span className="text-sm">Backup Systems</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => console.log('Communication sent')}
              >
                <Icon name="MessageSquare" size={24} className="mb-2 text-green-600" />
                <span className="text-sm">Send Alert</span>
              </Button>
              
              <Link to="/daily-briefing">
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto w-full"
                >
                  <Icon name="FileText" size={24} className="mb-2 text-purple-600" />
                  <span className="text-sm">Daily Briefing</span>
                </Button>
              </Link>
              
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => console.log('Forensics initiated')}
              >
                <Icon name="Search" size={24} className="mb-2 text-indigo-600" />
                <span className="text-sm">Forensics</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OperationsDashboard;