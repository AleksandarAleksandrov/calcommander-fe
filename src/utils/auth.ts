import { googleLogout } from "@react-oauth/google";

export const isAuthenticated = (): boolean => {
  const jwt = localStorage.getItem('jwt');
  const expiresAt = localStorage.getItem('expiresAt');
  
  if (!jwt || !expiresAt) {
    return false;
  }
  
  // Check if token is expired
  const now = Date.now();
  const expiration = parseInt(expiresAt, 10);

  // TODO: If token and expiry is close, refresh the token
  
  if (now >= expiration) {
    // Token is expired, clean up localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('expiresAt');
    googleLogout();
    // Dispatch auth-change event
    window.dispatchEvent(new Event('auth-change'));
    return false;
  }
  
  return true;
};

export const clearAuthData = (): void => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('expiresAt');
  googleLogout();
  // Dispatch auth-change event
  window.dispatchEvent(new Event('auth-change'));
};

export const setAuthData = (jwt: string, expiresAt: string | number): void => {
  localStorage.setItem('jwt', jwt);
  localStorage.setItem('expiresAt', expiresAt.toString());
  // Dispatch auth-change event
  window.dispatchEvent(new Event('auth-change'));
}; 