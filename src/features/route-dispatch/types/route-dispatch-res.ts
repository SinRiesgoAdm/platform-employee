export type RouteDispatchStatus =
    'Asignado' | 'Recibido' | 'Completado' | 'Cancelado';

/** Respuesta tal como llega del backend en `/dispatch/all`. */
export interface RouteDispatchApiResponse {
    id: number;
    route_id: number;
    dispatchdate: string;
    departdate: string;
    arrivaldate: string;
    successdate: string | null;
    plate: string;
    routestart: string;
    routearrival: string;
    dispatchstatus?: string | number | null;
}

/** Despacho ya normalizado para la UI. `null` = estado no reconocido. */
export interface RouteDispatchResponse extends Omit<
    RouteDispatchApiResponse,
    'dispatchstatus'
> {
    dispatchstatus: RouteDispatchStatus | null;
}
