import { ApiError } from './httpClient';

/**
 * Format API errors for user display
 */
export const formatApiError = (error) => {
    if (error instanceof ApiError) {
        switch (error.status) {
            case 0:
                return 'Error de conexión. Verifica tu internet.';
            case 404:
                return 'No se encontraron resultados.';
            case 500:
                return 'Error del servidor. Intenta más tarde.';
            default:
                return 'Error al cargar datos. Intenta de nuevo.';
        }
    }

    return error.message || 'Error desconocido';
};

/**
 * Format Firebase error codes
 */
export const formatFirebaseError = (code) => {
    const errors = {
        'auth/email-already-in-use': 'El email ya está registrado',
        'auth/invalid-credential': 'Email o contraseña incorrectos',
        'auth/weak-password': 'La contraseña es muy débil',
        'auth/invalid-email': 'El email no es válido',
        'auth/operation-not-allowed': 'Operación no permitida',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
    };

    return errors[code] || 'Error desconocido. Intenta de nuevo';
};

/**
 * Format Firestore errors
 */
export const formatFirestoreError = (error) => {
    const code = error?.code;

    const errors = {
        'permission-denied': 'No tienes permisos para realizar esta acción',
        'not-found': 'Documento no encontrado',
        'already-exists': 'El documento ya existe',
        'failed-precondition': 'Operación no permitida en el estado actual',
        'unavailable': 'Servicio no disponible. Intenta más tarde',
    };

    return errors[code] || 'Error en la base de datos';
};

/**
 * Generic error formatter
 * Routes to the appropriate formatter based on error type
 */
export const formatError = (error) => {
    // API errors
    if (error instanceof ApiError) {
        return formatApiError(error);
    }

    // Firebase auth errors
    if (error?.code?.startsWith('auth/')) {
        return formatFirebaseError(error.code);
    }

    // Firestore errors
    if (error?.code && ['permission-denied', 'not-found', 'already-exists', 'failed-precondition', 'unavailable'].includes(error.code)) {
        return formatFirestoreError(error);
    }

    // Generic error
    return error?.message || 'Error desconocido';
};
