import { useState } from 'react';
import { ArrowLeft, Truck } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '@/shared/components/ui/badge.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Separator } from '@/shared/components/ui/separator.tsx';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';
import { useAllRouteDispatch } from '@/features/route-dispatch/hooks/useAllRouteDispatch.ts';
import { DispatchCardList } from '@/features/route-dispatch/components/dispatch-card-list.tsx';
import { DispatchTable } from '@/features/route-dispatch/components/dispatch-table.tsx';
import { ConfirmDispatchDialog } from '@/features/route-dispatch/components/confirm-dispatch-dialog.tsx';
import { TerminateDispatchDialog } from '@/features/route-dispatch/components/terminate-dispatch-dialog.tsx';
import type { RouteDispatchResponse } from '@/features/route-dispatch/types/route-dispatch-res.ts';

type ActiveDialog = {
    type: 'confirm' | 'terminate';
    dispatch: RouteDispatchResponse;
} | null;

export const RouteDispatchPage = () => {
    const routeDispatchQuery = useAllRouteDispatch();
    const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);

    const openDialog =
        (type: 'confirm' | 'terminate') => (dispatch: RouteDispatchResponse) =>
            setActiveDialog({ type, dispatch });
    const closeDialog = () => setActiveDialog(null);

    return (
        <main className="min-h-screen bg-background pb-14 font-sans">
            <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
                <div className="mx-auto grid max-w-6xl grid-cols-[auto_minmax(0,1fr)] items-center gap-2 px-4 py-3 sm:px-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Volver al panel"
                        nativeButton={false}
                        render={<Link to="/" />}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <span className="truncate font-display text-base font-semibold tracking-tight text-foreground">
                        Despachos de rutas
                    </span>
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8">
                <section
                    className="rounded-xl p-5 text-brand-foreground sm:p-7"
                    style={{ background: 'var(--gradient-brand)' }}
                >
                    <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] opacity-75">
                        Control de recorridos
                    </p>
                    <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                        Tus despachos asignados
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-85">
                        Revisa los datos de la ruta y regístrala como completada
                        al terminar el recorrido.
                    </p>
                </section>

                <QueryState query={routeDispatchQuery}>
                    {(dispatches) => (
                        <>
                            <div className="mt-7 flex items-center justify-between gap-3">
                                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                                    Listado
                                </h2>
                                <Badge variant="secondary" className="shrink-0">
                                    <Truck className="h-3 w-3" />
                                    {dispatches.length} despachos
                                </Badge>
                            </div>
                            <Separator className="mt-3" />

                            {dispatches.length === 0 ? (
                                <p className="mt-10 text-center text-sm text-muted-foreground">
                                    No tienes despachos de ruta asignados.
                                </p>
                            ) : (
                                <>
                                    <DispatchCardList
                                        dispatches={dispatches}
                                        onConfirm={openDialog('confirm')}
                                        onTerminate={openDialog('terminate')}
                                    />
                                    <DispatchTable
                                        dispatches={dispatches}
                                        onConfirm={openDialog('confirm')}
                                        onTerminate={openDialog('terminate')}
                                    />
                                </>
                            )}
                        </>
                    )}
                </QueryState>
            </div>

            <ConfirmDispatchDialog
                dispatch={
                    activeDialog?.type === 'confirm'
                        ? activeDialog.dispatch
                        : null
                }
                onClose={closeDialog}
            />
            <TerminateDispatchDialog
                dispatch={
                    activeDialog?.type === 'terminate'
                        ? activeDialog.dispatch
                        : null
                }
                onClose={closeDialog}
            />
        </main>
    );
};
