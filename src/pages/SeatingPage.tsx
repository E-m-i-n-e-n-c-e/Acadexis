import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRooms, getExams, getSeatingAllocations } from '@/lib/store';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Armchair } from 'lucide-react';

const SeatingPage: React.FC = () => {
  const { user } = useAuth();
  const rooms = getRooms();
  const exams = getExams();
  const allocations = getSeatingAllocations();

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Seating Allocation</h1>
      
      {user?.role === 'student' ? (
        <div className="grid gap-4">
          {exams.slice(0, 3).map((exam, i) => (
            <Card key={exam.id}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground">
                  <Armchair className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{exam.subject}</h3>
                  <p className="text-sm text-muted-foreground">{exam.date} • {exam.time}</p>
                </div>
                {i < 2 ? (
                  <div className="text-right">
                    <Badge variant="success">Published</Badge>
                    <p className="text-sm mt-1">Room: <strong>Block A-10{i+1}</strong></p>
                    <p className="text-sm">Seat: <strong>Row {i+1}, Col {i+3}</strong></p>
                  </div>
                ) : <Badge variant="warning">Not Published</Badge>}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {rooms.map(room => (
            <Card key={room.id} variant="interactive">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">{room.name}</h3>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(24px,1fr))] gap-1">
                  {Array.from({ length: room.capacity }).map((_, i) => (
                    <div key={i} className={`w-6 h-6 rounded text-[10px] flex items-center justify-center ${i % 3 === 0 ? 'bg-primary/20' : 'bg-muted'}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-3">{room.rows}×{room.columns} = {room.capacity} seats</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeatingPage;
