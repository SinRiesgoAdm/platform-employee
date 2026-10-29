import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import {
    PWA_CACHE_API_DATA,
    PWA_CACHE_API_DISPATCH,
    PWA_CACHE_IMAGES,
} from './src/shared/constants/pwa-caches.ts';

// Ruta del API vista por el navegador. Debe coincidir con VITE_API_URL.
// El API se sirve en el MISMO origen que la app (proxy de Vite en local,
// reverse proxy en producción). Si estuviera en otro origen, Workbox
// ignoraría las RegExp de abajo: con URLs cross-origin solo acepta
// coincidencias desde el inicio de la URL.
const API_PREFIX = '/api-employee-rust/v1';

const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Construye una RegExp para uno o varios módulos del API.
// apiRoute('training', 'inspections') →
//   /\/api-employee-rust\/v1\/(?:training|inspections)(?:[/?]|$)/
//
// IMPORTANTE:
//  - Se construye AQUÍ (en Node, al compilar) y se escribe como literal
//    en sw.js. Por eso sí puede usar variables.
//  - Sin "^": Workbox evalúa la RegExp contra la URL completa
//    (https://dominio/api-...), no contra el pathname. Esto solo vale
//    para peticiones del mismo origen (ver API_PREFIX).
const apiRoute = (...modules: string[]) =>
    new RegExp(
        `${escapeRegExp(API_PREFIX)}/(?:${modules.join('|')})(?:[/?]|$)`,
    );

