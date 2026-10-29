// Pide al navegador que NO borre el almacenamiento de la app.
//
// Por defecto el almacenamiento es "best-effort": con poco espacio en el
// teléfono, el navegador puede borrar el precache del service worker,
// las cachés de datos (api-data-v1...) y la sesión. El usuario se queda
// sin offline sin saber por qué. Con persist() concedido, solo se borra
// si el usuario lo hace a mano (Ajustes → Borrar datos del sitio).
//
// Cómo responde cada navegador:
//   - Chrome/Edge: no muestra diálogo. Lo concede según el uso del sitio
//     (app instalada, notificaciones permitidas, visitas frecuentes).
//   - Firefox: muestra un diálogo de permiso al usuario.
//   - Safari: no muestra diálogo; lo concede a la app instalada en inicio.
//
// Por qué después del login y no al abrir la app:
//   - Antes del login no hay datos del empleado que proteger.
//   - En Firefox el diálogo tiene contexto ("acabo de entrar a mi app").
//
// Se llama también al abrir la app con la sesión ya guardada: si la
// primera vez Chrome dijo que no, puede decir que sí cuando la app ya
// está instalada o tiene notificaciones activas.

let requested = false;

export const requestPersistentStorage = async (): Promise<void> => {
    // Una vez por carga de la app basta
    if (requested) return;
    requested = true;

    if (!navigator.storage?.persist) return;

    try {
        // Ya concedido: no volver a pedir (en Firefox evita el diálogo)
        if (await navigator.storage.persisted()) return;

        const granted = await navigator.storage.persist();

        if (!granted) {
            console.info(
                '[PWA] Almacenamiento persistente no concedido: el navegador podría borrar la caché offline con poco espacio.',
            );
        }
    } catch (error) {
        console.error('[PWA] Error pidiendo almacenamiento persistente', error);
    }
};
