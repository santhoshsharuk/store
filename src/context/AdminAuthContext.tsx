import React, { createContext, useContext, useEffect, useState } from 'react';

// Simple admin credentials (in production, use proper authentication)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if admin is already authenticated on component mount
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  const value = {
    isAdminAuthenticated,
    login,
    logout,
    isLoading,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}