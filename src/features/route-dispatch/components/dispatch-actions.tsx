import { Ban, CheckCircle2, Flag, MapPinned } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/shared/components/ui/button.tsx';
import { getDispatchStatusConfig } from '@/features/route-dispatch/constants/dispatch-status.ts';
import type { RouteDispatchStatus } from '@/features/route-dispatch/types/route-dispatch-res.ts';

interface Props {
    routeId: number;
    status: RouteDispatchStatus | null;
    onConfirm: () => void;
    onTerminate: () => void;
}

export const DispatchActions = ({
    routeId,
    status,
    onConfirm,
    onTerminate,
}: Props) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-2 lg:justify-end">
            {status === 'Cancelado' ? (
                <p
                    role="status"
                    className="flex items-center gap-1.5 text-xs font-medium text-destructive"
                >
                    <Ban className="h-3.5 w-3.5 shrink-0" />
                    {getDispatchStatusConfig(status).hint}
                </p>
            ) : (
                <p className="text-xs text-muted-foreground">
                    {getDispatchStatusConfig(status).hint}
                </p>
            )}
            <Button
                size="sm"
                variant="outline"
                nativeButton={false}
                render={<Link to={`/route-dispatch/${routeId}`} />}
            >
                <MapPinned className="h-3.5 w-3.5" />
                Detalle de la ruta
            </Button>
            {status === 'Asignado' ? (
                <Button size="sm" onClick={onConfirm}>
                    <Flag className="h-3.5 w-3.5" />
                    Confirmar despacho
                </Button>
            ) : null}
            {status === 'Recibido' ? (
                <Button size="sm" onClick={onTerminate}>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Completar despacho
                </Button>
            ) : null}
        </div>
    );
};
