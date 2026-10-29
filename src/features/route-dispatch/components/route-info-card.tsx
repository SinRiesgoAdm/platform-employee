import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card.tsx';
import type { RouteInfo } from '@/features/route-dispatch/types/route-detail-res.ts';
import { displayText } from '@/features/route-dispatch/utils/route-detail.ts';

interface Props {
    route: RouteInfo;
}

export const RouteInfoCard = ({ route }: Props) => {
    const items = [
        { label: 'Descripción de la ruta', value: route.routedescrip },
        { label: 'Es ruta usual', value: route.routeusual },
        { label: 'Ruta alterna', value: route.routeother },
        { label: 'Descripción del estado', value: route.routestatdesc },
    ];

    return (
        <Card className="mt-6 border-border/70 shadow-sm">
            <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
                <CardTitle className="font-display text-base font-semibold tracking-tight">
                    Datos de la ruta
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2">
                <dl className="grid sm:grid-cols-2 sm:gap-x-6">
                    {items.map((item) => (
                        <div
                            key={item.label}
                            className="border-b border-border/60 py-3 last:border-b-0"
                        >
                            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                                {item.label}
                            </dt>
                            <dd className="mt-1 text-sm font-medium text-foreground">
                                {displayText(item.value)}
                            </dd>
                        </div>
                    ))}
                </dl>
            </CardContent>
        </Card>
    );
};
