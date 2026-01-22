import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import {
  registerUser,
  loginUser,
  logoutUser,
  onAuthChange,
} from '../services/authService';
import { getUserFavorites } from '../services/favoriteService';
import { formatError } from '../utils/errorHandler';

/**
 * Custom hook to handle authentication
 * Uses centralized error state from Zustand
 */
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    user,
    authError,
    setUser,
    setFavorites,
    setIsLoadingUser,
    setAuthError,
    clearAuthError,
    resetUser
  } = useUserStore();

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
        const errorMessage = formatError(err);
        setAuthError(errorMessage);
        console.error('Error loading favorites:', err);
      } finally {
        setIsLoadingUser(false);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setUser, setFavorites, resetUser, setIsLoadingUser, setAuthError]);

  // Authentication functions
  const register = async (email, password) => {
    try {
      setIsLoading(true);
      clearAuthError();
      const user = await registerUser(email, password);
      return user;
    } catch (err) {
      const errorMessage = formatError(err);
      setAuthError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      clearAuthError();
      const user = await loginUser(email, password);
      return user;
    } catch (err) {
      const errorMessage = formatError(err);
      setAuthError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with Google
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      clearAuthError();
      const { loginWithGoogle: googleLogin } = await import('../services/authService');
      const user = await googleLogin();
      return user;
    } catch (err) {
      const errorMessage = formatError(err);
      setAuthError(errorMessage);
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
      const errorMessage = formatError(err);
      setAuthError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error: authError,
    register,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
  };
};
