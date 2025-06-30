'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: 'USER' | 'ADMIN';
  redirectTo?: string;
};

export default function ProtectedRoute({
  children,
  requiredRole = 'USER',
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized && !isAuthenticated) {
      router.push(redirectTo);
    }
    if (isAuthenticated && user && requiredRole === 'ADMIN' && user.role !== 'ADMIN') {
      router.push('/unauthorized');
    }
  }, [isAuthenticated, user, isInitialized]);

  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
