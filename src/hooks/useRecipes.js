import { useEffect, useCallback } from 'react';
import { useRecipesStore } from '../store/recipesStore';
import { getCategories, getMealDetail } from '../services/mealService';
import { formatError } from '../utils/errorHandler';

/**
 * Custom hook to manage recipes
 * Handles category loading and recipe detail fetching
 * Uses centralized error state from Zustand
 */
export const useRecipes = () => {
  const {
    categories,
    selectedCategory,
    isLoading,
    errors,
    setCategories,
    setSelectedCategory,
    setIsLoading,
    setError,
    clearError,
  } = useRecipesStore();

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        clearError('categories');
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        const errorMessage = formatError(err);
        setError('categories', errorMessage);
        console.error('Error loading categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories.length === 0) {
      loadCategories();
    }
  }, [categories.length, setCategories, setIsLoading, setError, clearError]);

  /**
   * Get recipe detail by ID
   */
  const getRecipeDetail = useCallback(async (mealId) => {
    try {
      clearError('detail');
      const recipe = await getMealDetail(mealId);
      return recipe;
    } catch (err) {
      const errorMessage = formatError(err);
      setError('detail', errorMessage);
      console.error('Error loading recipe details:', err);
      throw err;
    }
  }, [setError, clearError]);

  /**
   * Change selected category
   */
  const filterByCategory = useCallback((category) => {
    setSelectedCategory(category);
  }, [setSelectedCategory]);

  return {
    categories,
    selectedCategory,
    isLoading,
    error: errors.categories,
    filterByCategory,
    getRecipeDetail,
  };
};

