import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      name: 'SOC 2 Type II',
      icon: 'Shield',
      description: 'Security & Availability'
    },
    {
      name: 'ISO 27001',
      icon: 'Award',
      description: 'Information Security'
    },
    {
      name: 'GDPR Compliant',
      icon: 'Lock',
      description: 'Data Protection'
    },
    {
      name: 'SSL Encrypted',
      icon: 'Key',
      description: '256-bit Encryption'
    }
  ];

  const securityFeatures = [
    'End-to-end encryption for all data transmission',
    'Multi-factor authentication support',
    'Regular security audits and penetration testing',
    'Zero-trust architecture implementation',
    'Real-time threat monitoring and response'
  ];

  return (
    <div className="space-y-8">
      {/* Security Certifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="ShieldCheck" size={20} className="text-success" />
          <h3 className="text-lg font-semibold text-foreground">Enterprise Security</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full">
                <Icon name={cert?.icon} size={16} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{cert?.name}</p>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lock" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Security Features</h3>
        </div>
        
        <ul className="space-y-3">
          {securityFeatures?.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Trust Badges */}
      <div className="flex items-center justify-center space-x-6 py-4">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs font-medium text-muted-foreground">SSL Secured</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={16} className="text-primary" />
          <span className="text-xs font-medium text-muted-foreground">Privacy Protected</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-accent" />
          <span className="text-xs font-medium text-muted-foreground">24/7 Monitoring</span>
        </div>
      </div>
      {/* Compliance Notice */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 transition-smooth">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-primary hover:text-primary/80 transition-smooth">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;