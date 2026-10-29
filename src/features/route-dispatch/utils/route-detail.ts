/** Limpia espacios y saltos de línea sobrantes; `—` si no hay valor. */
export const displayText = (value: string | null | undefined): string =>
    value?.trim() || '—';

export const displayKm = (value: string | number | null | undefined) => {
    const text = displayText(
        value === null || value === undefined ? null : String(value),
    );
    return text === '—' ? text : `Km ${text}`;
};

/** El backend puede enviar rutas internas (p. ej. `/tmp/...`) que no son imágenes accesibles. */
export const isPublicUrl = (
    value: string | null | undefined,
): value is string => !!value && /^https?:\/\//i.test(value.trim());

/** Convierte un listado separado por comas (p. ej. servicios) en elementos limpios. */
export const splitList = (value: string | null | undefined): string[] =>
    (value ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
