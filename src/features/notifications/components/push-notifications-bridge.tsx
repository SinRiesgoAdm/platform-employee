// Se monta UNA vez en EmployeeApp (al lado de <Toaster />).
//
//  1. Al iniciar sesión (o abrir la app con sesión) sincroniza el token.
//  2. Escucha los mensajes que envía push-sw.js:
//     - PUSH_RECEIVED      → app en primer plano: muestra un toast
//     - NOTIFICATION_CLICK → el usuario tocó la notificación: navega
//
// Usa IndexRouter.navigate porque EmployeeApp está FUERA del
// <RouterProvider> y ahí no existe useNavigate().

import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/auth-store.tsx';
import { IndexRouter } from '@/app/routers/index-router.tsx';
import { notify } from '@/shared/utils/notify.ts';
import { pushClient } from '@/features/notifications/services/push-client.ts';

type PushPayload = {
    title?: string;
    body?: string;
    url?: string;
};

type SwMessage =
    | { type: 'PUSH_RECEIVED'; payload: PushPayload }
    | { type: 'NOTIFICATION_CLICK'; url: string };

export const PushNotificationsBridge = () => {
    const employeeUid = useAuthStore((state) => state.user?.uid ?? null);

    // 1) Sincronización silenciosa (solo si el permiso ya fue concedido)
    useEffect(() => {
        if (!employeeUid) return;

        void pushClient.sync(employeeUid).catch((error: unknown) => {
            console.error('[Push] Error sincronizando el token', error);
        });
    }, [employeeUid]);

    // 2) Mensajes del service worker
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;

        const onMessage = (event: MessageEvent<SwMessage>) => {
            const message = event.data;

            if (message?.type === 'PUSH_RECEIVED') {
                const { title, body, url } = message.payload;

                notify.info(title ?? 'Notificación', body, {
                    action: url
                        ? {
                              label: 'Ver',
                              onClick: () => void IndexRouter.navigate(url),
                          }
                        : undefined,
                });
            }

            if (message?.type === 'NOTIFICATION_CLICK') {
                void IndexRouter.navigate(message.url);
            }
        };

        navigator.serviceWorker.addEventListener('message', onMessage);
        return () => {
            navigator.serviceWorker.removeEventListener('message', onMessage);
        };
    }, []);

    return null;
};
