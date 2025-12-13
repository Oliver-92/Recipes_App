import { memo } from 'react';

/**
 * Reusable Input component
 * Memoized to prevent unnecessary re-renders
 */
const Input = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  className = '',
  disabled = false,
  label,
  error,
  ...props
}) => {
  const baseStyles =
    ' px-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent transition-all';

  const errorStyles = error
    ? 'border-red-500 focus:ring-red-500'
    : '';

  const finalClass = `${baseStyles} ${errorStyles} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''
    } ${className}`;

  return (
    <div className='flex flex-col gap-2 w-full'>
      {label && (
        <label className='text-sm font-medium text-gray-950'>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={finalClass}
        {...props}
      />
      {error && (
        <span className='text-xs text-red-600 font-medium'>{error}</span>
      )}
    </div>
  );
};

export default memo(Input);
export { Input };
