'use client';

import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from 'lucide-react';

export function AuthLoader() {
  const { isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}
