import { MapPin, Navigation, Receipt } from 'lucide-react';
import { RouteDetailSection } from '@/features/route-dispatch/components/route-detail-section.tsx';
import {
    CardFooterBlock,
    ChipList,
    InfoList,
    InfoRow,
    RoutePointCard,
} from '@/features/route-dispatch/components/route-point-card.tsx';
import type { RouteToll } from '@/features/route-dispatch/types/route-detail-res.ts';
import {
    displayText,
    splitList,
} from '@/features/route-dispatch/utils/route-detail.ts';

interface Props {
    tolls: RouteToll[] | null | undefined;
}

export const RouteTollSection = ({ tolls }: Props) => {
    const rows = tolls ?? [];

    return (
        <RouteDetailSection
            title="Peajes"
            icon={Receipt}
            count={rows.length}
            emptyMessage="No hay peajes vinculados a esta ruta."
        >
            {rows.map((toll, index) => (
                <RoutePointCard
                    key={index}
                    icon={Receipt}
                    eyebrow={`Peaje ${index + 1}`}
                    title={displayText(toll.tollname)}
                    km={toll.kiloonroute}
                >
                    <InfoList>
                        <InfoRow icon={MapPin} label="Municipio">
                            {displayText(toll.tolltown)}
                        </InfoRow>
                        <InfoRow icon={Navigation} label="Dirección">
                            {displayText(toll.tolladdress)}
                        </InfoRow>
                    </InfoList>
                    <CardFooterBlock label="Servicios disponibles">
                        <ChipList
                            items={splitList(toll.tollservices)}
                            emptyText="Sin servicios registrados"
                        />
                    </CardFooterBlock>
                </RoutePointCard>
            ))}
        </RouteDetailSection>
    );
};
