import type { ReactNode } from 'react';
import { CheckCircle2, CircleHelp } from 'lucide-react';
import { Separator } from '@base-ui/react/separator';
import { useNavigate } from 'react-router';

import { Badge } from '@/shared/components/ui/badge';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';
import { StateCard } from '@/shared/components/custom/state-card.tsx';
import { QuestionsProgramsProvider } from '@/shared/components/questions/context/QuestionProvider.tsx';
import { QuestionsProgramsCards } from '@/shared/components/questions/components/card-questions.tsx';
import { QuestionsProgramsFooter } from '@/shared/components/questions/components/footer-questions.tsx';
import { QuestionsProgramsHeaderInfo } from '@/shared/components/questions/components/header-info.tsx';
import { QuestionsProgramsHeader } from '@/shared/components/questions/components/header-questions.tsx';
import type { AnswersMap } from '@/shared/components/questions/context/QuestionContext.tsx';
import type { QuestionProgram } from '@/shared/components/questions/constants/questions.ts';

import {
    PREVENTIVE_DASHBOARD_PATH,
    PREVENTIVE_PROGRAM_VERIFY_FIELD,
    type PreventiveProgramKey,
} from '@/features/preventive-programs/constants/programs.ts';
import { useSavePreventiveProgram } from '@/features/preventive-programs/hooks/useSavePreventiveProgram.ts';
import { useVerifyPreventivePrograms } from '@/features/preventive-programs/hooks/useVerifyPreventivePrograms.ts';
import { convertToPreventiveSave } from '@/features/preventive-programs/mappers/convert-to-preventive-save.ts';

export interface PreventiveQuestionSection {
    title: string;
    description?: string;
    questions: QuestionProgram[];
}

interface Props {
    program: PreventiveProgramKey;
    title: string;
    description: string;
    icon: ReactNode;
    sections: PreventiveQuestionSection[];
}

export const PreventiveQuestionnaire = (props: Props) => {
    const verifyQuery = useVerifyPreventivePrograms();

    return (
        <QueryState query={verifyQuery}>
            {(verify) =>
                verify[PREVENTIVE_PROGRAM_VERIFY_FIELD[props.program]] ? (
                    <main className="min-h-screen bg-background pb-16 font-sans">
                        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                            <StateCard
                                icon={CheckCircle2}
                                title="Cuestionario ya respondido"
                                description={`Ya respondiste las preguntas de ${props.title} el día de hoy. No es necesario volver a llenarlo.`}
                                hint="Podrás diligenciarlo nuevamente mañana."
                                backTo={PREVENTIVE_DASHBOARD_PATH}
                                backLabel="Volver a programas preventivos"
                            />
                        </div>
                    </main>
                ) : (
                    <PreventiveQuestionnaireForm {...props} />
                )
            }
        </QueryState>
    );
};

const PreventiveQuestionnaireForm = ({
    program,
    title,
    description,
    icon,
    sections,
}: Props) => {
    const navigate = useNavigate();
    const saveProgram = useSavePreventiveProgram(program);

    const questions = sections.flatMap((section) => section.questions);

    const handleSave = async (answers: AnswersMap) => {
        await saveProgram.mutateAsync(
            convertToPreventiveSave(questions, answers),
        );
        navigate(PREVENTIVE_DASHBOARD_PATH);
    };

    return (
        <QuestionsProgramsProvider questions={questions}>
            <main className="min-h-screen bg-background pb-28 font-sans">
                <QuestionsProgramsHeader path={PREVENTIVE_DASHBOARD_PATH} />

                <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                    <QuestionsProgramsHeaderInfo
                        iconChildren={icon}
                        description={description}
                        title={title}
                    />

                    <form noValidate>
                        {sections.map((section) => (
                            <section key={section.title}>
                                <div className="mt-7 flex items-end justify-between gap-3">
                                    <div>
                                        <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                                            {section.title}
                                        </h2>
                                        {section.description ? (
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {section.description}
                                            </p>
                                        ) : null}
                                    </div>
                                    {sections.length > 1 ? (
                                        <Badge
                                            variant="secondary"
                                            className="mb-1 shrink-0"
                                        >
                                            {section.questions.length} preguntas
                                        </Badge>
                                    ) : (
                                        <CircleHelp
                                            className="mb-1 h-5 w-5 shrink-0 text-muted-foreground"
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
                                <Separator className="mt-4" />

                                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                    {section.questions.map((question) => (
                                        <QuestionsProgramsCards
                                            key={question.id}
                                            question={question}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}

                        <QuestionsProgramsFooter
                            isTerminated
                            isSubmitting={saveProgram.isPending}
                            onSave={handleSave}
                        />
                    </form>
                </div>
            </main>
        </QuestionsProgramsProvider>
    );
};
