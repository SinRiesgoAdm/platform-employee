import {
    ArrowLeft,
    CalendarDays,
    ChevronRight,
    Plus,
    User,
} from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table';
import { Link, useNavigate, useParams } from 'react-router';
import { useHistoryInspections } from '@/features/inspections/hooks/useHistoryInspections.ts';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';
import { StateMachineComponent } from '@/features/inspections/components/state-machine-components.tsx';
import { notify } from '@/shared/utils/notify.ts';

export const InspectionDetailHistory = () => {
    const { inspectionId } = useParams();

    const inspectionHistory = useHistoryInspections(
        inspectionId ? parseInt(inspectionId) : 0,
    );

    const navigate = useNavigate();

    const evaluateTypeCheck = (type: string) =>
        type === '1' ? 'Inspección' : 'Preoperacional';

    return (
        <QueryState query={inspectionHistory}>
            {(historyInspections) => {
                return (
                    <main className="min-h-screen bg-background pb-14 font-sans">
                        <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
                            <div className="mx-auto grid max-w-5xl grid-cols-[auto_minmax(0,1fr)] items-center gap-2 px-4 py-3 sm:px-6">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Volver al listado de equipos"
                                >
                                    <Link to="/inspections">
                                        <ArrowLeft className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <span className="truncate font-display text-base font-semibold tracking-tight text-foreground">
                                    {historyInspections.machine.code} ·
                                    Historial
                                </span>
                            </div>
                        </header>

                        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                            <div
                                className="rounded-xl p-4 text-brand-foreground sm:p-6"
                                style={{ background: 'var(--gradient-brand)' }}
                            >
                                <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] opacity-75">
                                    {historyInspections.machine.typemachine}
                                </p>
                                <h1 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                                    {historyInspections.machine.code} —{' '}
                                    {historyInspections.machine.brand}
                                </h1>
                                <p className="mt-2 max-w-lg text-sm opacity-85">
                                    Revisiones registradas por ti o por otros
                                    empleados. Abre el detalle para consultar la
                                    lista de chequeo en solo lectura.
                                </p>
                            </div>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                                        Historial de revisiones
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {historyInspections.history.length}{' '}
                                        registro(s)
                                    </p>
                                </div>
                                <Button
                                    onClick={() => {
                                        if (historyInspections.is_enabled) {
                                            navigate(
                                                `/inspections/create/${inspectionId}/${historyInspections.machine.typemachine}`,
                                            );
                                            return;
                                        }

                                        notify.info(
                                            'Ya existe una inspección registrada para el día de hoy.',
                                        );
                                    }}
                                    className="w-full gap-2 sm:w-auto"
                                    // render={}
                                >
                                    <Plus className="h-4 w-4" />
                                    Nueva revisión
                                </Button>
                            </div>
                            <Separator className="mt-4" />

                            {historyInspections.history.length === 0 ? (
                                <Card className="mt-4 border-border/70 shadow-sm">
                                    <CardContent className="grid gap-2 p-6 text-center">
                                        <p className="text-sm font-semibold text-foreground">
                                            Sin revisiones registradas
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Registra la primera revisión de este
                                            equipo.
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <>
                                    {/* Mobile */}
                                    <div className="mt-4 grid gap-3 md:hidden">
                                        {historyInspections.history.map(
                                            (rev) => (
                                                <div
                                                    key={rev.id}
                                                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/70 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                                                >
                                                    <span className="min-w-0">
                                                        <span className="block text-sm font-semibold leading-snug text-foreground">
                                                            {evaluateTypeCheck(
                                                                rev.typeCheck,
                                                            )}
                                                        </span>
                                                        <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <User className="h-3.5 w-3.5" />
                                                            {rev.employeeName}
                                                        </span>
                                                        <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <CalendarDays className="h-3.5 w-3.5" />
                                                            {rev.date}
                                                        </span>
                                                        <span className="mt-2 block">
                                                            <StateMachineComponent
                                                                state={
                                                                    rev.outOfService
                                                                }
                                                            />
                                                        </span>
                                                    </span>
                                                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                                                </div>
                                            ),
                                        )}
                                    </div>

                                    {/* Desktop */}
                                    <div className="mt-4 hidden overflow-hidden rounded-xl border border-border/70 bg-card md:block">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        Inspeccionó
                                                    </TableHead>
                                                    <TableHead>
                                                        Máquina o equipo
                                                    </TableHead>
                                                    <TableHead>
                                                        Tipo de chequeo
                                                    </TableHead>
                                                    <TableHead>
                                                        Fecha de actividad
                                                    </TableHead>
                                                    <TableHead>
                                                        Estado
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {historyInspections.history.map(
                                                    (rev) => (
                                                        <TableRow key={rev.id}>
                                                            <TableCell className="font-medium">
                                                                {
                                                                    rev.employeeName
                                                                }
                                                            </TableCell>
                                                            <TableCell className="text-muted-foreground">
                                                                {
                                                                    historyInspections
                                                                        .machine
                                                                        .code
                                                                }{' '}
                                                                ·{' '}
                                                                {
                                                                    historyInspections
                                                                        .machine
                                                                        .typemachine
                                                                }
                                                            </TableCell>
                                                            <TableCell className="text-muted-foreground">
                                                                {evaluateTypeCheck(
                                                                    rev.typeCheck,
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {rev.date}
                                                            </TableCell>
                                                            <TableCell>
                                                                <StateMachineComponent
                                                                    state={
                                                                        rev.outOfService
                                                                    }
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </>
                            )}
                        </div>
                    </main>
                );
            }}
        </QueryState>
    );
};
