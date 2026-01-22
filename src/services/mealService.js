import { API_BASE_URL } from '../constants';
import { httpClient } from '../utils/httpClient';

/**
 * Service for consuming TheMealDB API
 * Base URL: https://www.themealdb.com/api/json/v1/1/
 * Uses centralized HTTP client - errors are handled by the client
 */

/**
 * Get all recipe categories
 */
export const getCategories = async () => {
  const data = await httpClient.get(`${API_BASE_URL}/categories.php`);
  return data.categories || [];
};

/**
 * Get recipes by category
 */
export const getMealsByCategory = async (category) => {
  const data = await httpClient.get(`${API_BASE_URL}/filter.php?c=${category}`);
  return data.meals || [];
};

/**
 * Get recipe details by ID
 */
export const getMealDetail = async (mealId) => {
  const data = await httpClient.get(`${API_BASE_URL}/lookup.php?i=${mealId}`);
  return data.meals?.[0] || null;
};

/**
 * Search recipes by name
 */
export const searchMealsByName = async (name) => {
  const data = await httpClient.get(`${API_BASE_URL}/search.php?s=${name}`);
  return data.meals || [];
};
