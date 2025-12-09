'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  user: { email: string } | null;
  login: (token: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = (newToken: string, email: string) => {
    setToken(newToken);
    setUser({ email });
    // In a real app, you'd store the token securely (e.g., in localStorage or cookies)
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    // In a real app, you'd clear the stored token
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
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
