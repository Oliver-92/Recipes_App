import { useEffect, useRef } from 'react';
import { FOCUSABLE_ELEMENTS_SELECTOR, FOCUS_TIMEOUT } from '../../constants';

/**
 * Accessible and responsive Modal component
 * Features: ESC to close, focus trap, ARIA attributes
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Handle ESC key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Store the element that had focus before opening modal
    previousFocusRef.current = document.activeElement;

    // Handle ESC key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Focus trap implementation
    const handleTabKey = (e) => {
      if (!modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        FOCUSABLE_ELEMENTS_SELECTOR
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabKey);
    document.body.style.overflow = 'hidden';

    // Focus first focusable element in modal
    setTimeout(() => {
      const focusableElements = modalRef.current?.querySelectorAll(
        FOCUSABLE_ELEMENTS_SELECTOR
      );
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, FOCUS_TIMEOUT);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = 'unset';

      // Restore focus to previous element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 backdrop-blur-lg h-full bg-opacity-50 z-40 transition-opacity'
        onClick={onClose}
        aria-hidden='true'
      />

      {/* Modal */}
      <div
        className='fixed inset-0 z-50 flex items-center justify-center p-4'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        <div
          ref={modalRef}
          className={`${sizes[size]} w-full bg-white/70 rounded-bl-4xl rounded-tl-4xl shadow-xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2
             [&::-webkit-scrollbar-track]:bg-gray-100
             [&::-webkit-scrollbar-thumb]:bg-gray-300
             dark:[&::-webkit-scrollbar-track]:bg-neutral-700
             dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 `}
        >
          {/* Header */}
          <div className='sticky top-0 bg-primary  px-6 py-4 flex items-center justify-between'>
            <h2 id='modal-title' className='text-xl font-bold text-white'>
              {title}
            </h2>
            <button
              onClick={onClose}
              className='text-white hover:text-gray-300 transition-colors'
              aria-label='Close modal'
              type='button'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className='p-6'>{children}</div>
        </div>
      </div>
    </>
  );
};
