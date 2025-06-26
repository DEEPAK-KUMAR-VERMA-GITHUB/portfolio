'use client';

import { useState } from 'react';
import Sidebar from '@/app/admin/_components/Sidebar';
import SidebarToggle from '@/app/admin/_components/SidebarToggle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const onToggle = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="relative flex min-h-screen">
      <SidebarToggle onToggle={onToggle} isOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} />
      <main className="flex-1 p-6 ml-0 bg-background w-full transition-all overflow-scroll">{children}</main>

      {/* Optional: Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
