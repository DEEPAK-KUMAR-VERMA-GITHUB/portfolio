'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'ADMIN' | 'USER';
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole = 'ADMIN',
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to login with callback URL
        router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(pathname)}`);
      } else if (requiredRole === 'ADMIN' && user?.role !== 'ADMIN') {
        // Redirect to unauthorized or home if not admin
        router.push('/unauthorized');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [isAuthenticated, isLoading, requiredRole, router, pathname, redirectTo, user?.role]);

  if (isLoading || isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Redirecting in useEffect
  }

  return <>{children}</>;
}
