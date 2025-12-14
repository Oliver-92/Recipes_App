import { Navbar } from '../organisms/Navbar';
import { APP_NAME } from '../../constants';

/**
 * Base Layout Component
 * Includes skip navigation for accessibility
 */
export const Layout = ({ children, user, onLogout }) => {
  return (
    <div className='min-h-screen flex flex-col items-center z-40 relative'>
      {/* Skip Navigation Link */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg'
      >
        Skip to main content
      </a>

      <Navbar user={user} onLogout={onLogout} />

      <main id='main-content' className='flex-1 sm:w-9/12 w-11/12' tabIndex={-1}>
        <div className='mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-gray-900 w-full text-white py-6 mt-auto'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p className='text-gray-400 sm:text-sm text-xs'>
            © 2025 {APP_NAME}. Powered by TheMealDB API.
          </p>
          <p className="text-gray-400 mt-2 sm:text-sm text-xs">
            Developed by <a
              href="https://oliver-92.github.io/Portafolio/"
              className="font-semibold hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ezequiel Oliver
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
