import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const { user } = useSelector((state: RootState) => state.user as any);

  // Redirect based on onboarding status
  if (user?.hasCompletedOnboarding) {
    return <div>Home</div>
  } else {
    return <Navigate to="/onboarding" replace />;
  }
};