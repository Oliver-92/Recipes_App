import { useState, useEffect, useMemo } from 'react';
import { DEFAULT_PAGE_SIZE } from '../constants';

/**
 * Custom hook to manage pagination
 * Automatically resets to page 1 when data changes
 * Returns paginated data slice and page controls
 */
export const usePagination = (data, dependencies = []) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Reset page when data or dependencies change
    useEffect(() => {
        setCurrentPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.length, ...dependencies]);

    // Calculate paginated data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * DEFAULT_PAGE_SIZE;
        const endIndex = currentPage * DEFAULT_PAGE_SIZE;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage]);

    return {
        currentPage,
        setCurrentPage,
        paginatedData,
        totalItems: data.length,
        pageSize: DEFAULT_PAGE_SIZE,
    };
};
