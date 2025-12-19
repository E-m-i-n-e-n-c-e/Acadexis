import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';
import { getNotifications, setNotifications } from '@/lib/store';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const notifications = getNotifications().filter(n => n.forRoles.includes(user!.role));
  const icons = { success: CheckCircle2, warning: AlertTriangle, info: Info, error: XCircle };
  const variants = { success: 'success', warning: 'warning', info: 'info', error: 'destructive' } as const;

  const markAsRead = (id: string) => {
    const updated = getNotifications().map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold flex items-center gap-2"><Bell className="h-6 w-6" />Notifications</h1>
      <div className="space-y-3">
        {notifications.map((notif) => {
          const Icon = icons[notif.type];
          return (
            <Card key={notif.id} variant={notif.read ? 'flat' : 'default'} className={!notif.read ? 'border-primary/30' : ''} onClick={() => markAsRead(notif.id)}>
              <CardContent className="p-4 flex gap-4 cursor-pointer">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${variants[notif.type]}/10`}>
                  <Icon className={`h-5 w-5 text-${variants[notif.type]}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{notif.title}</h4>
                    {!notif.read && <Badge variant="gradient" className="text-[10px]">New</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPage;
