import { useEffect, useState } from 'react';
import { useRecipesStore } from '../store/recipesStore';
import { getCategories, getMealDetail } from '../services/mealService';

/**
 * Custom hook to manage recipes
 * Handles category loading and recipe detail fetching
 */
export const useRecipes = () => {
  const [error, setError] = useState(null);
  const {
    categories,
    selectedCategory,
    isLoading,
    setCategories,
    setSelectedCategory,
    setIsLoading,
  } = useRecipesStore();

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError('Error loading categories');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories.length === 0) {
      loadCategories();
    }
  }, [categories.length, setCategories, setIsLoading]);

  /**
   * Get recipe detail by ID
   */
  const getRecipeDetail = async (mealId) => {
    try {
      const recipe = await getMealDetail(mealId);
      return recipe;
    } catch (err) {
      setError('Error loading recipe details');
      console.error(err);
      throw err;
    }
  };

  /**
   * Change selected category
   */
  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  return {
    categories,
    selectedCategory,
    isLoading,
    error,
    filterByCategory,
    getRecipeDetail,
  };
};

