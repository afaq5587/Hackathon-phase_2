'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession, signOut } from '../lib/auth-client';
// Define the context shape
interface AuthContextType {
  token: string | null;
  user: { id: string; email: string; name: string | null } | null;
  login: (token: string, userId: string, email: string, name: string | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: sessionData, isPending: isLoading } = useSession(); 
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; email: string; name: string | null } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Set to true once component mounts on client
  }, []);

  useEffect(() => {
    if (sessionData && sessionData.session) {
      // Assuming sessionData structure is { session: { token, ... }, user: { ... } }
      // But verify if token is inside sessionData.session or top level?
      // Better Auth usually checks cookies. 
      // If we need a token string, we try to get it.
      // Let's assume sessionData.session.token exists or we fallback.
      const sessionToken = sessionData.session.token || "cookie-session"; 
      const sessionUser = sessionData.user;
      
      setToken(sessionToken);
      setUser({ id: sessionUser.id, email: sessionUser.email, name: sessionUser.name || null });
      
      if (mounted) {
        localStorage.setItem('better_auth_token', sessionToken);
        localStorage.setItem('better_auth_user_id', sessionUser.id);
        localStorage.setItem('better_auth_user_email', sessionUser.email);
        if (sessionUser.name) localStorage.setItem('better_auth_user_name', sessionUser.name);
      }
    } else {
      setToken(null);
      setUser(null);
      if (mounted) {
        localStorage.removeItem('better_auth_token');
        localStorage.removeItem('better_auth_user_id');
        localStorage.removeItem('better_auth_user_email');
        localStorage.removeItem('better_auth_user_name');
      }
    }
  }, [sessionData, mounted]);

  const login = (newToken: string, userId: string, email: string, name: string | null) => {
    setToken(newToken);
    setUser({ id: userId, email, name });
    if (mounted) { // Only access localStorage on client after mounted
      localStorage.setItem('better_auth_token', newToken);
      localStorage.setItem('better_auth_user_id', userId);
      localStorage.setItem('better_auth_user_email', email);
      if (name) localStorage.setItem('better_auth_user_name', name);
    }
  };

  const logout = async () => {
    await signOut();
    setToken(null);
    setUser(null);
    if (mounted) {
      localStorage.removeItem('better_auth_token');
      localStorage.removeItem('better_auth_user_id');
      localStorage.removeItem('better_auth_user_email');
      localStorage.removeItem('better_auth_user_name');
    }
    // Optionally redirect to login or handle state clearing
  };

  if (!mounted) { // Don't render children until component has mounted
    return null;
  }

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
