import { useState } from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { searchMealsByName } from '../../services/mealService';
import { useUiStore } from '../../store/uiStore';
import { Spinner } from '../atoms/Spinner';
import { FaSearch } from "react-icons/fa";

/**
 * Buscador de recetas por nombre
 */
export const RecipeSearch = ({ onResults, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { showNotification } = useUiStore();

  const handleSearch = async (e) => {
    e.preventDefault();

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

      onResults(results);
    } catch (error) {
      console.error('Error searching:', error);
      showNotification('Search error', 'error');
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    onResults([]);
  };

  return (
    <form onSubmit={handleSearch} className='w-full flex items-center gap-2'>
      {/* Ensure the input can shrink on small screens */}
      <div className='flex-1 min-w-0'>
        <Input
          type='text'
          placeholder='Search recipe...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isSearching || isLoading}
          className='w-full font-semibold min-w-0'
        />
      </div>

      <Button
        type='submit'
        variant='primary'
        disabled={isSearching || isLoading}
        className='shrink-0'
      >
        {isSearching ? <Spinner size='sm' /> :  <FaSearch />}
      </Button>
      {searchTerm && (
        <Button
          type='button'
          variant='secondary'
          onClick={handleReset}
          disabled={isSearching || isLoading}
          className='shrink-0'
        >
          Clear
        </Button>
       )} 
    </form>
  );
};
