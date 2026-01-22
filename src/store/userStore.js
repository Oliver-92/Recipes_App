import { create } from 'zustand';

/**
 * Store to manage user state
 * - Authenticated user
 * - User favorites
 * - Authentication errors
 */
export const useUserStore = create((set) => ({
  user: null,
  favorites: [],
  isLoadingUser: false,
  authError: null,

  // Actions
  setUser: (user) => set({ user }),
  setFavorites: (favorites) => set({ favorites }),
  setIsLoadingUser: (loading) => set({ isLoadingUser: loading }),
  setAuthError: (error) => set({ authError: error }),
  clearAuthError: () => set({ authError: null }),

  // Add favorite
  addFavorite: (recipe) =>
    set((state) => ({
      favorites: [...state.favorites, recipe],
    })),

  // Remove favorite
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.idMeal !== recipeId),
    })),

  // Reset
  resetUser: () => set({ user: null, favorites: [], authError: null }),

  // Check if it's in favorites
  isFavorite: (recipeId, state) =>
    state.favorites.some((fav) => fav.idMeal === recipeId),
}));

