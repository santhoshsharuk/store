import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { isAdminAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAdminAuthenticated) {
      // Redirect to admin login if not authenticated
      navigate('/admin/login', { replace: true });
    }
  }, [isAdminAuthenticated, isLoading, navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#5B46F7] border-t-transparent mx-auto mb-4"></div>
          <p className="text-white/60">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!isAdminAuthenticated) {
    return null;
  }

  // Render protected content if authenticated
  return <>{children}</>;
}