const ONE_HOUR = 60 * 60;
const ONE_DAY = 24 * ONE_HOUR;

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    // Reenvía /api-employee-rust/... al backend para que el navegador
    // (y el service worker) lo vean como mismo origen.
    const apiProxy = {
        [API_PREFIX]: {
            target: env.API_PROXY_TARGET ?? 'http://localhost:8081',
            changeOrigin: true,
        },
    };

    return {
        server: { proxy: apiProxy },
        preview: { proxy: apiProxy },
        plugins: [
            react(),
            tailwindcss(),
            VitePWA({
                // El usuario decide cuándo actualizar (toast "Actualizar").
                // Con 'autoUpdate' la app se recargaría sola en medio de un
                // formulario.
                registerType: 'prompt',

                // globPatterns (abajo) ya incluye todos los íconos de public/.
                // Sin esto el plugin los agrega por segunda vez al precache.
                includeManifestIcons: false,

                manifest: {
                    // Identidad FIJA de la app instalada. Sin `id`, el
                    // navegador usa start_url: si algún día cambia, cree que
                    // es otra app (ícono duplicado, el manifest no se
                    // actualiza en los celulares que ya la instalaron).
                    // NO cambiar nunca.
                    id: '/',
                    // Diálogo de instalación y título de la ventana de la app
                    name: 'sinriesgo empleados',
                    // Texto bajo el ícono (máx. ~12 caracteres o se recorta)
                    short_name: 'SR Empleados',
                    description:
                        'Inspecciones, preoperacionales, capacitaciones y programas preventivos.',
                    lang: 'es',
                    start_url: '/',
                    scope: '/',
                    display: 'standalone',
                    orientation: 'portrait',
                    background_color: '#ffffff',
                    theme_color: '#36485c',
                    icons: [
                        {
                            src: 'pwa-64x64.png',
                            sizes: '64x64',
                            type: 'image/png',
                        },
                        {
                            src: 'pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png',
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                        },
                        {
                            src: 'maskable-icon-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'maskable',
                        },
                    ],

                    // Accesos rápidos: mantener presionado el ícono (Android)
                    // o clic derecho en la barra de tareas (Windows).
                    // Solo módulos que TODOS los empleados tienen activos
                    // (isEnabled: true en useDashboardModules): el manifest
                    // es igual para todos y no conoce los permisos.
                    // Íconos de 96x96: Android ignora los más pequeños.
                    shortcuts: [
                        {
                            name: 'Plan de capacitación',
                            short_name: 'Capacitación',
                            description: 'Cursos y sesiones programadas',
                            url: '/trainnings',
                            icons: [
                                {
                                    src: 'shortcuts/trainings-96x96.png',
                                    sizes: '96x96',
                                    type: 'image/png',
                                },
                            ],
                        },
                        {
                            name: 'Cuestionarios',
                            short_name: 'Cuestionarios',
                            description: 'Morbimortalidad y más',
                            url: '/dashboard/batteries',
                            icons: [
                                {
                                    src: 'shortcuts/questionnaires-96x96.png',
                                    sizes: '96x96',
                                    type: 'image/png',
                                },
                            ],
                        },
                        {
                            name: 'Mis documentos',
                            short_name: 'Documentos',
                            description: 'Historial y certificados',
                            url: '/profile/documents',
                            icons: [
                                {
                                    src: 'shortcuts/documents-96x96.png',
                                    sizes: '96x96',
                                    type: 'image/png',
                                },
                            ],
                        },
                    ],
                },

                workbox: {
                    // Código de push (public/push-sw.js) dentro del MISMO SW
                    importScripts: ['push-sw.js'],

                    // ---------- PRECACHE (app shell) ----------
                    globPatterns: [
                        '**/*.{js,css,html,svg,png,jpg,jpeg,webp,woff2}',
                    ],
                    // Solo latin/latin-ext: el resto de alfabetos no se usa en
                    // español. Si algún día hace falta, se descarga bajo demanda.
                    globIgnores: [
                        '**/*cyrillic*.woff2',
                        '**/*vietnamese*.woff2',
                        '**/*symbols*.woff2',
                        '**/*greek*.woff2',
                    ],
                    maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
                    cleanupOutdatedCaches: true,

                    // El SW nuevo toma control de las pestañas abiertas en
                    // cuanto se activa (tras pulsar "Actualizar").
                    clientsClaim: true,

                    // ---------- NAVEGACIÓN (SPA) ----------
                    navigateFallback: 'index.html',
                    // Aquí SÍ va "^": el denylist se evalúa contra pathname+search
                    navigateFallbackDenylist: [
                        new RegExp(`^${escapeRegExp(API_PREFIX)}/`),
                    ],

                    // ---------- RUNTIME CACHING ----------
                    // Solo intercepta GET (method por defecto). El orden importa:
                    // gana la PRIMERA regla que coincida.
                    runtimeCaching: [
                        // 1) Nunca en caché: autenticación y documentos personales
                        {
                            urlPattern: apiRoute('auth', 'profile/documents'),
                            handler: 'NetworkOnly',
                        },

                        // 2) Despacho de rutas: cambia rápido → vida corta
                        {
                            urlPattern: apiRoute('dispatch'),
                            handler: 'NetworkFirst',
                            options: {
                                cacheName: PWA_CACHE_API_DISPATCH,
                                networkTimeoutSeconds: 5,
                                cacheableResponse: { statuses: [200] },
                                expiration: {
                                    maxEntries: 30,
                                    maxAgeSeconds: 2 * ONE_HOUR,
                                    purgeOnQuotaError: true,
                                },
                            },
                        },

                        // 3) Resto de datos de consulta del empleado
                        {
                            urlPattern: apiRoute(
                                'profile',
                                'training',
                                'inspections',
                                'preoperational',
                                'batteries',
                                'program-preventive',
                            ),
                            handler: 'NetworkFirst',
                            options: {
                                cacheName: PWA_CACHE_API_DATA,
                                networkTimeoutSeconds: 5,
                                // Solo 200: un 401/500 en caché rompería la app
                                cacheableResponse: { statuses: [200] },
                                expiration: {
                                    maxEntries: 150,
                                    maxAgeSeconds: ONE_DAY,
                                    purgeOnQuotaError: true,
                                },
                            },
                        },

                        // 4) Documentos privados (URLs firmadas de Spaces): la
                        //    firma cambia en cada carga, así que cachearlos solo
                        //    acumula copias de documentos personales. Va ANTES
                        //    de la regla de imágenes: gana la primera que coincide.
                        {
                            urlPattern: ({ url }) =>
                                url.searchParams.has('X-Amz-Signature'),
                            handler: 'NetworkOnly',
                        },

                        // 5) Imágenes (avatar, portadas)
                        {
                            // OJO: esta función se serializa con toString() dentro
                            // de sw.js. NO puede usar variables de este archivo.
                            urlPattern: ({ request }) =>
                                request.destination === 'image',
                            handler: 'CacheFirst',
                            options: {
                                cacheName: PWA_CACHE_IMAGES,
                                // 0 = respuesta "opaca" de otro dominio sin CORS
                                cacheableResponse: { statuses: [0, 200] },
                                expiration: {
                                    maxEntries: 80,
                                    maxAgeSeconds: 30 * ONE_DAY,
                                    purgeOnQuotaError: true,
                                },
                            },
                        },
                    ],
                },

                // En `npm run dev` el SW está apagado (evita cachés fantasma).
                // Para probarlo usa `npm run build && npm run preview`.
                devOptions: {
                    enabled: false,
                },
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(import.meta.dirname, './src'),
            },
        },
    };
});
