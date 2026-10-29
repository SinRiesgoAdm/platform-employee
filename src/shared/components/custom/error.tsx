import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card.tsx';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { BrandLogo } from '@/shared/components/custom/brand-logo.tsx';
import { Button, buttonVariants } from '@/shared/components/ui/button.tsx';
import { Link } from 'react-router';
import { cn } from '@/shared/utils/cn.ts';

export const ErrorPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 font-sans">
            <Card className="w-full max-w-lg overflow-hidden border-destructive/20 shadow-panel">
                <div className="h-1.5 w-full bg-gradient-to-r from-destructive/80 via-destructive to-destructive/80" />
                <CardHeader className="text-center pt-8">
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-destructive/10">
                        <AlertTriangle
                            className="h-10 w-10 text-destructive"
                            aria-hidden="true"
                        />
                    </div>
                    <p className="pt-3 text-7xl font-display font-bold tracking-tight text-destructive/90">
                        ¡Ups!
                    </p>
                    <CardTitle className="text-2xl font-display font-semibold tracking-tight">
                        Algo no salió bien
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                        Ocurrió un error inesperado mientras cargábamos la
                        página. No te preocupes, tu información está segura.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pb-8">
                    <div className="rounded-xl border border-destructive/10 bg-destructive/5 p-4 text-sm text-destructive/90">
                        <p className="flex items-start gap-2">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                            Si el problema persiste, intenta más tarde o
                            contacta al equipo de soporte.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                        <Button
                            className="flex-1 items-center justify-center gap-2"
                            onClick={() => window.location.reload()}
                        >
                            <RefreshCw className="h-4 w-4" />
                            Reintentar
                        </Button>
                        <Link
                            to="/"
                            className={cn(
                                buttonVariants({ variant: 'outline' }),
                                'flex-1 items-center justify-center gap-2',
                            )}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver al inicio
                        </Link>
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
