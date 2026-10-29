import { Compass, ShieldAlert } from 'lucide-react';
import { RouteDetailSection } from '@/features/route-dispatch/components/route-detail-section.tsx';
import {
    CardFooterBlock,
    InfoList,
    InfoRow,
    RoutePointCard,
} from '@/features/route-dispatch/components/route-point-card.tsx';
import type { RouteCriticPoint } from '@/features/route-dispatch/types/route-detail-res.ts';
import { displayText } from '@/features/route-dispatch/utils/route-detail.ts';

interface Props {
    points: RouteCriticPoint[] | null | undefined;
}

export const RouteCriticPointSection = ({ points }: Props) => {
    const rows = points ?? [];

    return (
        <RouteDetailSection
            title="Puntos críticos"
            icon={ShieldAlert}
            count={rows.length}
            emptyMessage="No hay puntos críticos vinculados a esta ruta."
        >
            {rows.map((point, index) => (
                <RoutePointCard
                    key={index}
                    icon={ShieldAlert}
                    tone="destructive"
                    eyebrow={`Punto crítico ${index + 1}`}
                    title={displayText(point.critictype)}
                    km={point.kiloonroute}
                >
                    <InfoList>
                        <InfoRow icon={Compass} label="Orientación">
                            {displayText(point.criticorient)}
                        </InfoRow>
                    </InfoList>
                    <CardFooterBlock label="Recomendaciones">
                        <p className="rounded-lg bg-destructive/5 p-3 text-sm leading-relaxed text-foreground">
                            {displayText(point.criticadvices)}
                        </p>
                    </CardFooterBlock>
                </RoutePointCard>
            ))}
        </RouteDetailSection>
    );
};
