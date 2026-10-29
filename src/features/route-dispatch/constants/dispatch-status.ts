import type { RouteDispatchStatus } from '@/features/route-dispatch/types/route-dispatch-res.ts';

interface DispatchStatusConfig {
    label: string;
    variant: 'secondary' | 'default' | 'outline' | 'destructive';
    hint: string;
}

export const DISPATCH_STATUS: Record<
    RouteDispatchStatus,
    DispatchStatusConfig
> = {
    Asignado: {
        label: 'Asignado',
        variant: 'secondary',
        hint: 'Falta confirmar la ruta.',
    },
    Recibido: {
        label: 'Recibido',
        variant: 'default',
        hint: 'Debes completar la ruta al terminar el recorrido.',
    },
    Completado: {
        label: 'Completado',
        variant: 'outline',
        hint: 'La ruta se completó.',
    },
    Cancelado: {
        label: 'Cancelado',
        variant: 'destructive',
        hint: 'Esta ruta fue cancelada. No debes realizar el recorrido.',
    },
};

export const UNKNOWN_DISPATCH_STATUS: DispatchStatusConfig = {
    label: 'Sin estado',
    variant: 'outline',
    hint: 'Estado del despacho no disponible.',
};

export const getDispatchStatusConfig = (
    status: RouteDispatchStatus | null,
): DispatchStatusConfig =>
    status ? DISPATCH_STATUS[status] : UNKNOWN_DISPATCH_STATUS;
