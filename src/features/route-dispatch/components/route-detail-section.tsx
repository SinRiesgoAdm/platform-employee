import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Separator } from '@/shared/components/ui/separator.tsx';

interface Props {
    title: string;
    icon: LucideIcon;
    count: number;
    emptyMessage: string;
    children: ReactNode;
}

/** Encabezado, contador y estado vacío comunes a las secciones del detalle de ruta. */
export const RouteDetailSection = ({
    title,
    icon: Icon,
    count,
    emptyMessage,
    children,
}: Props) => (
    <section className="mt-8">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-foreground">
            <Icon className="h-4 w-4 text-primary" />
            {title}
            <span className="text-sm font-normal text-muted-foreground">
                ({count})
            </span>
        </h2>
        <Separator className="mt-3" />

        {count === 0 ? (
            <div className="mt-4 rounded-lg border border-dashed border-border/70 bg-muted/30 p-4 text-center text-sm text-muted-foreground">
                {emptyMessage}
            </div>
        ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-2">{children}</div>
        )}
    </section>
);
