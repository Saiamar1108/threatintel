import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';

const AuthForm = ({ isLogin, onToggleMode, onAuthSuccess }) => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    organization: '',
    role: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 'leadership', label: 'Leadership Team', description: 'C-level executives and security managers' },
    { value: 'analyst', label: 'Security Analyst', description: 'Technical threat analysis professionals' },
    { value: 'operations', label: 'Operations Team', description: 'Incident response and operations staff' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin) {
      if (!formData?.name) {
        newErrors.name = 'Full name is required';
      }
      if (!formData?.organization) {
        newErrors.organization = 'Organization is required';
      }
      if (!formData?.role) {
        newErrors.role = 'Please select your role';
      }
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await signIn(formData?.email, formData?.password);
        
        if (error) {
          setErrors({ 
            general: error?.message || 'Invalid credentials. Please check your email and password.'
          });
          return;
        }

        if (data?.user) {
          onAuthSuccess?.(data?.user);
          // Navigate based on user role - will be handled by AuthContext profile loading
          navigate('/leadership-dashboard'); // Default navigation, will redirect based on actual role
        }
      } else {
        const { data, error } = await signUp(
          formData?.email, 
          formData?.password, 
          {
            name: formData?.name,
            role: formData?.role,
            organization: formData?.organization
          }
        );
        
        if (error) {
          setErrors({ general: error?.message || 'Registration failed. Please try again.' });
          return;
        }

        if (data?.user) {
          onAuthSuccess?.(data?.user);
          // Navigate to appropriate dashboard based on role
          const dashboardRoutes = {
            leadership: '/leadership-dashboard',
            analyst: '/analyst-dashboard',
            operations: '/operations-dashboard'
          };
          navigate(dashboardRoutes?.[formData?.role] || '/analyst-dashboard');
        }
      }
    } catch (error) {
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-muted-foreground">
          {isLogin 
            ? 'Sign in to access your threat intelligence dashboard' :'Join ThreatIntel Pro to start monitoring threats'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {!isLogin && (
          <>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />

            <Input
              label="Organization"
              type="text"
              placeholder="Enter your organization name"
              value={formData?.organization}
              onChange={(e) => handleInputChange('organization', e?.target?.value)}
              error={errors?.organization}
              required
            />
          </>
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          description={!isLogin ? "Must be at least 8 characters" : ""}
          required
        />

        {!isLogin && (
          <>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />

            <Select
              label="Role"
              placeholder="Select your role"
              options={roleOptions}
              value={formData?.role}
              onChange={(value) => handleInputChange('role', value)}
              error={errors?.role}
              required
            />
          </>
        )}

        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          className="mt-8"
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={onToggleMode}
            className="ml-2 text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      {isLogin && (
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="text-sm font-semibold text-foreground mb-2">Demo Credentials:</h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div>
              <strong>Leadership:</strong> leader@threatintel.com / Leader123!
            </div>
            <div>
              <strong>Analyst:</strong> analyst@threatintel.com / Analyst123!
            </div>
            <div>
              <strong>Operations:</strong> ops@threatintel.com / Ops123!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;