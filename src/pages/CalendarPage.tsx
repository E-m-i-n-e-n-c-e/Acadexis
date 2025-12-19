import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { getCalendarEvents } from '@/lib/store';

const CalendarPage: React.FC = () => {
  const events = getCalendarEvents();
  const typeColors = { exam: 'destructive', event: 'default', deadline: 'warning', holiday: 'success' };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Academic Calendar</h1>
      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} variant="interactive">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl gradient-primary flex flex-col items-center justify-center text-primary-foreground">
                <span className="text-lg font-bold">{new Date(event.date).getDate()}</span>
                <span className="text-xs">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
              <Badge variant={typeColors[event.type] as any}>{event.type}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
