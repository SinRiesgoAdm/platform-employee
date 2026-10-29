import { Loader2 } from 'lucide-react';
import { BrandLogo } from '@/shared/components/custom/brand-logo.tsx';
import { Card, CardContent } from '@/shared/components/ui/card.tsx';

const LoadingPage = () => {
    return (
        <main
            className="flex min-h-screen items-center justify-center bg-background px-4 py-8 font-sans"
            aria-live="polite"
            aria-busy="true"
        >
            <Card className="w-full max-w-sm overflow-hidden border-border/70 shadow-panel">
                <div className="h-1.5 w-full bg-secondary">
                    <div className="h-full w-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                </div>
                <CardContent className="flex flex-col items-center px-6 py-12 text-center">
                    <div className="relative grid h-20 w-20 place-items-center rounded-full bg-primary/10">
                        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                        <Loader2
                            className="relative h-9 w-9 animate-spin text-primary"
                            aria-hidden="true"
                        />
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        <BrandLogo className="h-4 w-4" />
                        Sinriesgo.co
                    </div>

                    <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                        Cargando información
                    </h1>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                        Estamos preparando todo para ti. Esto solo tomará unos
                        segundos.
                    </p>

                    <div className="mt-8 flex w-full max-w-[10rem] justify-center gap-1.5">
                        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" />
                    </div>
                </CardContent>
            </Card>
        </main>
    );
};
export default LoadingPage;
