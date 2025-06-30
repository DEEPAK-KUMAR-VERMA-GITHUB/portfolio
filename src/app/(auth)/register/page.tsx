import AuthGuard from '@/components/auth/auth-guard';
import RegisterForm from '@/components/auth/register-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create an account',
  description: 'Create a new account',
};

export default function RegisterPage() {
  return (
    <AuthGuard>
      <RegisterForm />
    </AuthGuard>
  );
}
