import { memo } from 'react';
import { Button } from '../atoms/Button';

/**
 * Recipe Card Component
 * Memoized with custom comparison to prevent unnecessary re-renders
 */
const RecipeCard = ({
  recipe,
  onViewDetails,
  onFavorite,
  isFavorite = false,
  showFavoriteBtn = true,
}) => {
  return (
    <div className='bg-white/70 rounded-lg rounded-bl-4xl rounded-tr-4xl shadow-md hover:shadow-lg transition-shadow overflow-hidden sm:w-full w-10/12 mx-auto'>
      {/* Image */}
      <div className='relative w-full h-48 overflow-hidden bg-gray-200'>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className='w-full object-cover hover:scale-105 transition-transform duration-300'
          loading='lazy'
        />
        {showFavoriteBtn && (
          <button
            onClick={() => onFavorite(recipe)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white/70 text-gray-700 hover:bg-white'
              }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className='w-5 h-5'
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className='p-4 flex flex-col gap-3'>
        <h3 className='font-bold sm:text-lg text-base text-gray-700 line-clamp-2 truncate '>
          {recipe.strMeal}
        </h3>

        <Button
          variant='primary'
          size='sm'
          fullWidth
          onClick={() => onViewDetails(recipe)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

// Custom comparison function for better memoization
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.recipe.idMeal === nextProps.recipe.idMeal &&
    prevProps.isFavorite === nextProps.isFavorite &&
    prevProps.showFavoriteBtn === nextProps.showFavoriteBtn
  );
};

export default memo(RecipeCard, areEqual);
export { RecipeCard };
