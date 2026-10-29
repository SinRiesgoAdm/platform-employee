import type { LucideIcon } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { buttonVariants } from '@/shared/components/ui/button.tsx';
import { Card, CardContent } from '@/shared/components/ui/card';
import { cn } from '@/shared/utils/cn.ts';

interface Props {
    icon: LucideIcon;
    title: string;
    description: string;
    hint?: string;
    tone?: 'primary' | 'muted';
    backTo?: string;
    backLabel?: string;
}

export const StateCard = ({
    icon: Icon,
    title,
    description,
    hint,
    tone = 'primary',
    backTo = '/',
    backLabel = 'Volver al inicio',
}: Props) => {
    return (
        <Card className="mt-6 border-border/70 shadow-sm">
            <CardContent className="flex flex-col items-center px-6 py-10 text-center">
                <div
                    className={cn(
                        'grid h-16 w-16 place-items-center rounded-full',
                        tone === 'primary'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground',
                    )}
                >
                    <Icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground">
                    {title}
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {description}
                </p>
                {hint ? (
                    <p className="mt-4 rounded-lg border border-border/70 bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                        {hint}
                    </p>
                ) : null}
                <Link
                    to={backTo}
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'mt-6 gap-2',
                    )}
                >
                    <ArrowLeft className="h-4 w-4" />
                    {backLabel}
                </Link>
            </CardContent>
        </Card>
    );
};
