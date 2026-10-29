import { onlineManager, QueryClient } from '@tanstack/react-query';

// TanStack Query v5 asume "con red" al arrancar y solo escucha los eventos
// online/offline. Si la app se abre YA sin red, ese evento nunca llega y
// las consultas se reintentan como si hubiera conexión. Se lo decimos.
onlineManager.setOnline(navigator.onLine);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: 'offlineFirst',
        },
        mutations: {
            networkMode: 'always',
        },
    },
});
