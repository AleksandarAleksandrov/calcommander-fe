import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuth = useAuth();
  
  if (isAuth) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default PublicRoute; 