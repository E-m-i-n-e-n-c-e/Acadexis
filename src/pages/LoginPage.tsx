import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { GraduationCap, Shield, Layout, Sparkles, ArrowLeft, Mail, Lock, User } from 'lucide-react';
import type { UserRole } from '@/lib/store';

const roles: { value: UserRole; label: string; icon: React.ReactNode; description: string }[] = [
  { value: 'student', label: 'Student', icon: <GraduationCap className="h-6 w-6" />, description: 'Access courses, exams, and events' },
  { value: 'admin', label: 'Admin', icon: <Shield className="h-6 w-6" />, description: 'Manage the entire platform' },
  { value: 'seating_manager', label: 'Seating Manager', icon: <Layout className="h-6 w-6" />, description: 'Handle exam seating arrangements' },
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State
  const [step, setStep] = useState<1 | 2>(1);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Form State
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isClubCoordinator, setIsClubCoordinator] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleContinue = () => {
    setStep(2);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // For demo purposes, if name is empty, generate one from email or generic
    const finalName = name.trim() || (email.split('@')[0] || 'User');

    login({
      id: 'user-' + Date.now(),
      name: finalName,
      role: selectedRole,
      isClubCoordinator,
      email: email || `${finalName.toLowerCase().replace(/\s/g, '.')}@acadexis.edu`,
      department: 'Computer Science',
      semester: 6,
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="w-full max-w-lg relative">
        {/* Logo Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-glow mb-4">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Acadexis</h1>
          <p className="text-muted-foreground mt-2">Your intelligent academic companion</p>
        </div>

        {/* Sliding Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
          >
            {/* Step 1: Role Selection */}
            <div className="w-full flex-shrink-0 px-1">
              <Card variant="elevated" className="backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Get Started
                  </CardTitle>
                  <CardDescription>
                    Select your role to configure your experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Select Your Role</Label>
                    <div className="grid gap-3">
                      {roles.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => setSelectedRole(role.value)}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${selectedRole === role.value
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                            }`}
                        >
                          <div className={`p-2 rounded-lg ${selectedRole === role.value ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                            }`}>
                            {role.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{role.label}</div>
                            <div className="text-sm text-muted-foreground">{role.description}</div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 transition-all ${selectedRole === role.value
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                            }`}>
                            {selectedRole === role.value && (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedRole === 'student' && (
                    <div className="flex items-center space-x-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
                      <Checkbox
                        id="clubCoordinator"
                        checked={isClubCoordinator}
                        onCheckedChange={(checked) => setIsClubCoordinator(checked === true)}
                      />
                      <Label htmlFor="clubCoordinator" className="cursor-pointer flex-1">
                        <span className="font-medium text-foreground">I am a Club Coordinator</span>
                        <span className="block text-sm text-muted-foreground">Access event management features</span>
                      </Label>
                    </div>
                  )}

                  <Button onClick={handleRoleContinue} variant="gradient" size="lg" className="w-full">
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Step 2: Login / Signup */}
            <div className="w-full flex-shrink-0 px-1">
              <Card variant="elevated" className="backdrop-blur-sm">
                <CardHeader className="text-center pb-4 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 top-0"
                    onClick={() => setStep(1)}
                    title="Back to roles"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <CardTitle className="text-xl">
                    {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                  </CardTitle>
                  <CardDescription>
                    {authMode === 'login' ? 'Sign in to access your dashboard' : 'Join Acadexis today'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    {/* Toggle Login/Signup */}
                    <div className="flex p-1 bg-muted rounded-lg mb-6">
                      <button
                        type="button"
                        onClick={() => setAuthMode('login')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${authMode === 'login' ? 'gradient-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMode('signup')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${authMode === 'signup' ? 'gradient-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        Sign Up
                      </button>
                    </div>

                    {authMode === 'signup' && (
                      <div className="space-y-2 animate-fade-in">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pl-9"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-9"
                          required={authMode === 'signup'}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-9"
                          required={authMode === 'signup'}
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="gradient" size="lg" className="w-full mt-2">
                      {authMode === 'login' ? 'Sign In' : 'Create Account'}
                    </Button>

                    {authMode === 'login' && (
                      <div className="text-center mt-2">
                        <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Demo Mode: All data is stored locally
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
