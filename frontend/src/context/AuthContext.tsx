'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'; // Added useEffect
import { useSession } from '../lib/auth-client'; // Import useSession from auth-client

interface AuthContextType {
  token: string | null;
  user: { id: string; email: string } | null; // Updated user type
  login: (token: string, userId: string, email: string) => void; // Updated login signature
  logout: () => void;
  isLoading: boolean; // Add isLoading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { session, isLoading, signOut } = useSession(); // Use Better Auth's useSession hook
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    if (session && session.token && session.user) {
      setToken(session.token);
      setUser({ id: session.user.id, email: session.user.email });
      // Store token securely (e.g., in localStorage or cookies)
      localStorage.setItem('better_auth_token', session.token);
      localStorage.setItem('better_auth_user_id', session.user.id);
      localStorage.setItem('better_auth_user_email', session.user.email);
    } else {
      setToken(null);
      setUser(null);
      localStorage.removeItem('better_auth_token');
      localStorage.removeItem('better_auth_user_id');
      localStorage.removeItem('better_auth_user_email');
    }
  }, [session]);

  const login = (newToken: string, userId: string, email: string) => {
    // This login is for external use if needed, but primary auth will be via Better Auth
    setToken(newToken);
    setUser({ id: userId, email });
    localStorage.setItem('better_auth_token', newToken);
    localStorage.setItem('better_auth_user_id', userId);
    localStorage.setItem('better_auth_user_email', email);
  };

  const logout = () => {
    signOut(); // Use Better Auth's signOut
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}