// Registra el service worker y muestra un toast persistente cuando hay
// una versión nueva lista. El usuario decide cuándo recargar.

import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { notify } from '@/shared/utils/notify.ts';

// Cada cuánto preguntar al servidor si hay un sw.js nuevo.
// El navegador ya lo revisa al navegar, pero una PWA puede quedar abierta
// días enteros en el celular sin navegar "de verdad".
const UPDATE_CHECK_INTERVAL_MS = 60 * 60 * 1000;

export const PwaUpdatePrompt = () => {
    const {
        needRefresh: [needRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(_swUrl, registration) {
            if (!registration) return;

            setInterval(() => {
                if (registration.installing || !navigator.onLine) return;
                void registration.update();
            }, UPDATE_CHECK_INTERVAL_MS);
        },
        onRegisterError(error) {
            console.error('[PWA] Error registrando el service worker', error);
        },
    });

    useEffect(() => {
        if (!needRefresh) return;

        notify.info(
            'Nueva versión disponible',
            'Guarda lo que estés haciendo y pulsa Actualizar.',
            {
                id: 'pwa-update',
                duration: Infinity,
                action: {
                    label: 'Actualizar',
                    // true = activa el SW nuevo y recarga la página
                    onClick: () => void updateServiceWorker(true),
                },
            },
        );
    }, [needRefresh, updateServiceWorker]);

    return null;
};
