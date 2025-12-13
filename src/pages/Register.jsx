import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Spinner';
import { GiHotMeal } from "react-icons/gi";

/**
 * Registration Page
 */
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register(email, password);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='min-h-screen bg-transparent flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <Link to='/' className='text-3xl font-bold text-gray-900 mb-2'>
            <span className='flex flex-row justify-center gap-1.5 text-primary mb-2'><GiHotMeal /> Recipes App</span>
          </Link>
          <p className='text-gray-600'>Crea tu cuenta</p>
        </div>

        {/* Global error */}
        {error && (
          <div className='mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm'>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            type='email'
            label='Email'
            placeholder='tu@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            disabled={isLoading}
          />

          <Input
            type='password'
            label='Contraseña'
            placeholder='••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            disabled={isLoading}
          />

          <Input
            type='password'
            label='Confirmar Contraseña'
            placeholder='••••••'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            disabled={isLoading}
          />

          <Button
            type='submit'
            variant='primary'
            fullWidth
            disabled={isLoading}
            className='mt-6'
          >
            {isLoading ? (
              <Spinner size='sm' className='inline' />
            ) : (
              'Crear Cuenta'
            )}
          </Button>
        </form>

        {/* Login link */}
        <p className='text-center text-gray-600 text-sm mt-6'>
          ¿Ya tienes cuenta?{' '}
          <Link
            to='/login'
            className='text-blue-600 hover:text-blue-700 font-medium'
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
