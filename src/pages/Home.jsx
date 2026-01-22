import { useCallback } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { useRecipeModal } from '../hooks/useRecipeModal';
import { useRecipeSearch } from '../hooks/useRecipeSearch';
import { useCategoryRecipes } from '../hooks/useCategoryRecipes';
import { usePagination } from '../hooks/usePagination';
import { CategorySelect } from '../components/molecules/CategorySelect';
import { RecipeSearch } from '../components/molecules/RecipeSearch';
import { RecipesGrid } from '../components/organisms/RecipesGrid';
import { Pagination } from '../components/molecules/Pagination';
import { Modal } from '../components/ui/Modal';
import { RecipeDetail } from '../components/molecules/RecipeDetail';
import { useRecipesStore } from '../store/recipesStore';

/**
 * Home Page - Recipe Explorer
 * Purely declarative component - all data fetching logic is in hooks
 */
export default function Home() {
  // Data hooks
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

  // Store
  const { filteredRecipes } = useRecipesStore();

  // Category-based recipe loading (automatic)
  const { isLoadingRecipes } = useCategoryRecipes(selectedCategory, clearSearch, isSearchMode);

  // Pagination (automatic page reset)
  const { currentPage, setCurrentPage, paginatedData, totalItems, pageSize } = usePagination(
    filteredRecipes,
    [isSearchMode, selectedCategory]
  );

  // Event handlers
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
        <h1 className='sm:text-6xl text-5xl font-bold text-gray-950 mb-5 backdrop-blur-sm w-fit mx-auto'>
          EXPLORE OUR <span className='text-primary'>RECIPES</span>
        </h1>
        <p className='text-black text-xl font-semibold'>
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
          <h2 className='text-2xl font-bold text-gray-700 mb-4'>Categories</h2>
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
          recipes={paginatedData}
          isLoading={isLoadingRecipes}
          onViewDetails={viewRecipeDetails}
          onFavorite={handleFavoriteClick}
          favorites={favorites}
          showFavoriteBtn={isAuthenticated}
        />

        {/* Pagination */}
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
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
