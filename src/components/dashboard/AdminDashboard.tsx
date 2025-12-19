import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Calendar,
  ClipboardCheck,
  PartyPopper,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  BarChart3,
  FileText,
  Shield,
} from 'lucide-react';
import { getExams, getClubEvents, getNotifications } from '@/lib/store';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  const exams = getExams();
  const clubEvents = getClubEvents();
  const pendingEvents = clubEvents.filter((e) => e.status === 'pending');

  // Mock analytics data
  const studentRiskData = [
    { name: 'Low Risk', value: 65, color: 'hsl(142, 76%, 36%)' },
    { name: 'Medium Risk', value: 25, color: 'hsl(38, 92%, 50%)' },
    { name: 'High Risk', value: 10, color: 'hsl(0, 84%, 60%)' },
  ];

  const academicLoadData = [
    { week: 'Week 1', exams: 2, events: 1 },
    { week: 'Week 2', exams: 1, events: 2 },
    { week: 'Week 3', exams: 3, events: 0 },
    { week: 'Week 4', exams: 2, events: 3 },
    { week: 'Week 5', exams: 4, events: 1 },
    { week: 'Week 6', exams: 1, events: 2 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your institution's academic activities
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/analytics">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Full Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="interactive" className="group">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-foreground mt-1">1,248</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-success font-medium">+12% this semester</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="interactive" className="group">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Exams</p>
                <p className="text-3xl font-bold text-foreground mt-1">{exams.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ClipboardCheck className="h-6 w-6 text-success" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Next: Jan 15</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="interactive" className="group border-warning/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <p className="text-3xl font-bold text-foreground mt-1">{pendingEvents.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-warning font-medium">Needs attention</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="interactive" className="group">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hall Tickets</p>
                <p className="text-3xl font-bold text-foreground mt-1">3/5</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6 text-info" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-muted-foreground">3 published</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Student Risk Distribution</CardTitle>
            <CardDescription>AI-analyzed academic performance risk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={studentRiskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {studentRiskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {studentRiskData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Academic Load */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Academic Load Heatmap</CardTitle>
            <CardDescription>Exam and event distribution per week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={academicLoadData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="week" className="text-muted-foreground text-xs" />
                  <YAxis className="text-muted-foreground text-xs" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="exams"
                    stackId="1"
                    stroke="hsl(239, 84%, 67%)"
                    fill="hsl(239, 84%, 67%)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="events"
                    stackId="1"
                    stroke="hsl(38, 92%, 50%)"
                    fill="hsl(38, 92%, 50%)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Event Approvals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Pending Event Approvals</CardTitle>
            <CardDescription>Review and approve club event proposals</CardDescription>
          </div>
          <Link to="/events">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <PartyPopper className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No pending approvals</p>
              </div>
            ) : (
              pendingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <PartyPopper className="h-6 w-6 text-warning" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground">{event.title}</h4>
                    <p className="text-sm text-muted-foreground truncate">{event.description}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>By: {event.proposedBy}</span>
                      <span>•</span>
                      <span>{event.clubName}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="success">Approve</Button>
                    <Button size="sm" variant="outline">Reject</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
