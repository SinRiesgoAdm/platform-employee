//
// Se carga DENTRO del service worker generado por Workbox mediante la
// opción importScripts: ['push-sw.js']. Así hay UN solo service worker
// para caché + push (un origen solo puede tener un SW por scope).
//
// No usa el SDK de Firebase: FCM entrega mensajes Web Push estándar, y
// manejarlos aquí da control total y evita notificaciones duplicadas.
//
// Contrato con el backend (mensajes "data-only" vía webpush.data):
//   { title: string, body: string, url?: string, tag?: string }
//   (en FCM todos los valores de data deben ser string)

const DEFAULT_TITLE = 'HSEQ Empleado';
const ICON = '/pwa-192x192.png';
const BADGE = '/pwa-64x64.png';

const parsePayload = (event) => {
    if (!event.data) return null;

    try {
        const raw = event.data.json();
        // FCM envía { data: {...}, notification?: {...}, from, fcmMessageId }
        // Producción usa "data"; "notification" cubre los mensajes de
        // prueba enviados desde la consola de Firebase.
        return { ...(raw.notification ?? {}), ...(raw.data ?? {}) };
    } catch {
        return { body: event.data.text() };
    }
};

const getWindowClients = () =>
    self.clients.matchAll({ type: 'window', includeUncontrolled: true });

self.addEventListener('push', (event) => {
    const data = parsePayload(event);
    if (!data) return;

    event.waitUntil(
        (async () => {
            const windows = await getWindowClients();
            const focused = windows.find((client) => client.focused);

            // App abierta y en primer plano: la app muestra un toast
            // (Chrome no exige notificación del sistema si hay una
            // pestaña visible del sitio).
            if (focused) {
                focused.postMessage({ type: 'PUSH_RECEIVED', payload: data });
                return;
            }

            await self.registration.showNotification(
                data.title || DEFAULT_TITLE,
                {
                    body: data.body || '',
                    icon: ICON,
                    badge: BADGE,
                    // Mismo tag = reemplaza la notificación anterior del mismo tipo
                    tag: data.tag || undefined,
                    data: { url: data.url || '/' },
                },
            );
        })(),
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const target = new URL(
        event.notification.data?.url || '/',
        self.location.origin,
    );

    event.waitUntil(
        (async () => {
            const windows = await getWindowClients();
            const existing = windows.find(
                (client) => new URL(client.url).origin === self.location.origin,
            );

            // Ya hay una ventana de la app: la enfocamos y React Router
            // navega (sin recargar la app)
            if (existing) {
                await existing.focus();
                existing.postMessage({
                    type: 'NOTIFICATION_CLICK',
                    url: target.pathname + target.search,
                });
                return;
            }

            await self.clients.openWindow(target.href);
        })(),
    );
});
