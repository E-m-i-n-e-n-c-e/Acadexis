import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import SeatingManagerDashboard from '@/components/dashboard/SeatingManagerDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'seating_manager':
      return <SeatingManagerDashboard />;
    default:
      return <StudentDashboard />;
  }
};

export default DashboardPage;
