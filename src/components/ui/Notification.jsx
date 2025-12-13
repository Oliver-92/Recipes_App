import { useEffect } from 'react';

/**
 * Notification (Toast) Component
 * Accessible with ARIA live regions for screen reader announcements
 */
export const Notification = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  // Use assertive for errors, polite for others
  const ariaLive = type === 'error' ? 'assertive' : 'polite';

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in-up z-50`}
      role='alert'
      aria-live={ariaLive}
      aria-atomic='true'
    >
      <span className='text-xl font-bold' aria-hidden='true'>{icons[type]}</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        className='ml-2 hover:opacity-75 transition-opacity'
        aria-label='Close notification'
        type='button'
      >
        ✕
      </button>
    </div>
  );
};
