'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
    </>
  );
}
