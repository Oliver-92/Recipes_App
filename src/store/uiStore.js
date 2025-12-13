import { create } from 'zustand';

/**
 * Store to manage UI state
 * - Modal open/closed
 * - Selected recipe in modal
 * - Notifications
 */
export const useUiStore = create((set) => ({
  isModalOpen: false,
  selectedRecipe: null,
  notification: null,

  // Actions
  openModal: (recipe) => set({ isModalOpen: true, selectedRecipe: recipe }),
  closeModal: () => set({ isModalOpen: false, selectedRecipe: null }),
  showNotification: (message, type = 'success') =>
    set({ notification: { message, type } }),
  hideNotification: () => set({ notification: null }),
}));
