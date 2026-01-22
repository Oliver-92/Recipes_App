import { useState, useEffect } from 'react';
import { useRecipesStore } from '../store/recipesStore';
import { useUiStore } from '../store/uiStore';
import { getMealsByCategory } from '../services/mealService';

/**
 * Custom hook to manage category-based recipe loading
 * Automatically loads recipes when selectedCategory changes
 * Handles loading states, errors, and clears search results
 */
export const useCategoryRecipes = (selectedCategory, clearSearch, isSearchMode) => {
    const { setFilteredRecipes } = useRecipesStore();
    const { showNotification } = useUiStore();
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
                const recipes = await getMealsByCategory(selectedCategory);
                setFilteredRecipes(recipes);
                clearSearch();
            } catch (error) {
                console.error('Error loading recipes:', error);
                showNotification('Error loading recipes', 'error');
            } finally {
                setIsLoadingRecipes(false);
            }
        };

        loadRecipes();
    }, [selectedCategory, setFilteredRecipes, showNotification, clearSearch, isSearchMode]);

    return { isLoadingRecipes };
};
