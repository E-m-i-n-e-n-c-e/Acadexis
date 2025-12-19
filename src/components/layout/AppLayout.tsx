import React from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  ClipboardCheck,
  Users,
  PartyPopper,
  Bell,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Menu,
  Settings,
  RotateCcw,
  Moon,
  Sun,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { resetAllData, setDemoLoaded } from '@/lib/store';
import { loadDemoData } from '@/lib/demoData';
import { useToast } from '@/hooks/use-toast';
import type { UserRole } from '@/lib/store';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, roles: ['student', 'admin', 'seating_manager'] },
  { label: 'Academic Calendar', path: '/calendar', icon: <Calendar className="h-5 w-5" />, roles: ['student', 'admin', 'seating_manager'] },
  { label: 'Syllabus & Mind Maps', path: '/syllabus', icon: <BookOpen className="h-5 w-5" />, roles: ['student', 'admin'], badge: 'AI' },
  { label: 'Exams & Hall Tickets', path: '/exams', icon: <ClipboardCheck className="h-5 w-5" />, roles: ['student', 'admin'] },
  { label: 'Seating Allocation', path: '/seating', icon: <Users className="h-5 w-5" />, roles: ['student', 'admin', 'seating_manager'] },
  { label: 'Events & Clubs', path: '/events', icon: <PartyPopper className="h-5 w-5" />, roles: ['student', 'admin'] },
  { label: 'Notifications', path: '/notifications', icon: <Bell className="h-5 w-5" />, roles: ['student', 'admin', 'seating_manager'] },
  { label: 'Analytics', path: '/analytics', icon: <BarChart3 className="h-5 w-5" />, roles: ['admin'] },
];

const AppLayout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const filteredNavItems = navItems.filter((item) => item.roles.includes(user!.role));

  const handleResetDemo = () => {
    resetAllData();
    setDemoLoaded(false);
    loadDemoData();
    toast({
      title: 'Demo Reset',
      description: 'All demo data has been restored to defaults.',
    });
    window.location.reload();
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'student': return 'student';
      case 'admin': return 'admin';
      case 'seating_manager': return 'seating_manager';
      default: return 'default';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'student': return 'Student';
      case 'admin': return 'Admin';
      case 'seating_manager': return 'Seating Manager';
      default: return role;
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 lg:relative',
          sidebarCollapsed ? 'w-[72px]' : 'w-64',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary shadow-glow">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          {!sidebarCollapsed && (
            <span className="font-bold text-lg text-sidebar-foreground">Acadexis</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <span className={cn('flex-shrink-0', isActive && 'animate-bounce-subtle')}>{item.icon}</span>
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="gradient" className="text-[10px] px-1.5 py-0">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <ThemeToggle collapsed={sidebarCollapsed} />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetDemo}
            className={cn(
              'w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
              sidebarCollapsed && 'justify-center px-0'
            )}
          >
            <RotateCcw className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Reset Demo</span>}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className={cn(
              'w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
              sidebarCollapsed && 'justify-center px-0'
            )}
          >
            <LogOut className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground shadow-lg hover:scale-110 transition-transform"
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 lg:px-6 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {filteredNavItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex relative"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              <Sun
                className={cn(
                  'absolute h-5 w-5 transition-all duration-500',
                  theme === 'dark'
                    ? 'rotate-0 scale-100 opacity-100'
                    : 'rotate-90 scale-0 opacity-0'
                )}
              />
              <Moon
                className={cn(
                  'absolute h-5 w-5 transition-all duration-500',
                  theme === 'light'
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-0 opacity-0'
                )}
              />
            </Button>

            <Link to="/notifications" className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
                3
              </span>
            </Link>

            <div className="flex items-center gap-3 pl-3 border-l border-border">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-foreground">{user?.name}</div>
                <Badge variant={getRoleBadgeVariant(user!.role)} className="text-[10px]">
                  {getRoleLabel(user!.role)}
                  {user?.isClubCoordinator && ' • Coordinator'}
                </Badge>
              </div>
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                {user?.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
