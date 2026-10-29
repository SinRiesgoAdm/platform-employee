import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/shared/components/ui/button.tsx';
import { cn } from '@/shared/utils/cn.ts';

interface Props {
    children?: ReactNode;
}

export const PreoperationalHeader = ({ children }: Props) => {
    return (
        <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur">
            <div className="mx-auto grid max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-4 py-3 sm:px-6">
                <Link
                    to="/"
                    aria-label="Volver al panel"
                    className={cn(
                        buttonVariants({ variant: 'ghost', size: 'icon' }),
                    )}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Link>
                <span className="truncate font-display text-base font-semibold tracking-tight text-foreground">
                    Preoperacional PESV
                </span>

                {children}
            </div>
        </header>
    );
};
