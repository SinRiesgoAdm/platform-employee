import { ArrowLeft, ChevronRight, HardHat, Tag, Wrench } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table.tsx';
import { Link, useNavigate } from 'react-router';
import { useAllInspections } from '@/features/inspections/hooks/useAllInspections.ts';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';
import type { InspectionsResponse } from '@/features/inspections/types/inspection-all-res.ts';

export const InspectionPage = () => {
    const useAllQuestion = useAllInspections();
    const navigate = useNavigate();

    const handleHistory = (inspection: InspectionsResponse) => {
        navigate(`/inspections/${inspection.id}`);
    };

    return (
        <QueryState query={useAllQuestion}>
            {(questionResponse) => {
                return (
                    <main className="min-h-screen bg-background pb-14 font-sans">
                        <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
                            <div className="mx-auto grid max-w-5xl grid-cols-[auto_minmax(0,1fr)] items-center gap-2 px-4 py-3 sm:px-6">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Volver al panel"
                                >
                                    <Link to="/">
                                        <ArrowLeft className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <span className="truncate font-display text-base font-semibold tracking-tight text-foreground">
                                    Inspecciones y preoperacionales SST
                                </span>
                            </div>
                        </header>

                        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                            <div
                                className="rounded-xl p-4 text-brand-foreground sm:p-6"
                                style={{ background: 'var(--gradient-brand)' }}
                            >
                                <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] opacity-75">
                                    Máquinas y equipos
                                </p>
                                <h1 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                                    Tus equipos asignados
                                </h1>
                                <p className="mt-2 max-w-lg text-sm opacity-85">
                                    Selecciona una máquina para ver su historial
                                    de inspecciones y preoperacionales, o
                                    registrar una nueva revisión.
                                </p>
                            </div>

                            <div className="mt-7 flex items-center justify-between gap-3">
                                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                                    Listado
                                </h2>
                                <Badge variant="secondary" className="shrink-0">
                                    <HardHat className="h-3 w-3" />
                                    {questionResponse.length} equipos
                                </Badge>
                            </div>
                            <Separator className="mt-3" />

                            {/* Mobile */}
                            <div className="mt-4 grid gap-3 md:hidden">
                                {questionResponse.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => handleHistory(m)}
                                        className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/70 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                                    >
                                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                            <Wrench className="h-5 w-5" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-sm font-semibold leading-snug text-foreground">
                                                {m.code}
                                            </span>
                                            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                                                {m.brand} · {m.typemachine}
                                            </span>
                                            <span className="mt-2 inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground">
                                                <Tag className="h-3.5 w-3.5" />
                                                {m.inspectypreopCount}
                                                revisiones
                                            </span>
                                        </span>
                                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                                    </button>
                                ))}
                            </div>

                            {/* Desktop */}
                            <div className="mt-4 hidden overflow-hidden rounded-xl border border-border/70 bg-card md:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>
                                                Código de la máquina
                                            </TableHead>
                                            <TableHead>Marca</TableHead>
                                            <TableHead>
                                                Tipo de máquina
                                            </TableHead>
                                            <TableHead>Revisiones</TableHead>
                                            <TableHead className="text-right">
                                                Acción
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {questionResponse.map((m) => (
                                            <TableRow
                                                key={m.id}
                                                onClick={() => handleHistory(m)}
                                                className="group cursor-pointer transition-colors hover:bg-muted/50"
                                            >
                                                <TableCell className="font-medium">
                                                    {m.code}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {m.brand}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {m.typemachine}
                                                </TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                                                        <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                                                        {m.inspectypreopCount}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                                        Ver historial
                                                        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </main>
                );
            }}
        </QueryState>
    );
};
