// Lógica de notificaciones push con Firebase Cloud Messaging.
//
// Este módulo trae el SDK de Firebase (~52 KB). Solo lo importa
// push-client.ts, con import() diferido, para que no entre en la carga
// inicial de la app. El resto de la app usa `pushClient`.

import { getApps, initializeApp } from 'firebase/app';
import {
    getMessaging,
    getToken,
    isSupported,
    type Messaging,
} from 'firebase/messaging';
import {
    registerDeviceAction,
    unregisterDeviceAction,
} from '@/features/notifications/actions/device-actions.ts';
import { getInstallationId } from '@/features/notifications/utils/installation-id.ts';

/**
 * Estado de las notificaciones en ESTE navegador para el empleado actual.
 *
 *  - 'unsupported': el navegador no puede recibir push (iPhone sin instalar
 *     la app, navegador sin soporte, o `npm run dev` sin service worker).
 *  - 'default':     el permiso nunca se pidió (o se cerró el diálogo sin
 *     elegir). Es el único estado en el que se puede pedir.
 *  - 'denied':      el usuario bloqueó las notificaciones. La app ya no
 *     puede volver a preguntar; solo él, desde el navegador.
 *  - 'pending':     hay permiso, pero el backend TODAVÍA NO tiene registrado
 *     este navegador para este empleado (el registro falló o no hubo red).
 *     No llegan notificaciones: se reintenta solo en la próxima apertura.
 *  - 'granted':     hay permiso Y el backend tiene este navegador registrado.
 *     Solo en este estado llegan las notificaciones.
 */
export type PushStatus =
    'unsupported' | 'default' | 'denied' | 'pending' | 'granted';

// ---------------------------------------------------------------------------
// Registro local de lo último que se envió al backend
// ---------------------------------------------------------------------------

/**
 * Lo último que este navegador registró CON ÉXITO en el backend
 * (POST /notifications/devices). Se guarda en localStorage con la clave
 * LAST_SENT_KEY, por ejemplo:
 *
 *   { "token": "dXk3…:APA91…", "employeeUid": "u-10", "sentAt": 1792545005141 }
 *
 * Se puede ver en DevTools → Application → Local Storage → push-last-sent.
 */
type LastSent = {
    /** Token de Firebase que se envió. */
    token: string;
    /** Empleado con el que quedó asociado en el backend. */
    employeeUid: string;
    /** Cuándo se envió (milisegundos desde 1970, Date.now()). */
    sentAt: number;
};

const LAST_SENT_KEY = 'push-last-sent';

/**
 * Cada cuánto se reenvía el token aunque no haya cambiado. Así el backend
 * actualiza `last_seen_at` y su limpieza (60 días sin actividad) solo borra
 * navegadores que de verdad ya nadie usa. También recrea la fila si el
 * backend la había borrado.
 */
const RESEND_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Lee de localStorage lo último que se registró con éxito en el backend.
 *
 * Devuelve `null` si:
 *  - nunca se registró nada en este navegador (o se cerró sesión);
 *  - localStorage está bloqueado (algunos modos privados);
 *  - el valor guardado está dañado y JSON.parse falla.
 *
 * En todos esos casos la consecuencia es segura: la app asume que el
 * backend no tiene este navegador y lo vuelve a registrar.
 *
 * Se usa para:
 *  1. `syncPushToken`: no repetir el POST si nada cambió (mismo token, mismo
 *     empleado y enviado hace menos de RESEND_AFTER_MS).
 *  2. `isRegisteredFor`: distinguir 'granted' de 'pending'.
 *  3. `disablePush`: saber si hay algo que borrar en el backend al cerrar
 *     sesión.
 */
const readLastSent = (): LastSent | null => {
    try {
        const raw = localStorage.getItem(LAST_SENT_KEY);
        return raw ? (JSON.parse(raw) as LastSent) : null;
    } catch {
        return null;
    }
};

/**
 * Guarda (o borra, con `null`) lo último registrado en el backend.
 *
 * IMPORTANTE: solo se llama DESPUÉS de que el backend respondió bien. Si el
 * POST falla, no se escribe nada: el navegador queda en 'pending' y la
 * próxima sincronización lo vuelve a intentar.
 */
const writeLastSent = (value: LastSent | null) => {
    try {
        if (value) localStorage.setItem(LAST_SENT_KEY, JSON.stringify(value));
        else localStorage.removeItem(LAST_SENT_KEY);
    } catch {
        // storage bloqueado: se reenviará en la próxima sincronización
    }
};

/** ¿El backend tiene este navegador registrado para ESTE empleado? */
const isRegisteredFor = (employeeUid: string | null) => {
    const last = readLastSent();
    return last !== null && last.employeeUid === employeeUid;
};

// ---------------------------------------------------------------------------
// Firebase
// ---------------------------------------------------------------------------

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const getMessagingInstance = async (): Promise<Messaging | null> => {
    // En `npm run dev` no hay service worker: getToken quedaría esperando
    if (!import.meta.env.PROD) return null;
    if (!(await isSupported())) return null;

    const app = getApps()[0] ?? initializeApp(firebaseConfig);
    return getMessaging(app);
};

// ---------------------------------------------------------------------------
// API pública (se usa a través de pushClient)
// ---------------------------------------------------------------------------

