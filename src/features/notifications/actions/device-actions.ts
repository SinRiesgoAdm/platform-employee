// Llamadas al backend de notificaciones. Body en camelCase, como el
// resto del proyecto. Las rutas son relativas a VITE_API_URL.

import { clientHttp } from '@/shared/api/client.ts';

export type RegisterDeviceRequest = {
    token: string;
    installationId: string;
    platform: 'web';
    userAgent: string;
};

// POST /notifications/devices → upsert por installationId (204)
export const registerDeviceAction = async (
    body: RegisterDeviceRequest,
): Promise<void> => {
    await clientHttp.post('/notifications/devices', body);
};

// DELETE /notifications/devices/{installationId} → al cerrar sesión (204)
export const unregisterDeviceAction = async (
    installationId: string,
): Promise<void> => {
    await clientHttp.delete(`/notifications/devices/${installationId}`);
};

// POST /notifications/test → el backend te envía una notificación (204)
export const sendTestPushAction = async (): Promise<void> => {
    await clientHttp.post('/notifications/test');
};
