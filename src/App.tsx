import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom';
import './App.css';
import LoginPage  from './signin/LoginPage';
import SignupPage from './signup/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { clearAuthData } from './utils/auth';
import { useAuth } from './hooks/useAuth';
import GoogleRedirect from './signin/GoogleRedirect';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

// Loading fallback component
const Loading = () => (
  <div className="loading">
    <p>Loading...</p>
  </div>
);

const Layout = () => {
  const isAuth = useAuth();
  
  const handleLogout = () => {
    clearAuthData();
  };

  return (
    <div className="App">
      <nav>
        <ul>
          {isAuth ? (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textDecoration: 'underline' }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
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
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        )
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        )
      },
      {
        path: "google-callback",
        element: <GoogleRedirect />
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
