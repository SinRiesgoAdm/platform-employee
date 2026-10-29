// Cierre de sesión MANUAL con limpieza de push.
//
// Orden importante:
//   1. DELETE al backend MIENTRAS el token de sesión aún existe
//   2. deleteToken() de Firebase
//   3. authStore.logout() → limpia sesión + cachés
//
// El logout automático por 401 NO puede avisar al backend (ya no hay
// sesión válida): por eso el backend hace upsert por installationId y el
// siguiente empleado que inicie sesión en ese celular "se queda" la fila.

import { useAuthStore } from '@/features/auth/store/auth-store.tsx';
import { pushClient } from '@/features/notifications/services/push-client.ts';

export const logoutWithPushCleanup = async () => {
    try {
        await pushClient.disable({ notifyBackend: true });
    } finally {
        useAuthStore.getState().logout();
    }
};
