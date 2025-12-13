import { API_BASE_URL } from '../constants';

/**
 * Service for consuming TheMealDB API
 * Base URL: https://www.themealdb.com/api/json/v1/1/
 */

/**
 * Get all recipe categories
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories.php`);
    if (!response.ok) throw new Error('Error fetching categories');
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error in getCategories:', error);
    throw error;
  }
};

/**
 * Get recipes by category
 */
export const getMealsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
    if (!response.ok) throw new Error('Error fetching meals');
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error in getMealsByCategory:', error);
    throw error;
  }
};

/**
 * Get recipe details by ID
 */
export const getMealDetail = async (mealId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);
    if (!response.ok) throw new Error('Error fetching meal detail');
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error('Error in getMealDetail:', error);
    throw error;
  }
};

/**
 * Search recipes by name
 */
export const searchMealsByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?s=${name}`);
    if (!response.ok) throw new Error('Error searching meals');
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error in searchMealsByName:', error);
    throw error;
  }
};
