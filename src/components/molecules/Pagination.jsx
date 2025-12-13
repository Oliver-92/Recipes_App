import { Button } from '../atoms/Button';

/**
 * Simple Pagination component
 */
export const Pagination = ({
  totalItems,
  pageSize = 12,
  currentPage = 1,
  onPageChange,
  maxButtons = 5,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalPages <= 1) return null;

  const buildPageRange = () => {
    const pages = [];
    const half = Math.floor(maxButtons / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pages = buildPageRange();

  return (
    <div className='flex items-center justify-center gap-2 mt-6'>
      <Button
        size='sm'
        variant='secondary'
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      >
        Prev
      </Button>

      {pages[0] > 1 && (
        <>
          <Button size='sm' variant='secondary' onClick={() => onPageChange(1)}>
            1
          </Button>
          {pages[0] > 2 && <span className='text-white px-2'>...</span>}
        </>
      )}

      {pages.map((p) => (
        <Button
          key={p}
          size='sm'
          variant={p === currentPage ? 'primary' : 'secondary'}
          onClick={() => onPageChange(p)}
        >
          {p}
        </Button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className='text-white px-2'>...</span>
          )}
          <Button
            size='sm'
            variant='secondary'
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        size='sm'
        variant='secondary'
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
