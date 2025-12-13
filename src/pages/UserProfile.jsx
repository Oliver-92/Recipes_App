import { useUserStore } from '../store/userStore';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { useRecipeModal } from '../hooks/useRecipeModal';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Spinner';
import { RecipeDetail } from '../components/molecules/RecipeDetail';
import { FaUserAlt } from 'react-icons/fa';
import { TfiReload } from 'react-icons/tfi';

/**
 * User Profile Page
 * Displays user information and favorite recipes
 */
export default function UserProfile() {
  const { user, isLoadingUser } = useUserStore();
  const { isAuthenticated } = useAuth();
  const { favorites, refreshFavorites, isProcessing } = useFavorites();
  const {
    isModalOpen,
    recipeDetail,
    isLoadingDetail,
    viewRecipeDetails,
    closeModal,
  } = useRecipeModal();

  // Check authentication
  if (!isAuthenticated || !user) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500 text-lg'>
          You must log in to view this page
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          <span className='flex flex-row gap-2.5 text-primary'>
            <FaUserAlt /> My Profile
          </span>
        </h1>
        <p className='text-gray-600 mb-4'>{user.email}</p>
        <p className='text-gray-700'>
          You have{' '}
          <span className='font-bold text-primary'>{favorites.length}</span>{' '}
          favorite recipes
        </p>
      </div>

      {/* Actions */}
      <div className='flex gap-3'>
        <Button
          variant='primary'
          onClick={refreshFavorites}
          disabled={isLoadingUser || isProcessing}
        >
          {isLoadingUser || isProcessing ? (
            <Spinner size='sm' />
          ) : (
            <span className='flex flex-row gap-1.5 items-center'>
              <TfiReload /> Reload
            </span>
          )}
        </Button>
      </div>

      {/* Favorites Grid */}
      <section>
        {isLoadingUser ? (
          <div className='flex justify-center items-center py-12'>
            <Spinner size='lg' />
          </div>
        ) : favorites.length === 0 ? (
          <div className='text-center py-12 bg-white rounded-lg shadow-md'>
            <p className='text-gray-500 text-lg mb-4'>
              You don't have any favorite recipes yet
            </p>
            <Button
              variant='primary'
              onClick={() => (window.location.href = '/')}
            >
              Explore Recipes
            </Button>
          </div>
        ) : (
          <>
            <h2 className='text-xl font-bold text-white mb-4'>
              My Favorites ({favorites.length})
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {favorites.map((favorite) => (
                <FavoriteCard
                  key={favorite.id}
                  favorite={favorite}
                  onViewDetails={viewRecipeDetails}
                  onRemove={refreshFavorites}
                />
              ))}
            </div>
          </>
        )}
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
          <RecipeDetail recipe={recipeDetail} isAuthenticated={false} />
        )}
      </Modal>
    </div>
  );
}

/**
 * Favorite Recipe Card Component
 */
function FavoriteCard({ favorite, onViewDetails, onRemove }) {
  const { toggleFavorite } = useFavorites();

  const handleRemove = async () => {
    await toggleFavorite(favorite, true);
    onRemove();
  };

  return (
    <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden'>
      {/* Image */}
      <div className='relative w-full h-48 overflow-hidden bg-gray-200'>
        <img
          src={favorite.strMealThumb}
          alt={favorite.strMeal}
          className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
          loading='lazy'
        />
      </div>

      {/* Content */}
      <div className='p-4 flex flex-col gap-3'>
        <h3 className='font-bold text-lg text-gray-900 line-clamp-2'>
          {favorite.strMeal}
        </h3>

        <div className='flex gap-2'>
          <Button
            variant='primary'
            size='sm'
            fullWidth
            onClick={() => onViewDetails(favorite)}
          >
            Details
          </Button>
          <Button variant='danger' size='sm' onClick={handleRemove}>
            ✕
          </Button>
        </div>
      </div>
    </div>
  );
}

