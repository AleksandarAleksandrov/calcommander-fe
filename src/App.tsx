import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import SignInPage  from './signin/SignInPage';
import SignupPage from './signup/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { clearAuthData } from './utils/auth';
import { useAuth } from './hooks/useAuth';
import GoogleRedirect from './signin/GoogleRedirect';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));

// Loading fallback component
const Loading = () => (
  <div className="loading">
    <p>Loading...</p>
  </div>
);

const Layout = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();

  if(isAuth) {
    navigate ('/');
  }

  return (
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        )
      },
      {
        path: "google-callback",
        element: (
          <PublicRoute>
            <GoogleRedirect />
          </PublicRoute>
        )
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        )
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
