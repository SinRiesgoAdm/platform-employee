//
// Estado del permiso + acción para activarlas desde la UI.

import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '@/features/auth/store/auth-store.tsx';
import { notify } from '@/shared/utils/notify.ts';
import {
    pushClient,
    type PushStatus,
} from '@/features/notifications/services/push-client.ts';
import { sendTestPushAction } from '@/features/notifications/actions/device-actions.ts';

export const usePushNotifications = () => {
    const employeeUid = useAuthStore((state) => state.user?.uid ?? null);
    const [status, setStatus] = useState<PushStatus | 'loading'>('loading');

    useEffect(() => {
        let cancelled = false;

        void pushClient
            .getStatus(employeeUid)
            .then((result) => {
                if (!cancelled) setStatus(result);
            })
            .catch(() => {
                if (!cancelled) setStatus('unsupported');
            });

        return () => {
            cancelled = true;
        };
    }, [employeeUid]);

    const enable = useCallback(async () => {
        if (!employeeUid) return;

        setStatus('loading');

        try {
            const result = await pushClient.enable(employeeUid);
            setStatus(result);

            if (result === 'denied') {
                notify.warning(
                    'Notificaciones bloqueadas',
                    'Actívalas desde la configuración del navegador para este sitio.',
                );
            }
        } catch (error) {
            console.error('[Push] No se pudieron activar', error);
            // Si el permiso quedó concedido pero el backend falló, NO están
            // activas: quedan pendientes y se pueden reintentar.
            setStatus(
                Notification.permission === 'granted' ? 'pending' : 'default',
            );
            notify.error(
                'Notificaciones',
                'No se pudieron activar. Inténtalo de nuevo.',
            );
        }
    }, [employeeUid]);

    const [isSendingTest, setIsSendingTest] = useState(false);

    const sendTest = useCallback(async () => {
        setIsSendingTest(true);
        try {
            await sendTestPushAction();
            notify.success(
                'Prueba enviada',
                'Si la app está en primer plano verás un aviso aquí; si no, una notificación del sistema.',
            );
        } catch {
            // El interceptor de clientHttp ya mostró el error
        } finally {
            setIsSendingTest(false);
        }
    }, []);

    return { status, enable, sendTest, isSendingTest };
};
