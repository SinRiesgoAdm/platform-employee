// Aviso "Instala la app" para quien abre la plataforma en el navegador.
// Se muestra una sola vez por visita, unos segundos después de entrar y
// solo con sesión iniciada. Si el usuario lo descarta, no vuelve a salir
// en DISMISS_DAYS (useInstallPrompt.ts). La tarjeta del perfil sigue
// disponible siempre.

import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/features/auth/store/auth-store.tsx';
import {
    rememberInstallDismissed,
    useInstallPrompt,
    wasInstallDismissedRecently,
} from '@/shared/hooks/useInstallPrompt.ts';
import { notify } from '@/shared/utils/notify.ts';
import { titleInstallApp } from '@/i18n/locales/es';

const SHOW_AFTER_MS = 20_000;
// Exportado: el aviso de notificaciones no sale mientras este siga abierto
export const INSTALL_TOAST_ID = 'pwa-install';

export const PwaInstallPrompt = () => {
    const isAuthenticated = useAuthStore(
        (state) => state.authStatus === 'authenticated',
    );
    const { status, justInstalled, promptInstall } = useInstallPrompt();
    const shown = useRef(false);

    useEffect(() => {
        if (!justInstalled) return;

        toast.dismiss(INSTALL_TOAST_ID);
        notify.success(
            'App instalada',
            'Ya puedes abrirla desde tu pantalla de inicio o escritorio.',
        );
    }, [justInstalled]);

    useEffect(() => {
        const canSuggest = status === 'available' || status === 'ios';
        if (!isAuthenticated || !canSuggest || shown.current) return;
        if (wasInstallDismissedRecently()) return;

        const timer = window.setTimeout(() => {
            shown.current = true;

            if (status === 'ios') {
                notify.info(
                    `Instala ${titleInstallApp}`,
                    'Toca Compartir y luego “Agregar a inicio” para usarla como app y sin conexión.',
                    {
                        id: INSTALL_TOAST_ID,
                        duration: 20_000,
                        cancel: {
                            label: 'Entendido',
                            onClick: rememberInstallDismissed,
                        },
                    },
                );
                return;
            }

            notify.info(
                `Instala ${titleInstallApp}`,
                'Ábrela como app, más rápido y sin conexión.',
                {
                    id: INSTALL_TOAST_ID,
                    duration: Infinity,
                    action: {
                        label: 'Instalar',
                        onClick: () => {
                            void promptInstall().then((outcome) => {
                                if (outcome === 'dismissed')
                                    rememberInstallDismissed();
                            });
                        },
                    },
                    cancel: {
                        label: 'Ahora no',
                        onClick: rememberInstallDismissed,
                    },
                },
            );
        }, SHOW_AFTER_MS);

        return () => window.clearTimeout(timer);
    }, [isAuthenticated, status, promptInstall]);

    return null;
};
