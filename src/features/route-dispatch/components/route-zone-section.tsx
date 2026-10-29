import type { LucideIcon } from 'lucide-react';
import { Gauge, Map as MapIcon, Scale, Truck } from 'lucide-react';
import { RouteDetailSection } from '@/features/route-dispatch/components/route-detail-section.tsx';
import { RoutePointCard } from '@/features/route-dispatch/components/route-point-card.tsx';
import type { RouteTypeZone } from '@/features/route-dispatch/types/route-detail-res.ts';
import { displayText } from '@/features/route-dispatch/utils/route-detail.ts';

interface SpeedStatProps {
    icon: LucideIcon;
    label: string;
    value: string;
}

const SpeedStat = ({ icon: Icon, label, value }: SpeedStatProps) => {
    const speed = displayText(value);

    return (
        <div className="rounded-lg bg-muted/50 p-3">
            <p className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                <Icon className="h-3.5 w-3.5" />
                {label}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-foreground">
                {speed}
                {speed !== '—' && (
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                        km/h
                    </span>
                )}
            </p>
        </div>
    );
};

interface Props {
    zones: RouteTypeZone[] | null | undefined;
}

export const RouteZoneSection = ({ zones }: Props) => {
    const rows = zones ?? [];

    return (
        <RouteDetailSection
            title="Zonas viales"
            icon={MapIcon}
            count={rows.length}
            emptyMessage="No hay zonas viales vinculadas a esta ruta."
        >
            {rows.map((zone, index) => (
                <RoutePointCard
                    key={index}
                    icon={MapIcon}
                    eyebrow="Zona vial"
                    title={displayText(zone.zonename)}
                >
                    <div className="grid grid-cols-3 gap-2">
                        <SpeedStat
                            icon={Truck}
                            label="Con carga"
                            value={zone.velcarga}
                        />
                        <SpeedStat
                            icon={Gauge}
                            label="Sin carga"
                            value={zone.velnocarga}
                        />
                        <SpeedStat
                            icon={Scale}
                            label="Normativa"
                            value={zone.velnorma}
                        />
                    </div>
                </RoutePointCard>
            ))}
        </RouteDetailSection>
    );
};
