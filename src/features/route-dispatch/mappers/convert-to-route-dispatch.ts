import type {
    RouteDispatchApiResponse,
    RouteDispatchResponse,
    RouteDispatchStatus,
} from '@/features/route-dispatch/types/route-dispatch-res.ts';

const STATUS_BY_VALUE: Record<string, RouteDispatchStatus> = {
    '1': 'Asignado',
    asignado: 'Asignado',
    '2': 'Recibido',
    recibido: 'Recibido',
    '3': 'Completado',
    completado: 'Completado',
    terminado: 'Completado',
    terminate: 'Completado',
    cancelado: 'Cancelado',
    cancelada: 'Cancelado',
    canceled: 'Cancelado',
    cancelled: 'Cancelado',
};

const normalizeStatus = (
    value: RouteDispatchApiResponse['dispatchstatus'],
): RouteDispatchStatus | null => {
    if (value === null || value === undefined) return null;

    return STATUS_BY_VALUE[String(value).trim().toLowerCase()] ?? null;
};

export const convertToRouteDispatch = (
    dispatch: RouteDispatchApiResponse,
): RouteDispatchResponse => ({
    ...dispatch,
    dispatchstatus: normalizeStatus(dispatch.dispatchstatus),
});
