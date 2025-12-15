/**
 * Application Constants
 * Centralized location for magic numbers and configuration values
 */

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGINATION_BUTTONS = 3;

// API Configuration
export const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Firebase Collections
export const COLLECTIONS = {
    FAVORITES: 'favorites',
    USERS: 'users',
};

// Default Categories
export const DEFAULT_CATEGORY = 'Chicken';

// Notification Durations (ms)
export const NOTIFICATION_DURATION = {
    SHORT: 2000,
    MEDIUM: 3000,
    LONG: 5000,
};

// Modal Sizes
export const MODAL_SIZES = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl',
};

// Button Variants
export const BUTTON_VARIANTS = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DANGER: 'danger',
    GHOST: 'ghost',
};

// Button Sizes
export const BUTTON_SIZES = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
};

// Spinner Sizes
export const SPINNER_SIZES = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
};

// Notification Types
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};

// Focus Trap Selectors
export const FOCUSABLE_ELEMENTS_SELECTOR =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Timeouts
export const FOCUS_TIMEOUT = 100;

// Application Info
export const APP_NAME = 'Recipes App';

// Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
};

// Messages
export const MESSAGES = {
    AUTH_REQUIRED: 'You must be logged in to perform this action',
    ADDED_TO_FAVORITES: 'Added to favorites',
    REMOVED_FROM_FAVORITES: 'Removed from favorites',
    ERROR_LOADING: 'Error loading data',
};

// Limits
export const LIMITS = {
    MIN_PASSWORD_LENGTH: 6,
    MAX_RECIPE_NAME_LENGTH: 100,
};
