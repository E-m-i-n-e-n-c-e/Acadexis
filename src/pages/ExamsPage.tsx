import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Clock, MapPin, QrCode } from 'lucide-react';
import { getExams, getHallTickets } from '@/lib/store';

const ExamsPage: React.FC = () => {
  const exams = getExams();
  const hallTickets = getHallTickets();

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Exams & Hall Tickets</h1>
      <div className="grid gap-4">
        {exams.map((exam) => {
          const ticket = hallTickets.find(t => t.examId === exam.id);
          return (
            <Card key={exam.id} variant="interactive">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-xl gradient-primary flex flex-col items-center justify-center text-primary-foreground">
                    <span className="text-xl font-bold">{new Date(exam.date).getDate()}</span>
                    <span className="text-xs">{new Date(exam.date).toLocaleString('default', { month: 'short' })}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{exam.subject}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{exam.time} • {exam.duration}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{exam.venue}</span>
                    </div>
                    {ticket && <p className="text-sm mt-2">Seat: <strong>{ticket.seatNumber}</strong> • Room: <strong>{ticket.roomNumber}</strong></p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={exam.type === 'external' ? 'default' : 'secondary'}>{exam.type}</Badge>
                    {ticket?.isPublished ? (
                      <Button size="sm"><Download className="h-4 w-4 mr-1" />Hall Ticket</Button>
                    ) : (
                      <Badge variant="warning">Pending</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ExamsPage;
