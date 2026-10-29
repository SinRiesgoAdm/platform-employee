import { Bus } from 'lucide-react';

interface Props {
    progress?: number;
}

export const PreoperationalHero = ({ progress }: Props) => {
    return (
        <section
            className="rounded-xl p-5 text-brand-foreground sm:p-7"
            style={{ background: 'var(--gradient-brand)' }}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] opacity-75">
                        Inspección diaria del vehículo
                    </p>
                    <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                        Preoperacional de vehículo
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-85">
                        Marca el estado de cada punto de revisión antes de
                        iniciar la marcha. Registra la cantidad cuando aplique.
                    </p>
                </div>
                <Bus className="hidden h-9 w-9 shrink-0 opacity-70 sm:block" />
            </div>

            {progress !== undefined ? (
                <div className="mt-6" aria-label={`Progreso: ${progress}%`}>
                    <div className="mb-2 flex items-center justify-between text-xs opacity-80">
                        <span>Progreso</span>
                        <span>{progress}% verificado</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-brand-foreground/20">
                        <div
                            className="h-full rounded-full bg-brand-foreground transition-[width] duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            ) : null}
        </section>
    );
};
