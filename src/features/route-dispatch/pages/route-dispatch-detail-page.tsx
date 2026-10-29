import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { Button } from '@/shared/components/ui/button.tsx';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';
import { useRouteDispatchDetail } from '@/features/route-dispatch/hooks/useRouteDispatchDetail.ts';
import { RouteDetailHero } from '@/features/route-dispatch/components/route-detail-hero.tsx';
import { RouteInfoCard } from '@/features/route-dispatch/components/route-info-card.tsx';
import { RouteMapCard } from '@/features/route-dispatch/components/route-map-card.tsx';
import { RouteTollSection } from '@/features/route-dispatch/components/route-toll-section.tsx';
import { RouteZoneSection } from '@/features/route-dispatch/components/route-zone-section.tsx';
import { RouteControlPointSection } from '@/features/route-dispatch/components/route-control-point-section.tsx';
import { RouteAssistPointSection } from '@/features/route-dispatch/components/route-assist-point-section.tsx';
import { RouteCriticPointSection } from '@/features/route-dispatch/components/route-critic-point-section.tsx';
import { displayText } from '@/features/route-dispatch/utils/route-detail.ts';

export const RouteDispatchDetailPage = () => {
    const { routeId } = useParams();
    const routeDetailQuery = useRouteDispatchDetail(Number(routeId) || 0);

    return (
        <main className="min-h-screen bg-background pb-16 font-sans">
            <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
                <div className="mx-auto grid max-w-5xl grid-cols-[auto_minmax(0,1fr)] items-center gap-2 px-4 py-3 sm:px-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Volver a despachos"
                        nativeButton={false}
                        render={<Link to="/route-dispatch" />}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <span className="truncate font-display text-base font-semibold tracking-tight text-foreground">
                        Detalle de la ruta
                    </span>
                </div>
            </header>

            <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                <QueryState query={routeDetailQuery}>
                    {(detail) => {
                        const { routeInfo } = detail;
                        const routeName = `${displayText(routeInfo.routestart)} → ${displayText(routeInfo.routearrival)}`;

                        return (
                            <>
                                <RouteDetailHero route={routeInfo} />
                                <RouteInfoCard route={routeInfo} />
                                <RouteMapCard
                                    mapUrl={routeInfo.routemap}
                                    routeName={routeName}
                                />

                                <RouteTollSection tolls={detail.tolls} />
                                <RouteZoneSection zones={detail.typeZones} />
                                <RouteControlPointSection
                                    points={detail.controlPoints}
                                />
                                <RouteAssistPointSection
                                    points={detail.assistPoints}
                                />
                                <RouteCriticPointSection
                                    points={detail.criticPoints}
                                />
                            </>
                        );
                    }}
                </QueryState>
            </div>
        </main>
    );
};
