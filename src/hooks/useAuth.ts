import { useState, useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(isAuthenticated());

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
    };

    // Listen for storage changes (when localStorage is updated in another tab)
    window.addEventListener('storage', checkAuth);
    
    // Listen for custom auth events (when we update localStorage in the same tab)
    window.addEventListener('auth-change', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  return isAuth;
}; 