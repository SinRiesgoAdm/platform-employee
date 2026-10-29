import { ClipboardCheck, ChevronRight } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';

import { Separator } from '@/shared/components/ui/separator.tsx';
import { Link } from 'react-router';
import { useDashboardStore } from '@/features/dashboard/store/dashboard-store.ts';
import { useDashboardModules } from '@/shared/hooks/useDashboardModule.tsx';

const DashboardPage = () => {
    const { getTotalBadges } = useDashboardStore();
    const dashboardModules = useDashboardModules();

    return (
        <>
            {/* Modules */}
            <div className="mt-7 flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    Tus módulos
                </h2>
                <Badge variant="secondary" className="shrink-0">
                    <ClipboardCheck className="h-3 w-3" />
                    {getTotalBadges()} pendientes
                </Badge>
            </div>
            <Separator className="mt-3" />

            <nav className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {dashboardModules.map((mod) => {
                    const content = (
                        <>
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <mod.icon className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-sm font-semibold leading-snug text-foreground">
                                    {mod.title}
                                </span>
                                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                                    {mod.description}
                                </span>
                            </span>
                            <span className="flex shrink-0 items-center gap-1.5">
                                {mod.badge ? (
                                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[0.65rem] font-semibold text-primary-foreground">
                                        {mod.badge}
                                    </span>
                                ) : null}
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </span>
                        </>
                    );
                    const tileClass = `group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/70 bg-card p-4 text-left transition-all ${
                        !mod.isEnabled
                            ? 'opacity-50 cursor-not-allowed pointer-events-none'
                            : 'hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md'
                    }`;

                    return mod.to && mod.isEnabled ? (
                        <Link key={mod.title} to={mod.to} className={tileClass}>
                            {content}
                        </Link>
                    ) : (
                        <button
                            key={mod.title}
                            type="button"
                            disabled={!mod.isEnabled}
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

export default DashboardPage;
