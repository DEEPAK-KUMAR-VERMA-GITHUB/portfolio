'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import { AuthProvider } from '@/contexts/auth-context';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/register') ||
    pathname?.startsWith('/unauthorized');

  return (
    <AuthProvider>
      {!isAdmin && <Navbar />}
      {children}
    </AuthProvider>
  );
}
