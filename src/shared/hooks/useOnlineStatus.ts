// Devuelve true/false según navigator.onLine y se actualiza solo con los
// eventos 'online' / 'offline' de la ventana.
//
// Por qué useSyncExternalStore y no useState + useEffect:
//   - Es la API de React para suscribirse a fuentes externas al árbol.
//   - Evita estados inconsistentes ("tearing") en renders concurrentes.
//
// Por qué no onlineManager de React Query: en v5 arranca asumiendo
// "online" y no lee navigator.onLine al inicio; si la app abre sin red,
// diría que hay conexión.
//
// LIMITACIÓN: navigator.onLine === true solo significa "hay una red", no
// "hay internet". El interceptor de Axios cubre ese caso.

import { useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => {
    window.addEventListener('online', onChange);
    window.addEventListener('offline', onChange);

    return () => {
        window.removeEventListener('online', onChange);
        window.removeEventListener('offline', onChange);
    };
};

const getSnapshot = () => navigator.onLine;

// En el servidor (SSR) no existe navigator; esta app no usa SSR, pero
// useSyncExternalStore lo pide para ser seguro.
const getServerSnapshot = () => true;

export const useOnlineStatus = () =>
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
