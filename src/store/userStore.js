import { create } from 'zustand';

/**
 * Store to manage user state
 * - Authenticated user
 * - User favorites
 */
export const useUserStore = create((set) => ({
  user: null,
  favorites: [],
  isLoadingUser: false,

  // Actions
  setUser: (user) => set({ user }),
  setFavorites: (favorites) => set({ favorites }),
  setIsLoadingUser: (loading) => set({ isLoadingUser: loading }),

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
  resetUser: () => set({ user: null, favorites: [] }),

  // Check if it's in favorites
  isFavorite: (recipeId, state) =>
    state.favorites.some((fav) => fav.idMeal === recipeId),
}));
