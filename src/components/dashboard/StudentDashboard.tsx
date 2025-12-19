import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  BookOpen,
  ClipboardCheck,
  PartyPopper,
  Bell,
  ArrowRight,
  TrendingUp,
  Clock,
  MapPin,
  Sparkles,
  Brain,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { getExams, getCalendarEvents, getNotifications, getHallTickets } from '@/lib/store';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const exams = getExams();
  const events = getCalendarEvents();
  const notifications = getNotifications().filter((n) => n.forRoles.includes('student'));
  const hallTickets = getHallTickets();

  const upcomingExams = exams.slice(0, 3);
  const nextEvent = events.find((e) => e.type === 'event');
  const publishedTickets = hallTickets.filter((t) => t.isPublished);
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  // Mock AI readiness score
  const readinessScore = 78;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your academics
          </p>
        </div>
        <Badge variant="gradient" className="w-fit flex items-center gap-2 px-3 py-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          Semester 6 • Computer Science
        </Badge>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="interactive" className="group">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Exams</p>
                <p className="text-3xl font-bold text-foreground mt-1">{exams.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ClipboardCheck className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-success font-medium">Next in 5 days</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="interactive" className="group">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hall Tickets</p>
                <p className="text-3xl font-bold text-foreground mt-1">{publishedTickets.length}/{hallTickets.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <span>{publishedTickets.length} published</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="interactive" className="group">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Event</p>
                <p className="text-lg font-bold text-foreground mt-1 line-clamp-1">{nextEvent?.title || 'TechFest 2025'}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PartyPopper className="h-6 w-6 text-accent" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Feb 10, 2025</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="interactive" className="group">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Notifications</p>
                <p className="text-3xl font-bold text-foreground mt-1">{unreadNotifications}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bell className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <span>{unreadNotifications} unread</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Readiness Score */}
        <Card variant="gradient" className="lg:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">AI Readiness Score</CardTitle>
            </div>
            <CardDescription>
              Based on your preparation progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pt-4">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-muted"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-primary"
                      strokeWidth="3"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      strokeDasharray={`${readinessScore}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-foreground">{readinessScore}%</span>
                    <span className="text-xs text-muted-foreground">Ready</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">DSA Progress</span>
                  <span className="font-medium text-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">DBMS Progress</span>
                  <span className="font-medium text-foreground">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </div>
            <Link to="/syllabus">
              <Button variant="outline" className="w-full mt-4">
                <Target className="h-4 w-4 mr-2" />
                Study with AI Mind Maps
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Upcoming Exams</CardTitle>
              <CardDescription>Your exam schedule</CardDescription>
            </div>
            <Link to="/exams">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <div
                  key={exam.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                    {new Date(exam.date).getDate()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{exam.subject}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {exam.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {exam.venue}
                      </span>
                    </div>
                  </div>
                  <Badge variant={exam.type === 'external' ? 'default' : 'secondary'}>
                    {exam.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link to="/calendar" className="block">
          <Card variant="interactive" className="h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium text-foreground">Academic Calendar</span>
            </CardContent>
          </Card>
        </Link>
        <Link to="/syllabus" className="block">
          <Card variant="interactive" className="h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <span className="font-medium text-foreground">Syllabus & Mind Maps</span>
            </CardContent>
          </Card>
        </Link>
        <Link to="/exams" className="block">
          <Card variant="interactive" className="h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <ClipboardCheck className="h-6 w-6 text-success" />
              </div>
              <span className="font-medium text-foreground">Hall Tickets</span>
            </CardContent>
          </Card>
        </Link>
        <Link to="/seating" className="block">
          <Card variant="interactive" className="h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-info" />
              </div>
              <span className="font-medium text-foreground">Seating Info</span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
