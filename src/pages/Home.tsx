import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const { hasCompletedOnboarding } = useSelector((state: RootState) => state.user);

  // Redirect based on onboarding status
  if (hasCompletedOnboarding) {
    return <div>Home</div>
  } else {
    return <Navigate to="/onboarding" replace />;
  }
};