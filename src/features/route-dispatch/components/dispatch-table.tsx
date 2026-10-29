import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table.tsx';
import { cn } from '@/shared/utils/cn';
import { DispatchActions } from '@/features/route-dispatch/components/dispatch-actions.tsx';
import { DispatchStatusBadge } from '@/features/route-dispatch/components/dispatch-status-badge.tsx';
import type { RouteDispatchResponse } from '@/features/route-dispatch/types/route-dispatch-res.ts';
import {
    ARRIVAL_CONFIRMED_CLASS,
    formatDateTime,
    getRouteName,
    isArrivalConfirmed,
} from '@/features/route-dispatch/utils/dispatch.ts';

interface Props {
    dispatches: RouteDispatchResponse[];
    onConfirm: (dispatch: RouteDispatchResponse) => void;
    onTerminate: (dispatch: RouteDispatchResponse) => void;
}

export const DispatchTable = ({
    dispatches,
    onConfirm,
    onTerminate,
}: Props) => {
    return (
        <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border/70 bg-card lg:block">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fecha despacho</TableHead>
                        <TableHead>Fecha de salida</TableHead>
                        <TableHead>Llegada estimada</TableHead>
                        <TableHead>Confirmación de llegada</TableHead>
                        <TableHead>Ruta asignada</TableHead>
                        <TableHead>Vehículo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dispatches.map((d) => {
                        return (
                            <TableRow
                                key={d.id}
                                className={cn(
                                    d.dispatchstatus === 'Cancelado' &&
                                        'bg-destructive/5 hover:bg-destructive/10',
                                )}
                            >
                                <TableCell className="whitespace-nowrap text-muted-foreground">
                                    {formatDateTime(d.dispatchdate)}
                                </TableCell>
                                <TableCell className="whitespace-nowrap text-muted-foreground">
                                    {formatDateTime(d.departdate)}
                                </TableCell>
                                <TableCell className="whitespace-nowrap text-muted-foreground">
                                    {formatDateTime(d.arrivaldate)}
                                </TableCell>
                                <TableCell className="whitespace-nowrap text-muted-foreground">
                                    <span
                                        className={cn(
                                            isArrivalConfirmed(d) &&
                                                ARRIVAL_CONFIRMED_CLASS,
                                        )}
                                    >
                                        {formatDateTime(d.successdate)}
                                    </span>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {getRouteName(d)}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {d.plate}
                                </TableCell>
                                <TableCell>
                                    <DispatchStatusBadge
                                        status={d.dispatchstatus}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-end">
                                        <DispatchActions
                                            routeId={d.route_id}
                                            status={d.dispatchstatus}
                                            onConfirm={() => onConfirm(d)}
                                            onTerminate={() => onTerminate(d)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
