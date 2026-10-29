// Nombres de las cachés de runtime del service worker.
// Se usan en dos lugares que DEBEN coincidir:
//   1. vite.config.ts (o workbox-config.cjs) → donde se crean
//   2. auth-store.tsx → logout() las borra
//
// El sufijo -v1 permite "invalidar" una caché completa en el futuro:
// cambias a -v2 y la vieja deja de usarse (y se limpia por expiración).

export const PWA_CACHE_API_DATA = 'api-data-v1';
export const PWA_CACHE_API_DISPATCH = 'api-dispatch-v1';
export const PWA_CACHE_IMAGES = 'images-v1';

export const PWA_PRIVATE_CACHES = [
    PWA_CACHE_API_DATA,
    PWA_CACHE_API_DISPATCH,
    PWA_CACHE_IMAGES,
] as const;
