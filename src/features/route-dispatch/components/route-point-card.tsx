import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Milestone } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge.tsx';
import { Card, CardContent } from '@/shared/components/ui/card.tsx';
import { cn } from '@/shared/utils/cn';
import { displayKm } from '@/features/route-dispatch/utils/route-detail.ts';

const TONE_CLASSES = {
    primary: 'bg-primary/10 text-primary',
    destructive: 'bg-destructive/10 text-destructive',
} as const;

interface RoutePointCardProps {
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    /** Kilómetro sobre la ruta; se muestra como badge si se envía. */
    km?: string;
    tone?: keyof typeof TONE_CLASSES;
    children: ReactNode;
}

/** Tarjeta base de los elementos vinculados a una ruta (peajes, zonas, puntos). */
export const RoutePointCard = ({
    icon: Icon,
    eyebrow,
    title,
    km,
    tone = 'primary',
    children,
}: RoutePointCardProps) => (
    <Card className="border-border/70 shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="grid gap-4 p-4 sm:p-5">
            <div className="flex items-start gap-3">
                <span
                    className={cn(
                        'grid h-10 w-10 shrink-0 place-items-center rounded-lg',
                        TONE_CLASSES[tone],
                    )}
                >
                    <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                    <p className="text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
                        {eyebrow}
                    </p>
                    <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
                        {title}
                    </h3>
                </div>
                {km !== undefined && (
                    <Badge variant="secondary" className="h-6 shrink-0 px-2.5">
                        <Milestone />
                        {displayKm(km)}
                    </Badge>
                )}
            </div>
            {children}
        </CardContent>
    </Card>
);

export const InfoList = ({ children }: { children: ReactNode }) => (
    <dl className="grid gap-3 sm:grid-cols-2">{children}</dl>
);

interface InfoRowProps {
    icon: LucideIcon;
    label: string;
    children: ReactNode;
    className?: string;
}

export const InfoRow = ({
    icon: Icon,
    label,
    children,
    className,
}: InfoRowProps) => (
    <div className={cn('flex items-start gap-2.5', className)}>
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
            <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
            <dt className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                {label}
            </dt>
            <dd className="text-sm font-medium break-words text-foreground">
                {children}
            </dd>
        </div>
    </div>
);

interface CardFooterBlockProps {
    label: string;
    children: ReactNode;
}

/** Bloque inferior separado por una línea (servicios, recomendaciones…). */
export const CardFooterBlock = ({ label, children }: CardFooterBlockProps) => (
    <div className="border-t border-border/60 pt-3">
        <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            {label}
        </p>
        <div className="mt-2">{children}</div>
    </div>
);

interface ChipListProps {
    items: string[];
    emptyText: string;
}

export const ChipList = ({ items, emptyText }: ChipListProps) =>
    items.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
            {items.map((item) => (
                <li key={item}>
                    <Badge variant="outline" className="h-6 px-2.5">
                        {item}
                    </Badge>
                </li>
            ))}
        </ul>
    ) : (
        <p className="text-sm text-muted-foreground">{emptyText}</p>
    );
