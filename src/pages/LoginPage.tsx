import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { GraduationCap, Shield, Layout, Sparkles } from 'lucide-react';
import type { UserRole } from '@/lib/store';

const roles: { value: UserRole; label: string; icon: React.ReactNode; description: string }[] = [
  { value: 'student', label: 'Student', icon: <GraduationCap className="h-6 w-6" />, description: 'Access courses, exams, and events' },
  { value: 'admin', label: 'Admin', icon: <Shield className="h-6 w-6" />, description: 'Manage the entire platform' },
  { value: 'seating_manager', label: 'Seating Manager', icon: <Layout className="h-6 w-6" />, description: 'Handle exam seating arrangements' },
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isClubCoordinator, setIsClubCoordinator] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    login({
      id: 'user-' + Date.now(),
      name: name.trim(),
      role: selectedRole,
      isClubCoordinator,
      email: `${name.toLowerCase().replace(/\s/g, '.')}@campus.edu`,
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

      <div className="w-full max-w-lg relative animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-glow mb-4">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">CampusHub</h1>
          <p className="text-muted-foreground mt-2">Your intelligent academic companion</p>
        </div>

        <Card variant="elevated" className="backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Welcome Back
            </CardTitle>
            <CardDescription>
              Sign in to access your personalized dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label>Select Your Role</Label>
                <div className="grid gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedRole === role.value
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        selectedRole === role.value ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {role.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{role.label}</div>
                        <div className="text-sm text-muted-foreground">{role.description}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                        selectedRole === role.value
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

              <Button type="submit" variant="gradient" size="lg" className="w-full">
                Continue to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Demo Mode: All data is stored locally
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
