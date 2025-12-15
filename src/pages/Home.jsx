import { useState, useEffect, useCallback } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { useRecipeModal } from '../hooks/useRecipeModal';
import { useRecipeSearch } from '../hooks/useRecipeSearch';
import { CategorySelect } from '../components/molecules/CategorySelect';
import { RecipeSearch } from '../components/molecules/RecipeSearch';
import { RecipesGrid } from '../components/organisms/RecipesGrid';
import { Pagination } from '../components/molecules/Pagination';
import { Modal } from '../components/ui/Modal';
import { RecipeDetail } from '../components/molecules/RecipeDetail';
import { getMealsByCategory } from '../services/mealService';
import { useRecipesStore } from '../store/recipesStore';
import { useUiStore } from '../store/uiStore';
import { DEFAULT_PAGE_SIZE } from '../constants';

/**
 * Home Page - Recipe Explorer
 */
export default function Home() {
  // Hooks
  const { categories, selectedCategory, isLoading, filterByCategory } = useRecipes();
  const { isAuthenticated } = useAuth();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const {
    isModalOpen,
    recipeDetail,
    isLoadingDetail,
    viewRecipeDetails,
    closeModal
  } = useRecipeModal();
  const {
    searchResults,
    isSearchMode,
    handleSearchResults,
    clearSearch
  } = useRecipeSearch();

  // Local state
  const { filteredRecipes, setFilteredRecipes } = useRecipesStore();
  const { showNotification } = useUiStore();
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filtered recipes change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredRecipes.length, isSearchMode, selectedCategory]);

  // Load recipes when category is selected
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, setFilteredRecipes, showNotification]);

  // Memoized event handlers to prevent unnecessary re-renders
  const onSearchResults = useCallback((results) => {
    handleSearchResults(results);
    if (results && results.length > 0) {
      filterByCategory(null);
    }
  }, [handleSearchResults, filterByCategory]);

  const handleFavoriteClick = useCallback(async (recipe) => {
    await toggleFavorite(recipe, isAuthenticated);
  }, [toggleFavorite, isAuthenticated]);

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='text-center m-6'>
        <h1 className='sm:text-6xl text-5xl font-bold text-white mb-5 backdrop-blur-sm w-fit mx-auto'>
          EXPLORE OUR RECIPES
        </h1>
        <p className='text-white text-xl font-semibold'>
          Discover thousands of delicious recipes from TheMealDB
        </p>
      </div>

      {/* Search */}
      <section className='bg-white p-2 rounded-full shadow-md lg:w-1/2 w-full mx-auto mb-4'>
        <RecipeSearch onResults={onSearchResults} />
      </section>

      {/* Category Filters */}
      {!isSearchMode && (
        <section>
          <h2 className='text-2xl font-bold text-white mb-4'>Categories</h2>
          <CategorySelect
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={filterByCategory}
            isLoading={isLoading}
          />
        </section>
      )}

      {/* Recipes Grid */}
      <section>
        {isSearchMode && searchResults.length > 0 && (
          <h2 className='text-xl font-bold text-white mb-4'>
            Search results ({searchResults.length})
          </h2>
        )}
        <RecipesGrid
          recipes={filteredRecipes.slice(
            (currentPage - 1) * DEFAULT_PAGE_SIZE,
            currentPage * DEFAULT_PAGE_SIZE
          )}
          isLoading={isLoadingRecipes}
          onViewDetails={viewRecipeDetails}
          onFavorite={handleFavoriteClick}
          favorites={favorites}
          showFavoriteBtn={isAuthenticated}
        />

        {/* Pagination */}
        <Pagination
          totalItems={filteredRecipes.length}
          pageSize={DEFAULT_PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </section>

      {/* Recipe Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title='Recipe Details'
        size='lg'
      >
        {isLoadingDetail ? (
          <div className='text-center py-8'>
            <p className='text-gray-500'>Loading...</p>
          </div>
        ) : (
          <RecipeDetail
            recipe={recipeDetail}
            onFavorite={handleFavoriteClick}
            isFavorite={recipeDetail ? isFavorite(recipeDetail.idMeal) : false}
            isAuthenticated={isAuthenticated}
          />
        )}
      </Modal>
    </div>
  );
}
