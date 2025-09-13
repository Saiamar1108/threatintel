import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ThreatHeader from './components/ThreatHeader';
import TechnicalDetails from './components/TechnicalDetails';
import AIInsights from './components/AIInsights';
import RelatedThreats from './components/RelatedThreats';
import GeographicImpact from './components/GeographicImpact';
import InvestigationNotes from './components/InvestigationNotes';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ThreatDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [threat, setThreat] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock current user
  const currentUser = {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@threatintel.com",
    role: "analyst"
  };

  // Mock threat data
  const mockThreatData = {
    id: id || "CVE-2024-0001",
    cveId: "CVE-2024-0001",
    title: "Critical Remote Code Execution in Apache Struts",
    description: `A critical vulnerability has been discovered in Apache Struts 2.5.x through 2.5.30 and 6.0.0 through 6.1.2.1 that allows remote code execution via OGNL injection when parsing untrusted user input. This vulnerability can be exploited by sending specially crafted HTTP requests to applications using vulnerable versions of Apache Struts.\n\nThe vulnerability stems from insufficient input validation in the framework's parameter parsing mechanism, allowing attackers to inject malicious OGNL expressions that are subsequently evaluated by the server.`,
    severity: "Critical",
    status: "Active",
    cvssScore: 9.8,
    publishedDate: "2024-09-08",
    lastUpdated: "2024-09-10",
    affectedSystems: "15,000+",
    exploitAvailable: true,
    patchAvailable: true,
    impactLevel: "High",
    exploitCode: `This vulnerability can be exploited through HTTP POST requests containing malicious OGNL expressions in parameter values. Attackers can achieve remote code execution by crafting requests that bypass input validation filters.\n\nProof-of-concept exploits are publicly available and have been observed in active exploitation campaigns targeting web applications using vulnerable Struts versions.`,
    patchInfo: `Apache has released patches for this vulnerability:\n- Apache Struts 2.5.31 (for 2.5.x branch)\n- Apache Struts 6.1.2.2 (for 6.x branch)\n\nOrganizations should prioritize immediate patching due to active exploitation. Temporary mitigations include implementing WAF rules to block malicious OGNL expressions.`,
    impactAssessment: `This vulnerability poses a critical risk to organizations running web applications built with Apache Struts. Successful exploitation can lead to:\n- Complete system compromise\n- Data exfiltration\n- Lateral movement within networks\n- Installation of persistent backdoors\n\nThe vulnerability affects both internet-facing and internal applications, making it particularly dangerous for enterprise environments.`,
    references: [
      {
        title: "Apache Struts Security Advisory",
        url: "https://struts.apache.org/security/"
      },
      {
        title: "CVE-2024-0001 Details",
        url: "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-0001"
      },
      {
        title: "NIST Vulnerability Database",
        url: "https://nvd.nist.gov/vuln/detail/CVE-2024-0001"
      }
    ],
    affectedSystemsDetails: [
      {
        name: "Apache Struts 2.5.x",
        versions: "2.5.0 - 2.5.30",
        patchStatus: "Patched"
      },
      {
        name: "Apache Struts 6.0.x",
        versions: "6.0.0 - 6.1.2.1",
        patchStatus: "Patched"
      },
      {
        name: "Legacy Applications",
        versions: "Various",
        patchStatus: "Vulnerable"
      }
    ],
    threatActors: [
      {
        name: "APT-29 (Cozy Bear)",
        type: "Nation-State",
        description: "Russian state-sponsored group known for sophisticated cyber espionage campaigns",
        tactics: ["Spear Phishing", "Web Shell Deployment", "Credential Harvesting"]
      },
      {
        name: "Lazarus Group",
        type: "Nation-State",
        description: "North Korean threat group conducting financially motivated and espionage operations",
        tactics: ["Supply Chain Attacks", "Cryptocurrency Theft", "Ransomware"]
      }
    ]
  };

  // Mock AI insights
  const mockAIInsights = {
    contextualAnalysis: {
      confidence: 92,
      analysis: `This vulnerability represents a significant escalation in web application security threats. The combination of widespread Apache Struts deployment and the ease of exploitation makes this a prime target for both opportunistic attackers and advanced persistent threat groups.\n\nHistorical analysis shows similar Struts vulnerabilities (CVE-2017-5638, CVE-2018-11776) were rapidly weaponized and led to major data breaches including Equifax. The current threat landscape suggests this vulnerability will follow a similar pattern.`
    },
    attackVectorAssessment: {
      confidence: 88,
      assessment: `Primary attack vectors include direct exploitation of internet-facing applications and lateral movement through internal networks. The vulnerability's HTTP-based exploitation method makes it particularly attractive for automated scanning and mass exploitation campaigns.\n\nSecondary vectors involve supply chain compromises where attackers target managed service providers or cloud platforms hosting vulnerable applications.`,
      vectors: ["HTTP Parameter Injection", "OGNL Expression Evaluation", "Remote Code Execution", "Web Shell Deployment"]
    },
    countermeasures: {
      confidence: 95,
      recommendations: [
        {
          priority: "High",
          action: "Immediate Patching",
          description: "Deploy Apache Struts 2.5.31 or 6.1.2.2 immediately to all affected systems"
        },
        {
          priority: "High",
          action: "WAF Rule Implementation",
          description: "Configure web application firewalls to block OGNL injection patterns"
        },
        {
          priority: "Medium",
          action: "Network Segmentation",
          description: "Isolate vulnerable applications until patching is complete"
        },
        {
          priority: "Medium",
          action: "Enhanced Monitoring",
          description: "Implement detection rules for OGNL injection attempts and unusual web traffic"
        }
      ]
    },
    riskAssessment: {
      exploitationRisk: 95,
      timeToExploit: "< 24 hours",
      affectedUsers: "2.5M+"
    }
  };

  // Mock related threats
  const mockRelatedThreats = [
    {
      id: "CVE-2023-0002",
      cveId: "CVE-2023-0002",
      description: "Remote code execution vulnerability in Apache Struts 2.3.x series affecting parameter parsing",
      severity: "High",
      cvssScore: 8.1,
      publishedDate: "2023-12-15",
      similarity: 87,
      exploitAvailable: true,
      correlationTags: ["Apache Struts", "RCE", "OGNL Injection"],
      campaignName: "Operation WebStrike",
      affectedSystems: "8,500"
    },
    {
      id: "CVE-2023-0003",
      cveId: "CVE-2023-0003",
      description: "Input validation bypass in Spring Framework leading to remote code execution",
      severity: "Critical",
      cvssScore: 9.1,
      publishedDate: "2023-11-22",
      similarity: 73,
      exploitAvailable: false,
      correlationTags: ["Spring Framework", "Input Validation", "RCE"],
      campaignName: "SpringShell Campaign",
      affectedSystems: "12,000"
    },
    {
      id: "CVE-2023-0004",
      cveId: "CVE-2023-0004",
      description: "Deserialization vulnerability in Jackson library used by multiple Java frameworks",
      severity: "High",
      cvssScore: 8.8,
      publishedDate: "2023-10-08",
      similarity: 65,
      exploitAvailable: true,
      correlationTags: ["Jackson", "Deserialization", "Java"],
      campaignName: "DeserialKiller",
      affectedSystems: "20,000"
    }
  ];

  // Mock geographic data
  const mockGeographicData = {
    regions: [
      {
        name: "North America",
        riskLevel: "High",
        affectedSystems: 45000,
        activeCampaigns: 12,
        lastActivity: "2 hours ago",
        description: "Highest concentration of vulnerable systems due to widespread enterprise adoption of Apache Struts",
        topCountries: [
          { name: "United States", incidents: 28500 },
          { name: "Canada", incidents: 8200 },
          { name: "Mexico", incidents: 3100 }
        ]
      },
      {
        name: "Europe",
        riskLevel: "High",
        affectedSystems: 38000,
        activeCampaigns: 9,
        lastActivity: "4 hours ago",
        description: "Significant exposure in financial and government sectors with active exploitation attempts",
        topCountries: [
          { name: "Germany", incidents: 12000 },
          { name: "United Kingdom", incidents: 9500 },
          { name: "France", incidents: 7800 }
        ]
      },
      {
        name: "Asia Pacific",
        riskLevel: "Medium",
        affectedSystems: 22000,
        activeCampaigns: 6,
        lastActivity: "6 hours ago",
        description: "Growing threat landscape with increasing adoption of vulnerable frameworks",
        topCountries: [
          { name: "Japan", incidents: 8500 },
          { name: "Australia", incidents: 6200 },
          { name: "South Korea", incidents: 4100 }
        ]
      }
    ],
    attackVectors: [
      { type: "Direct Web Exploitation", percentage: 65 },
      { type: "Lateral Movement", percentage: 25 },
      { type: "Supply Chain", percentage: 10 }
    ],
    timeline: [
      {
        region: "North America",
        activity: "Mass scanning detected targeting Struts applications",
        timestamp: "2 hours ago"
      },
      {
        region: "Europe",
        activity: "Successful exploitation confirmed in financial sector",
        timestamp: "4 hours ago"
      },
      {
        region: "Asia Pacific",
        activity: "Increased reconnaissance activity observed",
        timestamp: "6 hours ago"
      }
    ],
    insights: [
      {
        title: "Peak Activity Hours",
        description: "Exploitation attempts peak during 09:00-17:00 UTC, suggesting automated scanning tools"
      },
      {
        title: "Sector Targeting",
        description: "Financial services and government sectors show 3x higher exploitation rates"
      },
      {
        title: "Geographic Correlation",
        description: "Attack patterns suggest coordinated campaigns originating from specific regions"
      }
    ]
  };

  // Mock investigation notes
  const mockNotes = [
    {
      id: 1,
      content: "Initial analysis confirms this is a zero-day exploitation. Observed in-the-wild attacks targeting government infrastructure. Recommend immediate escalation to CISA.",
      author: "Sarah Chen",
      timestamp: "2024-09-10 14:30:00",
      type: "investigation"
    },
    {
      id: 2,
      content: "Identified IOCs: Suspicious HTTP requests with OGNL patterns. Web shells deployed at /uploads/shell.jsp. Recommend blocking these patterns at WAF level.",
      author: "Mike Rodriguez",
      timestamp: "2024-09-10 13:15:00",
      type: "analysis"
    },
    {
      id: 3,
      content: "Coordinated with Apache security team. Patch ETA is 48 hours. Implementing temporary mitigations including request filtering and application isolation.",
      author: "Lisa Wang",
      timestamp: "2024-09-10 12:00:00",
      type: "mitigation"
    }
  ];

  const alerts = [
    {
      title: "Critical CVE Exploitation Detected",
      severity: "critical",
      timestamp: "5 minutes ago"
    },
    {
      title: "Suspicious Network Activity",
      severity: "high",
      timestamp: "15 minutes ago"
    }
  ];

  useEffect(() => {
    // Simulate loading threat data
    const loadThreatData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setThreat(mockThreatData);
      setNotes(mockNotes);
      setLoading(false);
    };

    loadThreatData();
  }, [id]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing threat details...');
  };

  const handleEscalate = () => {
    // Implement escalation functionality
    console.log('Escalating threat...');
  };

  const handleThreatClick = (threatId) => {
    navigate(`/threat-details/${threatId}`);
  };

  const handleAddNote = (note) => {
    setNotes(prev => [note, ...prev]);
  };

  const handleDeleteNote = (noteId) => {
    setNotes(prev => prev?.filter(note => note?.id !== noteId));
  };

  const handleUpdateNote = (noteId, content) => {
    setNotes(prev => prev?.map(note => 
      note?.id === noteId ? { ...note, content } : note
    ));
  };

  const handleLogout = () => {
    navigate('/authentication');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'technical', label: 'Technical Details', icon: 'Settings' },
    { id: 'ai-insights', label: 'AI Insights', icon: 'Brain' },
    { id: 'related', label: 'Related Threats', icon: 'Link' },
    { id: 'geographic', label: 'Geographic Impact', icon: 'Globe' },
    { id: 'notes', label: 'Investigation Notes', icon: 'FileText' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={currentUser} alerts={alerts} onLogout={handleLogout} />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading threat details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!threat) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={currentUser} alerts={alerts} onLogout={handleLogout} />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <Icon name="AlertCircle" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">Threat Not Found</h2>
              <p className="text-muted-foreground mb-4">The requested threat details could not be found.</p>
              <Button onClick={() => navigate('/analyst-dashboard')}>
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} alerts={alerts} onLogout={handleLogout} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button 
              onClick={() => navigate('/analyst-dashboard')}
              className="hover:text-foreground transition-smooth"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Threat Details</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">{threat?.cveId}</span>
          </div>

          {/* Threat Header */}
          <ThreatHeader
            threat={threat}
            onBookmark={handleBookmark}
            onShare={handleShare}
            onEscalate={handleEscalate}
            isBookmarked={isBookmarked}
          />

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg mb-6">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <TechnicalDetails threat={threat} />
                  <AIInsights insights={mockAIInsights} />
                </div>
                <div className="space-y-6">
                  <RelatedThreats 
                    relatedThreats={mockRelatedThreats} 
                    onThreatClick={handleThreatClick} 
                  />
                </div>
              </div>
            )}

            {activeTab === 'technical' && (
              <TechnicalDetails threat={threat} />
            )}

            {activeTab === 'ai-insights' && (
              <AIInsights insights={mockAIInsights} />
            )}

            {activeTab === 'related' && (
              <RelatedThreats 
                relatedThreats={mockRelatedThreats} 
                onThreatClick={handleThreatClick} 
              />
            )}

            {activeTab === 'geographic' && (
              <GeographicImpact geographicData={mockGeographicData} />
            )}

            {activeTab === 'notes' && (
              <InvestigationNotes
                notes={notes}
                onAddNote={handleAddNote}
                onDeleteNote={handleDeleteNote}
                onUpdateNote={handleUpdateNote}
                currentUser={currentUser}
              />
            )}
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="default"
                  iconName="FileDown"
                  onClick={() => {/* Handle report generation */}}
                >
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  iconName="Users"
                  onClick={() => {/* Handle team sharing */}}
                >
                  Share with Team
                </Button>
                <Button
                  variant="outline"
                  iconName="Bell"
                  onClick={() => {/* Handle alert setup */}}
                >
                  Set Alert
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Last updated: {threat?.lastUpdated} | Viewed by {currentUser?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatDetailsPage;