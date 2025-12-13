import { create } from 'zustand';

/**
 * Store to manage recipes state
 * - Available categories
 * - Filtered recipes
 * - Selected category
 * - Loading states for different operations
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

  // Computed getter for any loading state
  get isLoading() {
    return this.loadingStates.categories || this.loadingStates.recipes || this.loadingStates.detail;
  },

  // Reset
  resetFilters: () => set({ selectedCategory: null, filteredRecipes: [] }),
}));
