'use client';

import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: 'ADMIN' | 'USER';
  createdAt: Date;
  updatedAt: Date;
};

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  error: string | null;
  isInitialized: boolean;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  const clearError = () => setError(null);

  // Fetch user on mount
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        setUser(null);
      }
      return res.ok;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
      if (!isInitialized) {
        setIsInitialized(true);
      }
    }
  }, [isInitialized]);

  useEffect(() => {
    fetchUser();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        console.log(email, password);

        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Login failed');
        }

        setUser(data.user);
        router.push('/admin/dashboard');
        toast.success('Logged in successfully');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'An error occurred during login';
        setError(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [clearError, router]
  );

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setIsLoading(true);
      clearError();
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Registration failed');
        }

        setUser(data.user);
        router.push('/admin/dashboard');
        toast.success('Registered successfully');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'An error occurred during registration';
        setError(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [clearError, router]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });

      if (!res.ok) {
        throw new Error('Failed to logout');
      }

      setUser(null);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred during logout';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [clearError, router]);

  const contextValue = useMemo(() => {
    return {
      user,
      isLoading,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      error,
      clearError,
      isInitialized,
    };
  }, [user, isLoading, login, register, logout, error, isInitialized]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
