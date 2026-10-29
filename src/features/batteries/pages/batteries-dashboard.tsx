import { Badge } from '@/shared/components/ui/badge.tsx';
import { ChevronRight, ClipboardCheck } from 'lucide-react';
import { Separator } from '@/shared/components/ui/separator.tsx';
import { Link } from 'react-router';
import { useBatteriesModules } from '@/shared/hooks/useBatteriesModules.ts';
import { useDashboardStore } from '@/features/dashboard/store/dashboard-store.ts';

export const BatteriesDashboard = () => {
    const batteriesModules = useBatteriesModules();
    const { getTotalBadgesBatteries } = useDashboardStore();
    return (
        <>
            <div className="mt-7 flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    Tus Módulos de Baterías
                </h2>
                <Badge variant="secondary" className="shrink-0">
                    <ClipboardCheck className="h-3 w-3" />
                    {getTotalBadgesBatteries()} pendientes
                </Badge>
            </div>
            <Separator className="mt-3" />

            <nav className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {batteriesModules.map((modBatteries) => {
                    const content = (
                        <>
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <modBatteries.icon className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-sm font-semibold leading-snug text-foreground">
                                    {modBatteries.title}
                                </span>
                                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                                    {modBatteries.description}
                                </span>
                            </span>
                            <span className="flex shrink-0 items-center gap-1.5">
                                {modBatteries.badge ? (
                                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[0.65rem] font-semibold text-primary-foreground">
                                        {modBatteries.badge}
                                    </span>
                                ) : null}
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </span>
                        </>
                    );
                    const tileClass =
                        'group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/70 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md';

                    return modBatteries.to ? (
                        <Link
                            key={modBatteries.title}
                            to={modBatteries.to}
                            className={tileClass}
                        >
                            {content}
                        </Link>
                    ) : (
                        <button
                            key={modBatteries.title}
                            type="button"
                            className={tileClass}
                        >
                            {content}
                        </button>
                    );
                })}
            </nav>
        </>
    );
};
