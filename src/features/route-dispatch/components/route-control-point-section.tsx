import { CircleDot, MapPin, Navigation, Tag } from 'lucide-react';
import { RouteDetailSection } from '@/features/route-dispatch/components/route-detail-section.tsx';
import {
    CardFooterBlock,
    ChipList,
    InfoList,
    InfoRow,
    RoutePointCard,
} from '@/features/route-dispatch/components/route-point-card.tsx';
import type { RouteControlPoint } from '@/features/route-dispatch/types/route-detail-res.ts';
import {
    displayText,
    splitList,
} from '@/features/route-dispatch/utils/route-detail.ts';

interface Props {
    points: RouteControlPoint[] | null | undefined;
}

export const RouteControlPointSection = ({ points }: Props) => {
    const rows = points ?? [];

    return (
        <RouteDetailSection
            title="Puntos de control"
            icon={CircleDot}
            count={rows.length}
            emptyMessage="No hay puntos de control vinculados a esta ruta."
        >
            {rows.map((point, index) => (
                <RoutePointCard
                    key={index}
                    icon={CircleDot}
                    eyebrow={`Punto de control ${index + 1}`}
                    title={displayText(point.controlname)}
                    km={point.kiloonroute}
                >
                    <InfoList>
                        <InfoRow icon={Tag} label="Tipo">
                            {displayText(point.pointtype)}
                        </InfoRow>
                        <InfoRow icon={MapPin} label="Municipio">
                            {displayText(point.controltown)}
                        </InfoRow>
                        <InfoRow
                            icon={Navigation}
                            label="Dirección"
                            className="sm:col-span-2"
                        >
                            {displayText(point.controladdress)}
                        </InfoRow>
                    </InfoList>
                    <CardFooterBlock label="Servicios disponibles">
                        <ChipList
                            items={splitList(point.controlservices)}
                            emptyText="Sin servicios registrados"
                        />
                    </CardFooterBlock>
                </RoutePointCard>
            ))}
        </RouteDetailSection>
    );
};
