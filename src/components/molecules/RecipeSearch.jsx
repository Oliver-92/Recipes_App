import { useState, useEffect, useCallback } from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { useRecipeSearch } from '../../hooks/useRecipeSearch';
import { Spinner } from '../atoms/Spinner';
import { FaSearch } from "react-icons/fa";

/**
 * Buscador de recetas por nombre
 * Implementa debounce para evitar múltiples peticiones API
 * Usa el hook useRecipeSearch para centralizar la lógica
 */
export const RecipeSearch = ({ onResults, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isSearching, searchRecipes } = useRecipeSearch();

  // Debounced search effect
  useEffect(() => {
    // Don't search if term is empty or too short
    if (!searchTerm.trim() || searchTerm.trim().length < 3) {
      if (searchTerm.trim().length === 0) {
        onResults([]);
      }
      return;
    }

    // Set up debounce timer
    const timeoutId = setTimeout(async () => {
      const results = await searchRecipes(searchTerm);
      onResults(results);
    }, 800); // Wait 800ms after user stops typing (user preference)

    // Cleanup function to cancel the timeout if searchTerm changes
    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchRecipes, onResults]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      return;
    }

    // Manual search (when pressing Enter or clicking search button)
    if (searchTerm.trim().length >= 3 && !isSearching) {
      const results = await searchRecipes(searchTerm);
      onResults(results);
    }
  };

  const handleReset = useCallback(() => {
    setSearchTerm('');
    onResults(null); // Signal clear to parent
  }, [onResults]);

  return (
    <form onSubmit={handleSearch} className='w-full flex items-center gap-2'>
      {/* Ensure the input can shrink on small screens */}
      <div className='flex-1 min-w-0'>
        <Input
          type='text'
          placeholder='Search recipe... (min 3 characters)'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isSearching || isLoading}
          className='w-full font-semibold min-w-0'
        />
      </div>

      <Button
        type='submit'
        variant='primary'
        disabled={isSearching || isLoading || searchTerm.trim().length < 3}
        className='shrink-0'
      >
        {isSearching ? <Spinner size='sm' /> : <FaSearch />}
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
