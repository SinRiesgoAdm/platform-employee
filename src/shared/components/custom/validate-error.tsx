import type { ReactNode } from 'react';
import type { FetchStatus } from '@tanstack/react-query';
import { WifiOff } from 'lucide-react';
import { StateCard } from '@/shared/components/custom/state-card.tsx';
import { ErrorPage } from '@/shared/components/custom/error.tsx';
import LoadingPage from '@/shared/components/custom/loading.tsx';

interface QueryStateProps<T> {
    query: {
        data: T | undefined;
        isLoading: boolean;
        isPending?: boolean;
        isError: boolean;
        fetchStatus?: FetchStatus;
    };
    children: (data: T) => ReactNode;
}

export function QueryState<T>({ query, children }: QueryStateProps<T>) {
    const { data, isLoading, isPending, isError, fetchStatus } = query;

    // Sin datos guardados y sin red: TanStack Query PAUSA la consulta
    // (fetchStatus 'paused') hasta que vuelva internet. No es "cargando".
    if (isPending && fetchStatus === 'paused') {
        return (
            <div className="px-4">
                <StateCard
                    icon={WifiOff}
                    tone="muted"
                    title="Sin conexión"
                    description="Esta sección todavía no está guardada en tu dispositivo. Se cargará sola cuando vuelvas a tener internet."
                    hint="Las secciones que ya abriste con conexión sí funcionan sin internet."
                />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-2">
                <LoadingPage />
            </div>
        );
    }

    if (isError || data === undefined) {
        return <ErrorPage />;
    }

    return children(data);
}
