import { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { useUiStore } from '../store/uiStore';
import {
    addFavorite,
    removeFavorite,
    getUserFavorites,
} from '../services/favoriteService';
import { MESSAGES } from '../constants';

/**
 * Custom hook to manage favorite recipes
 */
export const useFavorites = () => {
    const { user, favorites, setFavorites } = useUserStore();
    const { showNotification } = useUiStore();
    const [isProcessing, setIsProcessing] = useState(false);

    /**
     * Check if a recipe is in favorites
     */
    const isFavorite = (recipeId) => {
        return favorites.some((fav) => fav.idMeal === recipeId);
    };

    /**
     * Toggle favorite status of a recipe
     */
    const toggleFavorite = async (recipe, isAuthenticated) => {
        if (!isAuthenticated) {
            showNotification(MESSAGES.AUTH_REQUIRED, 'error');
            return false;
        }

        if (!user) {
            showNotification('User not found', 'error');
            return false;
        }

        try {
            setIsProcessing(true);
            const isFav = isFavorite(recipe.idMeal);

            if (isFav) {
                // Remove from favorites
                const favDoc = favorites.find((fav) => fav.idMeal === recipe.idMeal);
                await removeFavorite(favDoc.id);
                const updated = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
                setFavorites(updated);
                showNotification(MESSAGES.REMOVED_FROM_FAVORITES, 'success');
            } else {
                // Add to favorites
                await addFavorite(user.uid, recipe);
                const updated = await getUserFavorites(user.uid);
                setFavorites(updated);
                showNotification(MESSAGES.ADDED_TO_FAVORITES, 'success');
            }

            return true;
        } catch (error) {
            console.error('Error toggling favorite:', error);
            showNotification('Error saving favorite', 'error');
            return false;
        } finally {
            setIsProcessing(false);
        }
    };

    /**
     * Refresh favorites from database
     */
    const refreshFavorites = async () => {
        if (!user) return;

        try {
            setIsProcessing(true);
            const updated = await getUserFavorites(user.uid);
            setFavorites(updated);
            showNotification('Favorites updated', 'success');
        } catch (error) {
            console.error('Error refreshing favorites:', error);
            showNotification('Error updating favorites', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        favorites,
        isFavorite,
        toggleFavorite,
        refreshFavorites,
        isProcessing,
    };
};
