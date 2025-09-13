import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ThreatOverview from './components/ThreatOverview';
import ThreatFeedTable from './components/ThreatFeedTable';
import ThreatFilters from './components/ThreatFilters';
import ThreatAnalytics from './components/ThreatAnalytics';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AnalystDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState('overview');
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  // Mock threat data
  const mockThreats = [
    {
      id: 'CVE-2024-8956',
      cveId: 'CVE-2024-8956',
      title: 'Critical Remote Code Execution in Apache Struts',
      description: `A critical vulnerability in Apache Struts allows remote code execution through improper input validation in the file upload mechanism. Attackers can exploit this by sending specially crafted requests to execute arbitrary code on the target system.`,
      severity: 'critical',
      score: 9.8,
      actors: ['APT29', 'Lazarus Group'],
      timestamp: '2024-09-10T17:38:00Z',
      source: 'NVD',
      type: 'vulnerability',
      status: 'investigating'
    },
    {
      id: 'TH-2024-0912',
      cveId: 'TH-2024-0912',
      title: 'APT29 Campaign Targeting Financial Institutions',
      description: `Advanced persistent threat group APT29 has been observed conducting a sophisticated campaign against financial institutions using spear-phishing emails with malicious attachments. The campaign leverages zero-day exploits and custom malware.`,
      severity: 'high',
      score: 8.5,
      actors: ['APT29', 'Cozy Bear'],
      timestamp: '2024-09-10T17:25:00Z',
      source: 'OSINT',
      type: 'apt',
      status: 'analyzing'
    },
    {
      id: 'MAL-2024-0156',
      cveId: 'MAL-2024-0156',
      title: 'Cobalt Strike Beacon Activity in Corporate Networks',
      description: `Multiple instances of Cobalt Strike beacon activity have been detected across corporate networks. The malware is using DNS tunneling for command and control communication and has been linked to ransomware operations.`,
      severity: 'high',
      score: 8.2,
      actors: ['BlackCat', 'Conti'],
      timestamp: '2024-09-10T17:08:00Z',
      source: 'Commercial',
      type: 'malware',
      status: 'confirmed'
    },
    {
      id: 'PHI-2024-0789',
      cveId: 'PHI-2024-0789',
      title: 'COVID-19 Themed Phishing Campaign',
      description: `A large-scale phishing campaign is using COVID-19 health updates as lures to steal credentials. The emails contain malicious links that redirect users to fake login pages designed to harvest usernames and passwords.`,
      severity: 'medium',
      score: 6.5,
      actors: ['Unknown', 'Scattered Spider'],
      timestamp: '2024-09-10T16:45:00Z',
      source: 'Community',
      type: 'phishing',
      status: 'monitoring'
    },
    {
      id: 'CVE-2024-7834',
      cveId: 'CVE-2024-7834',
      title: 'SQL Injection in Popular CMS Platform',
      description: `A SQL injection vulnerability has been discovered in a widely-used content management system. The vulnerability allows attackers to extract sensitive information from databases and potentially gain administrative access.`,
      severity: 'high',
      score: 7.8,
      actors: ['Script Kiddies', 'Magecart'],
      timestamp: '2024-09-10T16:20:00Z',
      source: 'NVD',
      type: 'vulnerability',
      status: 'investigating'
    },
    {
      id: 'RAN-2024-0234',
      cveId: 'RAN-2024-0234',
      title: 'LockBit Ransomware Targeting Healthcare',
      description: `The LockBit ransomware group has been specifically targeting healthcare organizations with a new variant that includes improved encryption algorithms and anti-analysis techniques. Multiple hospitals have been affected.`,
      severity: 'critical',
      score: 9.2,
      actors: ['LockBit', 'BlackMatter'],
      timestamp: '2024-09-10T15:55:00Z',
      source: 'Government',
      type: 'ransomware',
      status: 'confirmed'
    },
    {
      id: 'IOC-2024-1123',
      cveId: 'IOC-2024-1123',
      title: 'Suspicious Domain Registration Pattern',
      description: `A pattern of suspicious domain registrations has been identified, with domains mimicking legitimate financial services. These domains are likely being prepared for future phishing or malware distribution campaigns.`,
      severity: 'medium',
      score: 5.8,
      actors: ['Unknown'],
      timestamp: '2024-09-10T15:30:00Z',
      source: 'OSINT',
      type: 'phishing',
      status: 'monitoring'
    },
    {
      id: 'CVE-2024-6745',
      cveId: 'CVE-2024-6745',
      title: 'Buffer Overflow in Network Management Software',
      description: `A buffer overflow vulnerability in enterprise network management software could allow attackers to execute arbitrary code with elevated privileges. The vulnerability affects multiple versions of the software.`,
      severity: 'high',
      score: 8.1,
      actors: ['APT40', 'Volt Typhoon'],
      timestamp: '2024-09-10T14:45:00Z',
      source: 'Commercial',
      type: 'vulnerability',
      status: 'analyzing'
    }
  ];

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      title: 'Critical CVE detected in production systems',
      severity: 'critical',
      timestamp: '2 minutes ago',
      type: 'vulnerability'
    },
    {
      id: 2,
      title: 'APT activity correlation identified',
      severity: 'high',
      timestamp: '15 minutes ago',
      type: 'apt'
    },
    {
      id: 3,
      title: 'Unusual network traffic patterns',
      severity: 'medium',
      timestamp: '32 minutes ago',
      type: 'network'
    }
  ];

  useEffect(() => {
    // Mock user authentication check
    const mockUser = {
      id: 'analyst-001',
      name: 'Sarah Chen',
      email: 'sarah.chen@threatintel.com',
      role: 'analyst',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    };
    setUser(mockUser);
  }, []);

  // Filter and sort threats
  const filteredAndSortedThreats = useMemo(() => {
    let filtered = [...mockThreats];

    // Apply filters
    if (filters?.severity?.length > 0) {
      filtered = filtered?.filter(threat => filters?.severity?.includes(threat?.severity));
    }
    if (filters?.type?.length > 0) {
      filtered = filtered?.filter(threat => filters?.type?.includes(threat?.type));
    }
    if (filters?.source?.length > 0) {
      filtered = filtered?.filter(threat => filters?.source?.includes(threat?.source?.toLowerCase()));
    }
    if (filters?.timeframe?.length > 0) {
      const now = new Date();
      filtered = filtered?.filter(threat => {
        const threatTime = new Date(threat.timestamp);
        const timeDiff = now - threatTime;
        
        return filters?.timeframe?.some(timeframe => {
          switch (timeframe) {
            case '1h': return timeDiff <= 60 * 60 * 1000;
            case '24h': return timeDiff <= 24 * 60 * 60 * 1000;
            case '7d': return timeDiff <= 7 * 24 * 60 * 60 * 1000;
            case '30d': return timeDiff <= 30 * 24 * 60 * 60 * 1000;
            default: return true;
          }
        });
      });
    }
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(threat => 
        threat?.cveId?.toLowerCase()?.includes(searchTerm) ||
        threat?.title?.toLowerCase()?.includes(searchTerm) ||
        threat?.description?.toLowerCase()?.includes(searchTerm) ||
        threat?.actors?.some(actor => actor?.toLowerCase()?.includes(searchTerm))
      );
    }

    // Apply sorting
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'timestamp') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (sortConfig?.key === 'score') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        } else if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [mockThreats, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleActionClick = (actionId, data) => {
    switch (actionId) {
      case 'investigate':
        // Start new investigation workflow
        console.log('Starting new investigation');
        break;
      case 'report':
        // Generate threat intelligence report
        navigate('/daily-briefing');
        break;
      case 'collaborate':
        // Share findings with ops team
        console.log('Sharing findings');
        break;
      case 'bookmark':
        // Access saved views
        console.log('Accessing bookmarks');
        break;
      case 'search':
        // Perform quick search
        setFilters(prev => ({ ...prev, search: data?.term }));
        setActiveView('feed');
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/authentication');
  };

  const viewTabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'feed', label: 'Threat Feed', icon: 'List' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading analyst dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} alerts={mockAlerts} onLogout={handleLogout} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Analyst Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Comprehensive threat intelligence analysis and research platform
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" iconName="Download">
                  Export Data
                </Button>
                <Button variant="default" iconName="Plus">
                  New Investigation
                </Button>
              </div>
            </div>
          </div>

          {/* View Tabs */}
          <div className="mb-6">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1 w-fit">
              {viewTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveView(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                    activeView === tab?.id
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

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Primary Content Area */}
            <div className="xl:col-span-3 space-y-6">
              {activeView === 'overview' && <ThreatOverview />}
              
              {activeView === 'feed' && (
                <>
                  <ThreatFeedTable
                    threats={filteredAndSortedThreats}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                  />
                </>
              )}
              
              {activeView === 'analytics' && <ThreatAnalytics />}
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {activeView === 'feed' && (
                <ThreatFilters
                  onFilterChange={handleFilterChange}
                  activeFilters={filters}
                />
              )}
              <div className="sticky top-24">
                <QuickActions onActionClick={handleActionClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalystDashboard;