import { Button } from '../atoms/Button';
import { Spinner } from '../atoms/Spinner';
import { useEffect } from 'react';
import { DEFAULT_CATEGORY } from '../../constants';

/**
 * Category Selector Component
 * Accessible with keyboard navigation and ARIA attributes
 */
export const CategorySelect = ({
  categories,
  selectedCategory,
  onSelect,
  isLoading,
}) => {
  if (isLoading) {
    return <Spinner size='md' className='py-4' />;
  }

  // Auto-select default category
  useEffect(() => {
    if (
      !selectedCategory &&
      Array.isArray(categories) &&
      categories.length > 0
    ) {
      const hasDefaultCategory = categories.some(
        (c) => String(c.strCategory).toLowerCase() === DEFAULT_CATEGORY.toLowerCase()
      );

      if (hasDefaultCategory) {
        onSelect(DEFAULT_CATEGORY);
      }
    }
  }, [categories, selectedCategory, onSelect]);

  return (
    <div
      className='flex flex-wrap gap-3'
      role='group'
      aria-label='Recipe categories'
    >
      {categories.map((category, index) => (
        <Button
          key={category.idCategory}
          variant={
            selectedCategory === category.strCategory
              ? 'primary'
              : 'secondary'
          }
          size='sm'
          onClick={() => onSelect(category.strCategory)}
          aria-pressed={selectedCategory === category.strCategory}
          aria-label={`Filter by ${category.strCategory} category`}
        >
          {category.strCategory}
        </Button>
      ))}
    </div>
  );
};
