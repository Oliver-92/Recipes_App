import { useState } from 'react';
import { useUiStore } from '../store/uiStore';
import { getMealDetail } from '../services/mealService';

/**
 * Custom hook to manage recipe modal and detail loading
 */
export const useRecipeModal = () => {
    const { isModalOpen, selectedRecipe, openModal, closeModal, showNotification } =
        useUiStore();
    const [recipeDetail, setRecipeDetail] = useState(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);

    /**
     * Open modal and load recipe details
     */
    const viewRecipeDetails = async (recipe) => {
        try {
            setIsLoadingDetail(true);
            const detail = await getMealDetail(recipe.idMeal);
            setRecipeDetail(detail);
            openModal(recipe);
        } catch (error) {
            console.error('Error loading recipe details:', error);
            showNotification('Error loading details', 'error');
        } finally {
            setIsLoadingDetail(false);
        }
    };

    /**
     * Close modal and reset detail
     */
    const handleCloseModal = () => {
        closeModal();
        setRecipeDetail(null);
    };

    return {
        isModalOpen,
        selectedRecipe,
        recipeDetail,
        isLoadingDetail,
        viewRecipeDetails,
        closeModal: handleCloseModal,
    };
};
