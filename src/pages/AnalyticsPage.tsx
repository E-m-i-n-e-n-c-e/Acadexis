import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AnalyticsPage: React.FC = () => {
  const performanceData = [
    { month: 'Aug', attendance: 92, performance: 78 },
    { month: 'Sep', attendance: 88, performance: 82 },
    { month: 'Oct', attendance: 95, performance: 85 },
    { month: 'Nov', attendance: 90, performance: 79 },
    { month: 'Dec', attendance: 93, performance: 88 },
  ];

  const departmentData = [
    { name: 'CSE', students: 420 },
    { name: 'ECE', students: 380 },
    { name: 'MECH', students: 280 },
    { name: 'CIVIL', students: 168 },
  ];

  const riskData = [
    { name: 'Low', value: 65, color: 'hsl(142, 76%, 36%)' },
    { name: 'Medium', value: 25, color: 'hsl(38, 92%, 50%)' },
    { name: 'High', value: 10, color: 'hsl(0, 84%, 60%)' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="h-6 w-6 text-primary" />Analytics Dashboard</h1>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Performance Trends</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="attendance" stroke="hsl(239, 84%, 67%)" fill="hsl(239, 84%, 67%)" fillOpacity={0.3} />
                <Area type="monotone" dataKey="performance" stroke="hsl(38, 92%, 50%)" fill="hsl(38, 92%, 50%)" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Students by Department</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="hsl(239, 84%, 67%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Student Risk Distribution</CardTitle></CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie data={riskData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {riskData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {riskData.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                  <span>{item.name} Risk: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
