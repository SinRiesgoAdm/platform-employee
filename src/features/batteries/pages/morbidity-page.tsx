import { CircleHelp, HeartPulse } from 'lucide-react';
import { Separator } from '@base-ui/react/separator';
import { useState } from 'react';

import { QuestionsProgramsProvider } from '@/shared/components/questions/context/QuestionProvider.tsx';
import { QuestionsProgramsCards } from '@/shared/components/questions/components/card-questions.tsx';
import { QuestionsProgramsFooter } from '@/shared/components/questions/components/footer-questions.tsx';
import type { AnswersMap } from '@/shared/components/questions/context/QuestionContext.tsx';
import { QuestionsProgramsHeaderInfo } from '@/shared/components/questions/components/header-info.tsx';
import { QuestionsProgramsHeader } from '@/shared/components/questions/components/header-questions.tsx';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';

import { useGetQuestionMorbidity } from '@/features/batteries/hooks/useGetQuestionMorbidity.ts';
import {
    convertToQuestionMapper,
    convertToQuestionMapperSave,
} from '@/features/batteries/mappers/convert-to-question-mapper.ts';
import { useSearchParams, useNavigate } from 'react-router';
import { PaginationQuestionComponent } from '@/features/batteries/components/pagination-questions-components.tsx';
import { useSaveQuestionsMorbidity } from '@/features/batteries/hooks/useSaveQuestionsBatteries.ts';
import { useInvalidateCacheGenerals } from '@/shared/hooks/useInvalidateCacheGenerals.ts';

const MorbidityPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [searchParams, triggerSearchParams] = useSearchParams();
    const page = searchParams.get('page') ?? '1';

    const questionMorbidityQuery = useGetQuestionMorbidity(page);
    const questionMorbiditySave = useSaveQuestionsMorbidity(page);

    const invalidateDashboard = useInvalidateCacheGenerals(
        'dashboardStatistics',
    );

    const handlePageChange = (newPage: number) => {
        triggerSearchParams((prev) => {
            prev.set('page', String(newPage));
            return prev;
        });
    };

    const navigate = useNavigate();

    return (
        <QueryState query={questionMorbidityQuery}>
            {(questionMorbidityResponse) => {
                const mapper = convertToQuestionMapper(
                    questionMorbidityResponse,
                );

                const handleSave = async (answers: AnswersMap) => {
                    setIsSubmitting(true);
                    try {
                        const mapperReq = convertToQuestionMapperSave(
                            questionMorbidityResponse.test_id,
                            questionMorbidityResponse.year,
                            answers,
                        );

                        await questionMorbiditySave.mutateAsync(mapperReq);

                        if (
                            page < questionMorbidityResponse.max_page.toString()
                        ) {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            });
                        } else {
                            invalidateDashboard();
                            navigate('/dashboard/batteries');
                        }

                        handlePageChange(Number(page) + 1);
                    } finally {
                        setIsSubmitting(false);
                    }
                };

                return (
                    <QuestionsProgramsProvider
                        key={page}
                        questions={mapper.questions}
                        answers={mapper.answers}
                    >
                        <main className="min-h-screen bg-background pb-28 font-sans">
                            <QuestionsProgramsHeader path="/dashboard/batteries" />

                            <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                                <QuestionsProgramsHeaderInfo
                                    iconChildren={
                                        <HeartPulse className="hidden h-9 w-9 shrink-0 opacity-70 sm:block" />
                                    }
                                    category="Autorreporte de salud"
                                    description="Marca Sí o No según tu experiencia en los últimos meses. Tus respuestas son confidenciales."
                                    title="Morbilidad sentida"
                                />

                                <div className="mt-7 flex items-end justify-between gap-3">
                                    <div>
                                        <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                                            Preguntas
                                        </h2>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Selecciona una respuesta para cada
                                            afirmación.
                                        </p>
                                    </div>
                                    <CircleHelp
                                        className="mb-1 h-5 w-5 shrink-0 text-muted-foreground"
                                        aria-hidden="true"
                                    />
                                </div>
                                <Separator className="mt-4" />
                                <PaginationQuestionComponent
                                    maxPage={questionMorbidityResponse.max_page}
                                    maxAllowedPage={
                                        questionMorbidityResponse.max_allowed_page
                                    }
                                    page={page}
                                    onPageChange={handlePageChange}
                                />
                                <form noValidate>
                                    <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                        {mapper.questions.map((question) => (
                                            <QuestionsProgramsCards
                                                key={question.id}
                                                isDisabled={
                                                    questionMorbidityResponse.is_completed
                                                }
                                                question={question}
                                            />
                                        ))}
                                    </div>
                                    <QuestionsProgramsFooter
                                        isHidden={
                                            questionMorbidityResponse.is_completed
                                        }
                                        isTerminated={
                                            page ==
                                            questionMorbidityResponse.max_page.toString()
                                        }
                                        isSubmitting={isSubmitting}
                                        onSave={handleSave}
                                    />
                                </form>
                            </div>
                        </main>
                    </QuestionsProgramsProvider>
                );
            }}
        </QueryState>
    );
};

export default MorbidityPage;
