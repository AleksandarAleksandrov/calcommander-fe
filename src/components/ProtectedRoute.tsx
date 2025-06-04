import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { getUserMe } from '../store/userSlice';
import type { AppDispatch, RootState } from '../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  
  // Call getUserMe whenever a protected route is accessed
  if (isAuth && !user && !isLoading) {
    dispatch(getUserMe());
  }
  
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  
  // Show loading while fetching user data
  if (isLoading || user === null) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default ProtectedRoute; 