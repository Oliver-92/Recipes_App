import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spinner } from '../components/atoms/Spinner';
import { ProtectedRoute } from './ProtectedRoute';
import { Layout } from '../components/templates/Layout';
import { useAuth } from '../hooks/useAuth';

// Lazy load page components for better performance
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const UserProfile = lazy(() => import('../pages/UserProfile'));

/**
 * Main Application Router
 * Uses lazy loading for all routes to improve initial load time
 */
export const AppRouter = () => {
  const { user, isLoading, logout, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <Router>
      <Suspense
        fallback={
          <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='lg' />
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route
            path='/'
            element={
              <Layout user={user} onLogout={logout}>
                <Home />
              </Layout>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Protected Routes */}
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
              >
                <Layout user={user} onLogout={logout}>
                  <UserProfile />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path='*'
            element={
              <Layout user={user} onLogout={logout}>
                <div className='text-center py-12'>
                  <h1 className='text-4xl font-bold text-gray-900 mb-4'>404</h1>
                  <p className='text-gray-600 text-lg'>Page not found</p>
                </div>
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};
