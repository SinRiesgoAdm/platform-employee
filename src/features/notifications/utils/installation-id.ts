//
// En la web NO existe un "device-id" (por privacidad el navegador no lo
// expone). Lo que sí podemos tener:
//
//   - installationId: UUID que generamos nosotros y guardamos en este
//     navegador. Identifica "esta instalación de la app" y es estable.
//   - token FCM: lo genera Firebase; puede ROTAR con el tiempo.
//
// El backend usa installationId como clave (upsert): si el token cambia
// o inicia sesión otro empleado en el mismo celular, se ACTUALIZA la
// fila en vez de acumular tokens viejos.

const STORAGE_KEY = 'push-installation-id';

export const getInstallationId = (): string => {
    try {
        const existing = localStorage.getItem(STORAGE_KEY);
        if (existing) return existing;

        const created = crypto.randomUUID();
        localStorage.setItem(STORAGE_KEY, created);
        return created;
    } catch {
        // Modo privado o storage bloqueado: id efímero para esta sesión
        return crypto.randomUUID();
    }
};
