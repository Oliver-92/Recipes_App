import { Button } from '../atoms/Button';
import { getRecipeIngredients } from '../../utils/helpers';
import { FaYoutube, FaPaperclip } from 'react-icons/fa';

/**
 * Recipe Detail Component - Displays full recipe information
 * Used in modals across the application
 */
export const RecipeDetail = ({
    recipe,
    onFavorite,
    isFavorite = false,
    isAuthenticated = false,
}) => {
    if (!recipe) return null;

    const ingredients = getRecipeIngredients(recipe);

    return (
        <div className='space-y-6'>
            {/* Image */}
            <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className='w-full h-96 object-cover rounded-lg'
                loading='lazy'
            />

            {/* Basic Info */}
            <div>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                    {recipe.strMeal}
                </h3>
                <div className='flex gap-4 text-sm'>
                    <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full'>
                        {recipe.strCategory}
                    </span>
                    <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full'>
                        {recipe.strArea}
                    </span>
                </div>
            </div>

            {/* Ingredients */}
            <div>
                <h4 className='font-bold text-gray-900 mb-3'>
                    Ingredients ({ingredients.length})
                </h4>
                <ul className='space-y-2'>
                    {ingredients.map((ing, idx) => (
                        <li key={idx} className='flex gap-2 text-gray-700'>
                            <span className='text-blue-600'>•</span>
                            <span>{ing.ingredient}</span>
                            {ing.measure && <span className='text-gray-500'>- {ing.measure}</span>}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Instructions */}
            <div>
                <h4 className='font-bold text-gray-900 mb-3'>Instructions</h4>
                <p className='text-gray-700 whitespace-pre-wrap leading-relaxed'>
                    {recipe.strInstructions}
                </p>
            </div>

            {/* Links */}
            <div className='flex gap-3 flex-wrap'>
                {recipe.strYoutube && (
                    <Button
                        variant='secondary'
                        size='sm'
                        onClick={() => window.open(recipe.strYoutube, '_blank')}
                        aria-label='Watch recipe on YouTube'
                    >
                        <span className='flex flex-row gap-1.5 items-center'>
                            <FaYoutube className='text-red-500' /> YouTube
                        </span>
                    </Button>
                )}
                {recipe.strSource && (
                    <Button
                        variant='secondary'
                        size='sm'
                        onClick={() => window.open(recipe.strSource, '_blank')}
                        aria-label='View recipe source'
                    >
                        <span className='flex flex-row gap-1.5 items-center'>
                            <FaPaperclip /> See Source
                        </span>
                    </Button>
                )}
            </div>

            {/* Favorite Button */}
            {isAuthenticated && onFavorite && (
                <Button
                    variant={isFavorite ? 'danger' : 'primary'}
                    fullWidth
                    onClick={() => onFavorite(recipe)}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                </Button>
            )}
        </div>
    );
};
