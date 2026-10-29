import { LifeBuoy, MapPin, Navigation, Phone } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.tsx';
import { RouteDetailSection } from '@/features/route-dispatch/components/route-detail-section.tsx';
import {
    InfoList,
    InfoRow,
    RoutePointCard,
} from '@/features/route-dispatch/components/route-point-card.tsx';
import type { RouteAssistPoint } from '@/features/route-dispatch/types/route-detail-res.ts';
import { displayText } from '@/features/route-dispatch/utils/route-detail.ts';

interface Props {
    points: RouteAssistPoint[] | null | undefined;
}

export const RouteAssistPointSection = ({ points }: Props) => {
    const rows = points ?? [];

    return (
        <RouteDetailSection
            title="Puntos de asistencia"
            icon={LifeBuoy}
            count={rows.length}
            emptyMessage="No hay puntos de asistencia vinculados a esta ruta."
        >
            {rows.map((point, index) => {
                const phone = point.assistphone?.trim();

                return (
                    <RoutePointCard
                        key={index}
                        icon={LifeBuoy}
                        eyebrow={displayText(point.assisttype)}
                        title={displayText(point.assistname)}
                    >
                        <InfoList>
                            <InfoRow icon={MapPin} label="Municipio">
                                {displayText(point.assisttown)}
                            </InfoRow>
                            <InfoRow icon={Navigation} label="Dirección">
                                {displayText(point.assistaddress)}
                            </InfoRow>
                        </InfoList>
                        {phone ? (
                            <Button
                                variant="outline"
                                className="w-full"
                                nativeButton={false}
                                render={<a href={`tel:${phone}`} />}
                            >
                                <Phone className="h-4 w-4" />
                                Llamar {phone}
                            </Button>
                        ) : (
                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                Sin teléfono registrado
                            </p>
                        )}
                    </RoutePointCard>
                );
            })}
        </RouteDetailSection>
    );
};
