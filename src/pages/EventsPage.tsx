import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PartyPopper, Calendar, MapPin, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { getClubEvents } from '@/lib/store';
import { useAuth } from '@/contexts/AuthContext';

const EventsPage: React.FC = () => {
  const { user } = useAuth();
  const events = getClubEvents();
  const statusIcons = { approved: CheckCircle2, rejected: XCircle, pending: Clock };
  const statusVariants = { approved: 'success', rejected: 'destructive', pending: 'warning' } as const;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events & Clubs</h1>
        {(user?.isClubCoordinator || user?.role === 'admin') && <Button><PartyPopper className="h-4 w-4 mr-2" />Propose Event</Button>}
      </div>
      <div className="grid gap-4">
        {events.map((event) => {
          const Icon = statusIcons[event.status];
          return (
            <Card key={event.id} variant="interactive">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <PartyPopper className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <Badge variant={statusVariants[event.status]}><Icon className="h-3 w-3 mr-1" />{event.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{event.eventDate}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{event.venue}</span>
                      <Badge variant="outline">{event.clubName}</Badge>
                    </div>
                  </div>
                  {user?.role === 'admin' && event.status === 'pending' && (
                    <div className="flex gap-2 sm:flex-col">
                      <Button size="sm" variant="success">Approve</Button>
                      <Button size="sm" variant="outline">Reject</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EventsPage;
