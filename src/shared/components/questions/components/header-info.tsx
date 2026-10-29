import { useQuestionsPrograms } from '../context/QuestionContext';
import type { ReactNode } from 'react';

interface Props {
    title: string;
    description: string;
    category?: string;
    iconChildren: ReactNode;
}

export const QuestionsProgramsHeaderInfo = ({
    title,
    description,
    category = 'Prevención y autocuidado',
    iconChildren,
}: Props) => {
    const { totalQuestionResponse, totalQuestion } = useQuestionsPrograms();

    const progress =
        totalQuestion > 0
            ? Math.round((totalQuestionResponse / totalQuestion) * 100)
            : 0;

    return (
        <section
            className="rounded-xl p-5 text-brand-foreground sm:p-7"
            style={{ background: 'var(--gradient-brand)' }}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] opacity-75">
                        {category}
                    </p>
                    <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                        {title}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-85">
                        {description}
                    </p>
                </div>
                {iconChildren}
            </div>

            <div className="mt-6" aria-label={`Progreso: ${progress}%`}>
                <div className="mb-2 flex items-center justify-between text-xs opacity-80">
                    <span>Progreso</span>
                    <span>{progress}% completado</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-brand-foreground/20">
                    <div
                        className="h-full rounded-full bg-brand-foreground transition-[width] duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </section>
    );
};
