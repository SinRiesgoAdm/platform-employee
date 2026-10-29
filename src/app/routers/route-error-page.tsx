// Pantallas de error del router (errorElement y ruta "*").
//
// - 404: dirección que no existe.
// - Chunk: una pantalla lazy de una versión anterior ya no está en el
//   servidor (se publicó una versión nueva). Se arregla recargando.
// - Cualquier otro error: la ErrorPage de siempre.

import { RefreshCw, SearchX } from 'lucide-react';
import { isRouteErrorResponse, useRouteError } from 'react-router';
import { ErrorPage } from '@/shared/components/custom/error.tsx';
import { StateCard } from '@/shared/components/custom/state-card.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Card, CardContent } from '@/shared/components/ui/card.tsx';

const isChunkLoadError = (error: unknown) =>
    error instanceof Error &&
    /dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
        error.message,
    );

export const NotFoundPage = () => (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 font-sans">
        <div className="w-full max-w-md">
            <StateCard
                icon={SearchX}
                title="Página no encontrada"
                description="La dirección que abriste no existe o cambió."
            />
        </div>
    </main>
);

const NewVersionPage = () => (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 font-sans">
        <Card className="w-full max-w-md border-border/70 shadow-sm">
            <CardContent className="flex flex-col items-center px-6 py-10 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
                    <RefreshCw className="h-8 w-8" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-display text-lg font-semibold tracking-tight">
                    Hay una versión nueva
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Actualiza para seguir usando la app.
                </p>
                <Button
                    className="mt-6"
                    onClick={() => window.location.reload()}
                >
                    Actualizar
                </Button>
            </CardContent>
        </Card>
    </main>
);

export const RouteErrorPage = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error) && error.status === 404) {
        return <NotFoundPage />;
    }

    if (isChunkLoadError(error)) {
        return <NewVersionPage />;
    }

    console.error('[Router] Error no controlado', error);
    return <ErrorPage />;
};
