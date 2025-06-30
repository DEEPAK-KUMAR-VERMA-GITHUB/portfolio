'use client';

import Navbar from '@/components/navbar/Navbar';
import { usePathname } from 'next/navigation';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/register') ||
    pathname?.startsWith('/unauthorized');

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
    </>
  );
}
