import { useState } from 'react';
import { useRecipesStore } from '../store/recipesStore';
import { searchMealsByName } from '../services/mealService';
import { useUiStore } from '../store/uiStore';

/**
 * Custom hook to manage recipe search functionality
 */
export const useRecipeSearch = () => {
    const { setFilteredRecipes } = useRecipesStore();
    const { showNotification } = useUiStore();
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    /**
     * Handle search results
     */
    const handleSearchResults = (results) => {
        setSearchResults(results);
        setFilteredRecipes(results || []);

        if (results && results.length > 0) {
            setIsSearchMode(true);
        } else {
            setIsSearchMode(false);
        }
    };

    /**
     * Clear search and reset to category view
     */
    const clearSearch = () => {
        setSearchResults([]);
        setIsSearchMode(false);
        // Don't clear filteredRecipes here - let the category loading handle it
    };

    /**
     * Perform search by name
     */
    const searchRecipes = async (searchTerm) => {
        if (!searchTerm.trim()) {
            showNotification('Enter a search term', 'warning');
            return;
        }

        try {
            setIsSearching(true);
            const results = await searchMealsByName(searchTerm);

            if (results.length === 0) {
                showNotification('No recipes found', 'info');
            } else {
                showNotification(`${results.length} recipe(s) found`, 'success');
            }

            handleSearchResults(results);
        } catch (error) {
            console.error('Error searching:', error);
            showNotification('Search error', 'error');
        } finally {
            setIsSearching(false);
        }
    };

    return {
        searchResults,
        isSearchMode,
        isSearching,
        handleSearchResults,
        clearSearch,
        searchRecipes,
    };
};
