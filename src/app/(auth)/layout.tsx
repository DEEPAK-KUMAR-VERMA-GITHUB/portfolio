import { Metadata } from 'next';
import { AuthProvider } from '@/contexts/auth-context';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
