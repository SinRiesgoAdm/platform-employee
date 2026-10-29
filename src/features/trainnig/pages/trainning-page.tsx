import { Badge } from '@/shared/components/ui/badge.tsx';
import {
    ArrowLeft,
    CalendarDays,
    ChevronRight,
    GraduationCap,
} from 'lucide-react';
import { Separator } from '@/shared/components/ui/separator.tsx';
import { Link } from 'react-router';
import { Button } from '@/shared/components/ui/button.tsx';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table.tsx';
import { useAllTraining } from '@/features/trainnig/hooks/useAllTraining.ts';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';
import { StateTrainingComponent } from '@/features/trainnig/components/state-training-component.tsx';

export const TrainingPage = () => {
    const useAllTrainingQuery = useAllTraining();

    return (
        <QueryState query={useAllTrainingQuery}>
            {(trainingResponse) => {
                const pendding = trainingResponse.filter(
                    (c) => c.trainscoretest === null,
                ).length;

                return (
                    <main className="min-h-screen bg-background font-sans pb-14">
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
                                    Plan de capacitación
                                </span>
                            </div>
                        </header>

                        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                            <div
                                className="rounded-xl p-4 text-brand-foreground sm:p-6"
                                style={{ background: 'var(--gradient-brand)' }}
                            >
                                <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] opacity-75">
                                    Formación anual SST
                                </p>
                                <h1 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                                    Tus capacitaciones asignadas
                                </h1>
                                <p className="mt-2 max-w-lg text-sm opacity-85">
                                    Revisa el material, mira el video y responde
                                    las preguntas antes de la fecha final. Si
                                    pierdes una capacitación podrás repetirla.
                                </p>
                            </div>

                            <div className="mt-7 flex items-center justify-between gap-3">
                                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                                    Cronograma
                                </h2>
                                <Badge variant="secondary" className="shrink-0">
                                    <GraduationCap className="h-3 w-3" />
                                    {pendding} por realizar
                                </Badge>
                            </div>
                            <Separator className="mt-3" />

                            <div className="mt-4 grid gap-3 md:hidden">
                                {trainingResponse.map((c) => (
                                    <Link
                                        key={c.id}
                                        to={`/trainnings/${c.id}`}
                                        state={{ training: c }}
                                        className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/70 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                                    >
                                        <span className="min-w-0">
                                            <span className="block text-sm font-semibold leading-snug text-foreground">
                                                {c.category_name}
                                            </span>
                                            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                                                {c.subcategory_name}
                                            </span>
                                            <span className="mt-2 flex items-center gap-1.5 text-[0.7rem] text-muted-foreground">
                                                <CalendarDays className="h-3.5 w-3.5" />
                                                {c.date_start} — {c.date_end}
                                            </span>
                                            <span className="mt-2 block">
                                                <StateTrainingComponent
                                                    state={c.trainscoretest}
                                                />
                                            </span>
                                        </span>
                                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-4 hidden overflow-hidden rounded-xl border border-border/70 bg-card md:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Categoría</TableHead>
                                            <TableHead>Subcategoría</TableHead>
                                            <TableHead>Fecha inicial</TableHead>
                                            <TableHead>Fecha final</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">
                                                Acción
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {trainingResponse.map((c) => (
                                            <TableRow key={c.id}>
                                                <TableCell className="font-medium">
                                                    {c.category_name}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {c.subcategory_name}
                                                </TableCell>
                                                <TableCell>
                                                    {c.date_start}
                                                </TableCell>
                                                <TableCell>
                                                    {c.date_end}
                                                </TableCell>
                                                <TableCell>
                                                    <StateTrainingComponent
                                                        state={c.trainscoretest}
                                                    />
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        size="sm"
                                                        variant={
                                                            c.trainscoretest ===
                                                            null
                                                                ? 'default'
                                                                : c.trainscoretest >
                                                                    60
                                                                  ? 'outline'
                                                                  : 'destructive'
                                                        }
                                                        className={
                                                            c.trainscoretest !==
                                                                null &&
                                                            c.trainscoretest >
                                                                60
                                                                ? 'border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400'
                                                                : ''
                                                        }
                                                    >
                                                        <Link
                                                            to={`/trainnings/${c.id}`}
                                                            state={{
                                                                training: c,
                                                            }}
                                                        >
                                                            {c.trainscoretest ===
                                                            null
                                                                ? 'Iniciar'
                                                                : c.trainscoretest >
                                                                    60
                                                                  ? 'Ver'
                                                                  : 'Repetir'}
                                                        </Link>
                                                    </Button>
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
