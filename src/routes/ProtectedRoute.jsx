import { Navigate } from 'react-router-dom';
import { Spinner } from '../components/atoms/Spinner';

/**
 * Protected route - only authenticated users
 */
export const ProtectedRoute = ({ isAuthenticated, isLoading, children }) => {
  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};
