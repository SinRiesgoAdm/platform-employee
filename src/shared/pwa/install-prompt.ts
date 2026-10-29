// Chrome/Edge lanzan `beforeinstallprompt` UNA vez, muy temprano, a veces
// antes de que React monte. Por eso este módulo se importa en main.tsx
// (antes de render) y guarda el evento para usarlo cuando el usuario
// pulse "Instalar".
//
// Safari (iPhone/iPad) nunca lanza ese evento: allí solo se puede
// explicar el camino manual (Compartir → Agregar a inicio).

export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    prompt: () => Promise<void>;
}

export type InstallStatus =
    | 'installed' // abierta como app (ventana propia / pantalla de inicio)
    | 'available' // Chrome/Edge nos dio el evento: podemos mostrar el diálogo
    | 'ios' // Safari: solo instrucciones manuales
    | 'unavailable'; // navegador sin soporte, o Chrome aún no lo ofrece

export type InstallSnapshot = {
    status: InstallStatus;
    justInstalled: boolean;
};

const isStandalone = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: window-controls-overlay)').matches ||
    // Safari iOS no soporta display-mode en todas las versiones
    (navigator as Navigator & { standalone?: boolean }).standalone === true;

const isIos = () => {
    const ua = navigator.userAgent;
    // iPadOS se presenta como "Macintosh", pero tiene pantalla táctil
    return (
        /iphone|ipad|ipod/i.test(ua) ||
        (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)
    );
};

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let justInstalled = false;
let snapshot: InstallSnapshot = { status: 'unavailable', justInstalled: false };
const listeners = new Set<() => void>();

const computeStatus = (): InstallStatus => {
    if (isStandalone()) return 'installed';
    if (deferredPrompt) return 'available';
    if (isIos()) return 'ios';
    return 'unavailable';
};

// useSyncExternalStore exige devolver el MISMO objeto si nada cambió
const refresh = () => {
    const status = computeStatus();
    if (status === snapshot.status && justInstalled === snapshot.justInstalled)
        return;

    snapshot = { status, justInstalled };
    listeners.forEach((listener) => listener());
};

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (event) => {
        // Evita la mini barra automática de Chrome en Android: el aviso
        // lo mostramos nosotros, cuando conviene.
        event.preventDefault();
        deferredPrompt = event as BeforeInstallPromptEvent;
        refresh();
    });

    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        justInstalled = true;
        refresh();
    });

    // Si el usuario abre la app instalada desde esta misma pestaña
    window
        .matchMedia('(display-mode: standalone)')
        .addEventListener('change', refresh);

    snapshot = { status: computeStatus(), justInstalled: false };
}

export const installPromptStore = {
    subscribe: (listener: () => void) => {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    },
    getSnapshot: (): InstallSnapshot => snapshot,
};

/**
 * Abre el diálogo nativo de instalación. DEBE llamarse desde un click.
 * El evento solo sirve una vez: tras usarlo, Chrome lanzará otro si el
 * usuario lo rechazó y la app sigue siendo instalable.
 */
export const promptInstall = async (): Promise<
    'accepted' | 'dismissed' | 'unavailable'
> => {
    const event = deferredPrompt;
    if (!event) return 'unavailable';

    deferredPrompt = null;
    await event.prompt();
    const { outcome } = await event.userChoice;
    refresh();

    return outcome;
};
