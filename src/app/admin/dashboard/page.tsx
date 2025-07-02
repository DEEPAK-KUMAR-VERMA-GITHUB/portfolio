'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BriefcaseBusiness,
  Code,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  User
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardStats {
  projects: number;
  skills: number;
  education: number;
  experience: number;
  about: number;
  messages: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    education: 0,
    experience: 0,
    about: 0,
    messages: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard statistics');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 text-destructive p-4 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <FolderOpen className="w-5 h-5" /> Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.projects}</p>
            <p className="text-muted-foreground text-sm">Active and archived projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <User className="w-5 h-5" /> About Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.about}</p>
            <p className="text-muted-foreground text-sm">Profile summary</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Code className="w-5 h-5" /> Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.skills}</p>
            <p className="text-muted-foreground text-sm">Total technologies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <GraduationCap className="w-5 h-5" /> Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.education}</p>
            <p className="text-muted-foreground text-sm">Academic entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <BriefcaseBusiness className="w-5 h-5" /> Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.experience}</p>
            <p className="text-muted-foreground text-sm">Work history</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
