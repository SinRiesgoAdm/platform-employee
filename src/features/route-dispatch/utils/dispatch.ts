import type { RouteDispatchResponse } from '@/features/route-dispatch/types/route-dispatch-res.ts';

const dateTimeFormatter = new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
});

export const formatDateTime = (value: string | null): string => {
    if (!value) return '—';

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '—' : dateTimeFormatter.format(date);
};

/** La ruta se completó y el empleado registró su fecha de llegada. */
export const isArrivalConfirmed = (dispatch: RouteDispatchResponse): boolean =>
    dispatch.dispatchstatus === 'Completado' && !!dispatch.successdate;

export const ARRIVAL_CONFIRMED_CLASS =
    'rounded-md bg-emerald-500/10 px-1.5 py-0.5 font-medium text-emerald-600 dark:text-emerald-400';

export const getRouteName = (dispatch: RouteDispatchResponse): string =>
    `${dispatch.routestart.trim()} → ${dispatch.routearrival.trim()}`;

/** Fecha actual en formato `YYYY-MM-DDTHH:mm` para inputs datetime-local. */
export const nowLocalInput = (): string => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 16);
};

/** Convierte el valor de un input datetime-local al formato del backend. */
export const toApiDateTime = (localValue: string): string =>
    localValue.length === 16 ? `${localValue}:00` : localValue;
