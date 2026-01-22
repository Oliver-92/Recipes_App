/**
 * Helper functions
 */

/**
 * Extract ingredients from a recipe
 */
export const getRecipeIngredients = (recipe) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient,
        measure: measure || ''
      });
    }
  }
  return ingredients;
};

/**
 * Validate email
 */
export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

/**
 * Validate password
 */
export const isValidPassword = (password, minLength = 6) => {
  return password && password.length >= minLength;
};

/**
 * Debounce helper
 */
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Note: formatFirebaseError has been moved to utils/errorHandler.js
// Import from there instead: import { formatFirebaseError } from '../utils/errorHandler';
