import { useState, useEffect } from 'react';
import { useRecipesStore } from '../store/recipesStore';
import { getMealsByCategory } from '../services/mealService';
import { formatError } from '../utils/errorHandler';

/**
 * Custom hook to manage category-based recipe loading
 * Automatically loads recipes when selectedCategory changes
 * Uses centralized error state from Zustand
 */
export const useCategoryRecipes = (selectedCategory, clearSearch, isSearchMode) => {
    const { setFilteredRecipes, setError, clearError } = useRecipesStore();
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

    useEffect(() => {
        const loadRecipes = async () => {
            if (!selectedCategory) {
                if (!isSearchMode) {
                    setFilteredRecipes([]);
                }
                return;
            }

            try {
                setIsLoadingRecipes(true);
                clearError('recipes');
                const recipes = await getMealsByCategory(selectedCategory);
                setFilteredRecipes(recipes);
                clearSearch();
            } catch (error) {
                const errorMessage = formatError(error);
                setError('recipes', errorMessage);
                console.error('Error loading recipes:', error);
            } finally {
                setIsLoadingRecipes(false);
            }
        };

        loadRecipes();
    }, [selectedCategory, setFilteredRecipes, clearSearch, isSearchMode, setError, clearError]);

    return { isLoadingRecipes };
};
