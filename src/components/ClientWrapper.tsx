'use client';
import Navbar from '@/components/navbar/Navbar';
import { usePathname } from 'next/navigation';
import { useLandingPageContext } from '@/contexts/landing-page-context';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/register') ||
    pathname?.startsWith('/unauthorized');

  const { isLoading } = useLandingPageContext();

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  ) : (
    <>
      {!isAdmin && <Navbar />}
      {children}
    </>
  );
}
