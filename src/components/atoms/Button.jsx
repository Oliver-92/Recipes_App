import { memo } from 'react';

/**
 * Reusable Button component with variants
 * Memoized to prevent unnecessary re-renders
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary/70 focus:ring-primary/80 disabled:bg-gray-400',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-400',
    danger:
      'bg-gray-950 text-white hover:bg-gray-800 focus:ring-gray-950 disabled:bg-gray-400',
    ghost:
      'text-primary hover:bg-primary/20 focus:ring-primary disabled:text-gray-400',
  };

  const sizes = {
    sm: 'px-3 py-1 sm:text-base text-xs',
    md: 'px-4 py-2 text-lg',
    lg: 'px-6 py-3 text-xl',
  };

  const finalClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''
    } ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`;

  return (
    <button
      className={finalClass}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default memo(Button);
export { Button };
