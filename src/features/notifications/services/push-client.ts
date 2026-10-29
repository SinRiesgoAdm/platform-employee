// Puerta de entrada ÚNICA a las notificaciones push.
//
// push-service.ts trae el SDK de Firebase (~52 KB). Para que no entre en la
// carga inicial de la app, SOLO este archivo lo importa, de forma diferida,
// la primera vez que se usa (después queda en memoria). El resto de la app
// importa `pushClient` como cualquier otro módulo.

import type {
    PushDiagnostics,
    PushStatus,
} from '@/features/notifications/services/push-service.ts';

export type { PushDiagnostics, PushStatus };

const loadPushService = () =>
    import('@/features/notifications/services/push-service.ts');

export const pushClient = {
    /** Estado actual (permiso + registro en el backend), sin preguntar nada. */
    getStatus: async (employeeUid: string | null): Promise<PushStatus> =>
        (await loadPushService()).getPushStatus(employeeUid),

    /** Pide el permiso y registra este navegador. Llamar desde un clic. */
    enable: async (employeeUid: string): Promise<PushStatus> =>
        (await loadPushService()).enablePush(employeeUid),

    /** Registra o actualiza el token solo si el permiso ya está concedido. */
    sync: async (employeeUid: string): Promise<PushStatus> =>
        (await loadPushService()).syncPushToken(employeeUid),

    /** Anula el token de este navegador (cierre de sesión). */
    disable: async (options: { notifyBackend: boolean }): Promise<void> =>
        (await loadPushService()).disablePush(options),

    /** Suscripción, token e installationId de este navegador (depuración). */
    getDiagnostics: async (): Promise<PushDiagnostics | null> =>
        (await loadPushService()).getPushDiagnostics(),
};
