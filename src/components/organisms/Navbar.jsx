import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';
import { BiHomeAlt } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { ROUTES, APP_NAME } from '../../constants';

/**
 * Navbar principal
 */
export const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await onLogout();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className='bg-white shadow-md w-full sticky top-0 z-40'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link
            to={ROUTES.HOME}
            className='flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/70 transition-colors'
          >
            <span><BiHomeAlt /></span>
            <span>{APP_NAME}</span>
          </Link>

          {/* Menu */}
          <div className='flex items-center gap-4'>
            {user ? (
              <>
                <Link
                  to={ROUTES.PROFILE}
                  className='text-gray-700 hover:text-primary/70 font-medium transition-colors'
                >
                  <span className='flex flex-row gap-1.5 text-primary items-center sm:text-base text-xs'><FaUserAlt /> My Profile</span>
                </Link>
                <Button
                  variant='danger'
                  size='sm'
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant='ghost' size='sm'>
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button variant='primary' size='sm'>
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
