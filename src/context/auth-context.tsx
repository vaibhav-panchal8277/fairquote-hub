'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '@/lib/types';
import { MOCK_USERS } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  zip: string;
  phone?: string;
  // Provider-specific
  businessName?: string;
  licenseNumber?: string;
  serviceCategories?: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const saved = localStorage.getItem('fq_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('fq_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Mock auth — find user by email
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('fq_user', JSON.stringify(foundUser));
      return true;
    }
    // For demo, allow any email — create a seeker
    const demoUser: User = {
      id: 'demo-' + Date.now(),
      role: 'seeker',
      email,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      zip: '10001',
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    setUser(demoUser);
    localStorage.setItem('fq_user', JSON.stringify(demoUser));
    return true;
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    const newUser: User = {
      id: 'user-' + Date.now(),
      role: data.role,
      email: data.email,
      name: data.name,
      phone: data.phone,
      zip: data.zip,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    setUser(newUser);
    localStorage.setItem('fq_user', JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('fq_user');
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    // Quick-switch for demo purposes
    const roleUsers: Record<UserRole, User> = {
      seeker: MOCK_USERS.find(u => u.role === 'seeker')!,
      provider: MOCK_USERS.find(u => u.role === 'provider')!,
      admin: MOCK_USERS.find(u => u.role === 'admin')!,
    };
    const newUser = roleUsers[role];
    if (newUser) {
      setUser(newUser);
      localStorage.setItem('fq_user', JSON.stringify(newUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      switchRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
