// src/shared/api/client.ts
//
// Notas del interceptor:
//   [1] Bloquea POST/PUT/PATCH/DELETE si el navegador reporta "offline".
//   [2] Ignora las peticiones canceladas por [1] en el interceptor de error.
//   [3] Mensaje claro cuando no hay respuesta del servidor (wifi sin salida,
//       datos sin saldo, servidor caído): navigator.onLine no lo detecta.
//   [4] El 401 del login ya no muestra "Sesión Expirada".
//   [5] El registro del token de push no dispara el toast de éxito.

import axios, { AxiosError, CanceledError } from 'axios';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { notify } from '@/shared/utils/notify.ts';
import { API_ERROR_MESSAGES } from '@/shared/constants/error-message.ts';
import { pushClient } from '@/features/notifications/services/push-client.ts';

interface ApiErrorResponse {
    code: string;
    message: string;
}

const EXCLUDED_SUCCESS_ROUTES = [
    '/auth/login',
    '/auth/refresh',
    '/auth/logout',
    '/notifications/devices', // [5]
    '/notifications/test', // [5]
];

const MUTATION_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

const clientHttp = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

clientHttp.interceptors.request.use((config) => {
    const method = config.method?.toUpperCase() ?? 'GET';

    if (MUTATION_METHODS.includes(method) && !navigator.onLine) {
        const isLoginRequest = config.url?.includes('/auth/login');

        notify.error(
            'Sin conexión',
            isLoginRequest
                ? 'Necesitas internet para iniciar sesión.'
                : 'Necesitas internet para guardar los cambios.',
            { id: 'offline-mutation' },
        );
        return Promise.reject(new CanceledError('OFFLINE'));
    }

    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

clientHttp.interceptors.response.use(
    (response) => {
        const method = response.config.method?.toUpperCase();
        const url = response.config.url || '';

        const isExcluded = EXCLUDED_SUCCESS_ROUTES.some((route) =>
            url.includes(route),
        );

        if (!isExcluded && method && MUTATION_METHODS.includes(method)) {
            const successMessage =
                response.data?.message || 'Operación realizada con éxito';
            notify.success(successMessage);
        }

        return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        if (!error.response) {
            notify.error(
                'Sin conexión',
                'No se pudo conectar con el servidor. Verifica tu internet e inténtalo de nuevo.',
                { id: 'network-error' },
            );
            return Promise.reject(error);
        }

        const isLoginRequest = error.config?.url?.includes('/auth/login');

        if (error.response.status === 401 && !isLoginRequest) {
            // Ya no hay JWT para avisar al backend, pero sí se puede anular el
            // token en Firebase: este navegador deja de recibir las
            // notificaciones del empleado y el próximo envío de Rust recibe
            // UNREGISTERED y borra la fila.
            void pushClient
                .disable({ notifyBackend: false })
                .catch(() => undefined);

            useAuthStore.getState().logout();
            notify.error(
                'Sesión Expirada',
                'Por favor, inicie sesión nuevamente.',
            );
            return Promise.reject(error);
        }

        const apiError = error.response.data;
        const errorCode = apiError?.code;

        const descriptionToShow =
            (errorCode && API_ERROR_MESSAGES[errorCode]) ||
            apiError?.message ||
            'Ocurrió un error inesperado en la aplicación.';

        notify.error('Atención', descriptionToShow);

        return Promise.reject(error);
    },
);

export { clientHttp };
