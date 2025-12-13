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
 * Format Firebase error
 */
export const formatFirebaseError = (code) => {
  const errors = {
    'auth/email-already-in-use': 'El email ya está registrado',
    'auth/invalid-credential': 'Email o contraseña incorrectos',
    'auth/weak-password': 'La contraseña es muy débil',
    'auth/invalid-email': 'El email no es válido',
    'auth/operation-not-allowed': 'Operación no permitida',
    'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
  };

  return errors[code] || 'Error desconocido. Intenta de nuevo';
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
