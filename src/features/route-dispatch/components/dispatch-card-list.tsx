import type { ReactNode } from 'react';
import { CalendarClock, Clock, Flag, Route } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card.tsx';
import { Separator } from '@/shared/components/ui/separator.tsx';
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

interface DetailRowProps {
    icon?: ReactNode;
    label: string;
    value: string;
    highlight?: boolean;
}

const DetailRow = ({ icon, label, value, highlight }: DetailRowProps) => (
    <div className="flex items-start justify-between gap-3">
        <dt className="flex items-center gap-1.5 text-muted-foreground">
            {icon}
            {label}
        </dt>
        <dd
            className={cn(
                'text-right font-medium text-foreground',
                highlight && ARRIVAL_CONFIRMED_CLASS,
            )}
        >
            {value}
        </dd>
    </div>
);

export const DispatchCardList = ({
    dispatches,
    onConfirm,
    onTerminate,
}: Props) => {
    return (
        <div className="mt-4 grid gap-3 lg:hidden">
            {dispatches.map((d) => {
                return (
                    <Card
                        key={d.id}
                        className={cn(
                            'border-border/70 shadow-sm',
                            d.dispatchstatus === 'Cancelado' &&
                                'border-destructive/40 bg-destructive/5',
                        )}
                    >
                        <CardHeader className="p-4 pb-2">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <CardTitle className="font-display text-base font-semibold tracking-tight">
                                        {getRouteName(d)}
                                    </CardTitle>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Vehículo {d.plate}
                                    </p>
                                </div>
                                <DispatchStatusBadge
                                    status={d.dispatchstatus}
                                    className="shrink-0"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-3 p-4 pt-2">
                            <dl className="grid gap-2 text-xs">
                                <DetailRow
                                    icon={
                                        <CalendarClock className="h-3.5 w-3.5" />
                                    }
                                    label="Fecha despacho"
                                    value={formatDateTime(d.dispatchdate)}
                                />
                                <DetailRow
                                    icon={<Route className="h-3.5 w-3.5" />}
                                    label="Fecha de salida"
                                    value={formatDateTime(d.departdate)}
                                />
                                <DetailRow
                                    icon={<Clock className="h-3.5 w-3.5" />}
                                    label="Llegada estimada"
                                    value={formatDateTime(d.arrivaldate)}
                                />
                                <DetailRow
                                    icon={<Flag className="h-3.5 w-3.5" />}
                                    label="Confirmación de llegada"
                                    value={formatDateTime(d.successdate)}
                                    highlight={isArrivalConfirmed(d)}
                                />
                            </dl>
                            <Separator />
                            <DispatchActions
                                routeId={d.route_id}
                                status={d.dispatchstatus}
                                onConfirm={() => onConfirm(d)}
                                onTerminate={() => onTerminate(d)}
                            />
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};
