'use client';

import { AuthProvider as AuthContextProvider, useAuth } from '@/contexts/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isInitialized) return;

    const isAuthPage = ['/login', '/register'].includes(pathname);

    if (isAuthenticated && isAuthPage) {
      router.replace('/admin/dashboard');
    } else if (!isAuthenticated && !isAuthPage) {
      router.replace('/login');
    }
  }, [isAuthenticated, isInitialized, mounted, pathname, router]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <AuthContextProvider>{children}</AuthContextProvider>;
}
