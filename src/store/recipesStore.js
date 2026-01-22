import { create } from 'zustand';

/**
 * Store to manage recipes state
 * - Available categories
 * - Filtered recipes
 * - Selected category
 * - Loading states for different operations
 * - Error states for different operations
 */
export const useRecipesStore = create((set) => ({
  categories: [],
  recipes: [],
  filteredRecipes: [],
  selectedCategory: null,

  // Unified loading states for better granularity
  loadingStates: {
    categories: false,
    recipes: false,
    detail: false,
  },

  // Centralized error states
  errors: {
    categories: null,
    recipes: null,
    detail: null,
  },

  // Actions
  setCategories: (categories) => set({ categories }),
  setRecipes: (recipes) => set({ recipes }),
  setFilteredRecipes: (recipes) => set({ filteredRecipes: recipes }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  // Unified loading state setters
  setLoadingState: (key, value) =>
    set((state) => ({
      loadingStates: { ...state.loadingStates, [key]: value },
    })),

  // Backward compatibility - deprecated
  setIsLoading: (loading) =>
    set((state) => ({
      loadingStates: { ...state.loadingStates, categories: loading },
    })),

  // Error state management
  setError: (key, error) =>
    set((state) => ({
      errors: { ...state.errors, [key]: error },
    })),

  clearError: (key) =>
    set((state) => ({
      errors: { ...state.errors, [key]: null },
    })),

  clearAllErrors: () =>
    set({
      errors: {
        categories: null,
        recipes: null,
        detail: null,
      },
    }),

  // Computed getter for any loading state
  get isLoading() {
    return this.loadingStates.categories || this.loadingStates.recipes || this.loadingStates.detail;
  },

  // Reset
  resetFilters: () => set({ selectedCategory: null, filteredRecipes: [] }),
}));

