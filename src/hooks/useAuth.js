import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import {
  registerUser,
  loginUser,
  logoutUser,
  onAuthChange,
} from '../services/authService';
import { getUserFavorites } from '../services/favoriteService';

/**
 * Custom hook to handle authentication
 */
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser, setFavorites, setIsLoadingUser, resetUser } =
    useUserStore();

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser) => {
      try {
        if (authUser) {
          // Logged-in user
          setUser(authUser);
          setIsLoadingUser(true);

          // Load favorites
          const favorites = await getUserFavorites(authUser.uid);
          setFavorites(favorites);
        } else {
          // No user logged in
          resetUser();
        }
      } catch (err) {
        console.error('Error loading favorites:', err);
        setError(err.message);
      } finally {
        setIsLoadingUser(false);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setUser, setFavorites, resetUser, setIsLoadingUser]);

  // Authentication functions
  const register = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await registerUser(email, password);
      return user;
    } catch (err) {
      const { formatFirebaseError } = await import('../utils/helpers');
      const errorMessage = formatFirebaseError(err.code);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await loginUser(email, password);
      return user;
    } catch (err) {
      const { formatFirebaseError } = await import('../utils/helpers');
      const errorMessage = formatFirebaseError(err.code);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with Google
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { loginWithGoogle: googleLogin } = await import('../services/authService');
      const user = await googleLogin();
      return user;
    } catch (err) {
      const { formatFirebaseError } = await import('../utils/helpers');
      const errorMessage = formatFirebaseError(err.code);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    register,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
  };
};
