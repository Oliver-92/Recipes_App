import { useMemo } from 'react';
import { Spinner } from '../atoms/Spinner';
import { RecipeCard } from '../molecules/RecipeCard';

/**
 * Recipes Grid Component
 * Displays a grid of recipe cards with memoized favorite IDs
 */
export const RecipesGrid = ({
  recipes,
  isLoading,
  onViewDetails,
  onFavorite,
  favorites,
  showFavoriteBtn = true,
}) => {
  // Memoize favorite IDs to avoid recalculating on every render
  const favoriteIds = useMemo(
    () => favorites.map((fav) => fav.idMeal),
    [favorites]
  );

  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-12'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-white font-bold text-3xl'>No recipes available</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onViewDetails={onViewDetails}
          onFavorite={onFavorite}
          isFavorite={favoriteIds.includes(recipe.idMeal)}
          showFavoriteBtn={showFavoriteBtn}
        />
      ))}
    </div>
  );
};
