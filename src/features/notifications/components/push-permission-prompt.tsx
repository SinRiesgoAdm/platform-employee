// Aviso "Activa las notificaciones". Igual que el de instalación:
//
// - Solo con sesión iniciada y si el permiso nunca se ha pedido
//   ('default'). Si lo bloqueó no se puede volver a preguntar; si ya lo
//   aceptó no hace falta.
// - Sale 35 s después de entrar (15 s después del de instalación) y SOLO
//   si el de instalación ya no está en pantalla: dos avisos juntos se
//   cierran los dos. Si sigue abierto, se deja para la próxima visita.
// - "Ahora no" lo silencia DISMISS_DAYS días. La tarjeta del perfil sigue
//   disponible siempre.
//
// El permiso del navegador se pide recién al pulsar "Activar" (un clic
// del usuario), nunca al cargar la página.

import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/features/auth/store/auth-store.tsx';
import { usePushNotifications } from '@/features/notifications/hooks/usePushNotifications.ts';
import { INSTALL_TOAST_ID } from '@/shared/components/custom/pwa-install-prompt.tsx';
import { notify } from '@/shared/utils/notify.ts';

const SHOW_AFTER_MS = 35_000;
const TOAST_ID = 'push-permission';
const DISMISS_KEY = 'push-prompt-dismissed-at';
const DISMISS_DAYS = 14;

const wasDismissedRecently = () => {
    try {
        const raw = localStorage.getItem(DISMISS_KEY);
        if (!raw) return false;
        return Date.now() - Number(raw) < DISMISS_DAYS * 24 * 60 * 60 * 1000;
    } catch {
        return false;
    }
};

const rememberDismissed = () => {
    try {
        localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
        // storage bloqueado: el aviso volverá a salir en la próxima visita
    }
};

const isInstallToastOpen = () =>
    toast
        .getToasts()
        .some(
            (item) =>
                item.id === INSTALL_TOAST_ID &&
                !('dismiss' in item && item.dismiss),
        );

export const PushPermissionPrompt = () => {
    const isAuthenticated = useAuthStore(
        (state) => state.authStatus === 'authenticated',
    );
    const { status, enable } = usePushNotifications();
    const shown = useRef(false);

    useEffect(() => {
        if (!isAuthenticated || status !== 'default' || shown.current) return;
        if (wasDismissedRecently()) return;

        const timer = window.setTimeout(() => {
            shown.current = true;
            if (isInstallToastOpen()) return;

            notify.info(
                'Activa las notificaciones',
                'Entérate al momento de inspecciones, rutas y capacitaciones asignadas.',
                {
                    id: TOAST_ID,
                    duration: Infinity,
                    action: {
                        label: 'Activar',
                        onClick: () => void enable(),
                    },
                    cancel: {
                        label: 'Ahora no',
                        onClick: rememberDismissed,
                    },
                },
            );
        }, SHOW_AFTER_MS);

        return () => window.clearTimeout(timer);
    }, [isAuthenticated, status, enable]);

    return null;
};
