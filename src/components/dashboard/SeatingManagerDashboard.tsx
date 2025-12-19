import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Grid3X3,
  ClipboardCheck,
  Download,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building2,
  Armchair,
} from 'lucide-react';
import { getExams, getRooms, getSeatingAllocations } from '@/lib/store';

const SeatingManagerDashboard: React.FC = () => {
  const exams = getExams();
  const rooms = getRooms();
  const allocations = getSeatingAllocations();

  const totalCapacity = rooms.reduce((acc, room) => acc + room.capacity, 0);
  const allocatedSeats = allocations.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Grid3X3 className="h-6 w-6 text-primary" />
            Seating Manager Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage exam hall seating arrangements
          </p>
        </div>
        <Link to="/seating">
          <Button variant="gradient">
            <Armchair className="h-4 w-4 mr-2" />
            Manage Seating
          </Button>
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="interactive" className="group">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Exam Rooms</p>
                <p className="text-3xl font-bold text-foreground mt-1">{rooms.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Total capacity: {totalCapacity} seats
            </div>
          </CardContent>
        </Card>

        <Card variant="interactive" className="group">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Exams</p>
                <p className="text-3xl font-bold text-foreground mt-1">{exams.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ClipboardCheck className="h-6 w-6 text-success" />
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Requiring seating allocation
            </div>
          </CardContent>
        </Card>

        <Card variant="interactive" className="group">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Allocated Seats</p>
                <p className="text-3xl font-bold text-foreground mt-1">{allocatedSeats}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Armchair className="h-6 w-6 text-accent" />
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Across all exams
            </div>
          </CardContent>
        </Card>

        <Card variant="interactive" className="group">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-3xl font-bold text-foreground mt-1">2</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-6 w-6 text-info" />
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Seating arrangements live
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rooms overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Available Rooms</CardTitle>
            <CardDescription>Configure room capacity and layout</CardDescription>
          </div>
          <Link to="/seating">
            <Button variant="ghost" size="sm">
              Manage <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{room.name}</h4>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{room.rows} rows × {room.columns} cols</span>
                    <span>•</span>
                    <span>{room.capacity} seats</span>
                  </div>
                </div>
                <Badge variant="success">Available</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exam allocation status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Exam Seating Status</CardTitle>
            <CardDescription>Allocation status for upcoming exams</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exams.slice(0, 4).map((exam, index) => (
              <div
                key={exam.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {new Date(exam.date).getDate()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground">{exam.subject}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exam.date} • {exam.venue}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {index < 2 ? (
                    <>
                      <Badge variant="success">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Published
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </>
                  ) : (
                    <>
                      <Badge variant="warning">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                      <Button size="sm" variant="default">
                        Allocate
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeatingManagerDashboard;
