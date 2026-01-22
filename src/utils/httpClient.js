/**
 * Custom API Error class
 */
export class ApiError extends Error {
    constructor(status, message, data = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

/**
 * Centralized HTTP Client
 * Handles all HTTP requests with consistent error handling
 */
export const httpClient = {
    /**
     * GET request
     */
    get: async (url) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorText = await response.text();
                throw new ApiError(
                    response.status,
                    `HTTP ${response.status}: ${response.statusText}`,
                    errorText
                );
            }

            return await response.json();
        } catch (error) {
            // If it's already an ApiError, re-throw it
            if (error instanceof ApiError) {
                throw error;
            }

            // Network or parsing errors
            throw new ApiError(
                0,
                error.message || 'Network error',
                error
            );
        }
    },

    /**
     * POST request
     */
    post: async (url, body) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new ApiError(
                    response.status,
                    `HTTP ${response.status}: ${response.statusText}`,
                    errorText
                );
            }

            return await response.json();
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError(
                0,
                error.message || 'Network error',
                error
            );
        }
    },
};
