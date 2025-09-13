import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityGuidelines = ({ isVisible }) => {
  if (!isVisible) return null;

  const passwordRequirements = [
    {
      text: 'At least 8 characters long',
      icon: 'Check',
      color: 'text-success'
    },
    {
      text: 'Contains uppercase letter (A-Z)',
      icon: 'Check',
      color: 'text-success'
    },
    {
      text: 'Contains lowercase letter (a-z)',
      icon: 'Check',
      color: 'text-success'
    },
    {
      text: 'Contains at least one number (0-9)',
      icon: 'Check',
      color: 'text-success'
    },
    {
      text: 'Contains special character (!@#$%^&*)',
      icon: 'AlertCircle',
      color: 'text-warning'
    }
  ];

  const securityTips = [
    {
      title: 'Use Unique Passwords',
      description: 'Never reuse passwords across multiple accounts',
      icon: 'Key'
    },
    {
      title: 'Enable 2FA',
      description: 'Add an extra layer of security to your account',
      icon: 'Smartphone'
    },
    {
      title: 'Regular Updates',
      description: 'Keep your browser and system updated',
      icon: 'RefreshCw'
    },
    {
      title: 'Secure Network',
      description: 'Always use secure, trusted networks',
      icon: 'Wifi'
    }
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* Password Requirements */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Lock" size={16} className="text-primary" />
          <h4 className="text-sm font-semibold text-foreground">Password Requirements</h4>
        </div>
        
        <ul className="space-y-2">
          {passwordRequirements?.map((req, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Icon name={req?.icon} size={14} className={req?.color} />
              <span className="text-xs text-muted-foreground">{req?.text}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Security Tips */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="ShieldCheck" size={16} className="text-success" />
          <h4 className="text-sm font-semibold text-foreground">Security Best Practices</h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {securityTips?.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full flex-shrink-0">
                <Icon name={tip?.icon} size={12} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">{tip?.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{tip?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Notice */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Account Security</p>
            <p className="text-xs text-muted-foreground">
              Your account will be automatically locked after 5 failed login attempts. 
              We monitor all authentication activities for suspicious behavior and will 
              notify you of any unusual access patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityGuidelines;