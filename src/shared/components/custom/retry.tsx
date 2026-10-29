import { RefreshCw } from 'lucide-react';
import { BrandLogo } from '@/shared/components/custom/brand-logo.tsx';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/shared/components/ui/card.tsx';

export const RetryPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 font-sans">
            <Card className="w-full max-w-md overflow-hidden border-primary/15 shadow-panel">
                <div className="h-1.5 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60">
                    <div className="h-full w-1/2 animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-primary-foreground/50 to-transparent" />
                </div>

                <CardHeader className="text-center pt-8">
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10">
                        <RefreshCw
                            className="h-10 w-10 animate-spin text-primary"
                            aria-hidden="true"
                        />
                    </div>
                    <p className="pt-3 text-6xl font-display font-bold tracking-tight text-primary/90">
                        Reintentando
                    </p>
                    <CardTitle className="text-2xl font-display font-semibold tracking-tight">
                        Estableciendo conexión
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                        La conexión falló, así que estamos intentando cargar tu
                        información nuevamente. Esto solo tomará unos segundos.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pb-8">
                    <div className="rounded-xl border border-primary/10 bg-primary/5 p-4 text-sm text-primary/90">
                        <p className="flex items-start gap-2">
                            <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 animate-spin" />
                            Intentando reconectar con el servidor. Por favor no
                            cierres esta ventana.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        <BrandLogo className="h-3.5 w-3.5" />
                        Sinriesgo.co
                    </div>
                </CardContent>
            </Card>
        </main>
    );
};