/**
 * Estado actual, sin preguntar nada al usuario ni llamar al backend.
 * Con permiso concedido devuelve 'granted' solo si el registro en el
 * backend se completó para este empleado; si no, 'pending'.
 */
export const getPushStatus = async (
    employeeUid: string | null,
): Promise<PushStatus> => {
    const messaging = await getMessagingInstance();
    if (!messaging) return 'unsupported';

    if (Notification.permission !== 'granted') return Notification.permission;
    return isRegisteredFor(employeeUid) ? 'granted' : 'pending';
};

/**
 * Obtiene el token de Firebase y lo envía al backend SOLO si cambió, si
 * cambió el empleado o si pasó RESEND_AFTER_MS. Nunca pide permiso.
 *
 * Devuelve 'granted' solo cuando el backend tiene el registro. Si el POST
 * falla, lanza el error (y no se guarda nada en localStorage).
 */
export const syncPushToken = async (
    employeeUid: string,
): Promise<PushStatus> => {
    const messaging = await getMessagingInstance();
    if (!messaging) return 'unsupported';
    if (Notification.permission !== 'granted') return Notification.permission;

    const serviceWorkerRegistration = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration,
    });

    const last = readLastSent();
    const isUpToDate =
        last?.token === token &&
        last.employeeUid === employeeUid &&
        Date.now() - last.sentAt < RESEND_AFTER_MS;

    if (isUpToDate) return 'granted';

    // Sin red no se intenta el POST (el interceptor lo bloquearía con un
    // toast). Si este navegador ya estaba registrado para este empleado,
    // sigue recibiendo con el token anterior; si no, queda pendiente.
    if (!navigator.onLine) {
        return isRegisteredFor(employeeUid) ? 'granted' : 'pending';
    }

    await registerDeviceAction({
        token,
        installationId: getInstallationId(),
        platform: 'web',
        userAgent: navigator.userAgent,
    });

    // Solo después de que el backend respondió bien
    writeLastSent({ token, employeeUid, sentAt: Date.now() });
    return 'granted';
};

export type PushDiagnostics = {
    permission: NotificationPermission;
    installationId: string;
    fcmToken: string | null;
    subscription: PushSubscriptionJSON | null;
};

/**
 * Muestra lo que Chrome y Firebase generaron en ESTE navegador.
 * No pide permiso ni llama al backend: solo lee.
 *
 *  - subscription: la suscripción Web Push nativa del navegador
 *    (endpoint del servicio push + llaves p256dh/auth para cifrar).
 *  - fcmToken: el "alias" que Firebase creó para esa suscripción. Es lo
 *    único que el backend necesita para enviar.
 */
export const getPushDiagnostics = async (): Promise<PushDiagnostics | null> => {
    const messaging = await getMessagingInstance();
    if (!messaging) return null;

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    const fcmToken =
        Notification.permission === 'granted'
            ? await getToken(messaging, {
                  vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
                  serviceWorkerRegistration: registration,
              })
            : null;

    return {
        permission: Notification.permission,
        installationId: getInstallationId(),
        fcmToken,
        subscription: subscription?.toJSON() ?? null,
    };
};

/**
 * Pide permiso y registra. DEBE llamarse desde un clic del usuario:
 * los navegadores bloquean requestPermission() sin interacción.
 * Si el permiso ya estaba concedido, el navegador no muestra nada y pasa
 * directo al registro (sirve como "Reintentar" en el estado 'pending').
 */
export const enablePush = async (employeeUid: string): Promise<PushStatus> => {
    const messaging = await getMessagingInstance();
    if (!messaging) return 'unsupported';

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return permission;

    return syncPushToken(employeeUid);
};

/**
 * Cierre de sesión: el backend deja de enviar a este navegador y se
 * invalida el token local (el próximo empleado obtendrá uno nuevo).
 */
export const disablePush = async ({
    notifyBackend,
}: {
    notifyBackend: boolean;
}): Promise<void> => {
    // Solo si este navegador llegó a registrar un token: si nunca activó
    // las notificaciones no hay nada que borrar en el backend.
    const wasRegistered = readLastSent() !== null;

    if (notifyBackend && navigator.onLine && wasRegistered) {
        await unregisterDeviceAction(getInstallationId()).catch(
            () => undefined,
        );
    }

    const messaging = await getMessagingInstance();
    if (messaging) {
        // Anula la suscripción push de ESTE navegador usando NUESTRO service
        // worker. Sin suscripción, FCM ya no puede entregar nada con el token
        // anterior: el próximo envío del backend recibe UNREGISTERED y borra
        // la fila. La próxima vez que se pida un token, Firebase detecta que
        // la suscripción cambió y genera uno nuevo.
        //
        // No se usa deleteToken() de Firebase: está deprecado y, si en esta
        // carga de la página no se llamó antes a getToken() (p. ej. la sesión
        // ya venció al abrir la app), intenta registrar su propio
        // /firebase-messaging-sw.js, que no existe; falla y el token NO se
        // anula.
        //
        // getRegistration() y no `ready`: `ready` nunca se resuelve si no hay
        // un service worker activo y el cierre de sesión quedaría colgado.
        const registration = await navigator.serviceWorker.getRegistration();
        const subscription = await registration?.pushManager.getSubscription();
        await subscription?.unsubscribe().catch(() => false);
    }

    writeLastSent(null);
};
