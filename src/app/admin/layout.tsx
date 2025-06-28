'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/admin/_components/Sidebar';
import SidebarToggle from '@/app/admin/_components/SidebarToggle';
import { useAuth } from '@/contexts/auth-context';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const onToggle = () => {
    setSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="relative flex min-h-screen">
      <SidebarToggle onToggle={onToggle} isOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} user={user} />
      <main className="flex-1 p-6 ml-0 bg-background w-full transition-all overflow-scroll">
        {children}
      </main>

      {/* Optional: Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
    </div>
  );
}
