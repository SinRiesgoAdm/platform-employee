import type { LucideIcon } from 'lucide-react';
import { ArrowRight, CircleDot, Gauge, Timer } from 'lucide-react';
import type { RouteInfo } from '@/features/route-dispatch/types/route-detail-res.ts';
import { displayText } from '@/features/route-dispatch/utils/route-detail.ts';

interface StatProps {
    icon: LucideIcon;
    label: string;
    value: string;
}

const Stat = ({ icon: Icon, label, value }: StatProps) => (
    <div className="rounded-lg bg-brand-foreground/10 p-3">
        <p className="flex items-center gap-1.5 text-[0.7rem] uppercase tracking-wider opacity-75">
            <Icon className="h-3.5 w-3.5" />
            {label}
        </p>
        <p className="mt-1 font-display text-lg font-semibold">{value}</p>
    </div>
);

interface Props {
    route: RouteInfo;
}

export const RouteDetailHero = ({ route }: Props) => {
    return (
        <section
            className="rounded-xl p-5 text-brand-foreground sm:p-7"
            style={{ background: 'var(--gradient-brand)' }}
        >
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] opacity-75">
                Información general de la ruta
            </p>
            <h1 className="mt-2 flex flex-wrap items-center gap-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {displayText(route.routestart)}
                <ArrowRight className="h-5 w-5 opacity-80" />
                {displayText(route.routearrival)}
            </h1>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Stat
                    icon={Gauge}
                    label="Distancia"
                    value={`${route.travelkilo} km`}
                />
                <Stat
                    icon={Timer}
                    label="Duración"
                    value={displayText(route.traveltime)}
                />
                <Stat
                    icon={CircleDot}
                    label="Estado"
                    value={displayText(route.routestatus)}
                />
            </div>
        </section>
    );
};
