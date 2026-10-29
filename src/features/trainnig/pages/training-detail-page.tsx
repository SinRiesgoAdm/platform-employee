import {
    CircleHelp,
    Download,
    ExternalLink,
    FileText,
    GraduationCap,
    PlayCircle,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';

import { Separator } from '@/shared/components/ui/separator';
import { useParams, useLocation, useNavigate } from 'react-router';
import { QuestionsProgramsProvider } from '@/shared/components/questions/context/QuestionProvider.tsx';
import { QuestionsProgramsHeader } from '@/shared/components/questions/components/header-questions.tsx';
import { QuestionsProgramsHeaderInfo } from '@/shared/components/questions/components/header-info.tsx';
import { QuestionsProgramsCards } from '@/shared/components/questions/components/card-questions.tsx';
import { QuestionsProgramsFooter } from '@/shared/components/questions/components/footer-questions.tsx';
import { useState } from 'react';
import { clearUrlVideo } from '@/shared/utils/video.ts';
import { useQuestionTraining } from '@/features/trainnig/hooks/useQuestionTraining.ts';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';
import type { AnswersMap } from '@/shared/components/questions/context/QuestionContext.tsx';
import { convertToQuestionTrainning } from '@/features/trainnig/mappers/convert-to-question-trainning.ts';
import { saveQuestionTraining } from '@/features/trainnig/actions/save-question-training.ts';
import { useQueryClient } from '@tanstack/react-query';
import { useInvalidateCacheGenerals } from '@/shared/hooks/useInvalidateCacheGenerals.ts';

export const TrainingDetailPage = () => {
    const { trainingId } = useParams();
    const { state } = useLocation();
    const training = state?.training;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const questionTraining = useQuestionTraining(Number(trainingId));

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const invalidateDashboard = useInvalidateCacheGenerals(
        'dashboardStatistics',
    );

    const handleSave = async (answers: AnswersMap) => {
        const convertQuestions = convertToQuestionTrainning(
            Number(trainingId),
            answers,
        );
        setIsSubmitting(true);
        try {
            await saveQuestionTraining(convertQuestions);
            await queryClient.invalidateQueries({ queryKey: ['allTraining'] });
            invalidateDashboard();
            navigate('/trainnings');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <QueryState query={questionTraining}>
            {(questionTraining) => {
                return (
                    <QuestionsProgramsProvider questions={questionTraining}>
                        <main className="min-h-screen bg-background pb-28 font-sans">
                            <QuestionsProgramsHeader path="/trainnings" />

                            <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                                <QuestionsProgramsHeaderInfo
                                    iconChildren={
                                        <GraduationCap className="hidden h-9 w-9 shrink-0 opacity-70 sm:block" />
                                    }
                                    category={training.subcategory_name}
                                    description={`${training?.date_start} - ${training?.date_end}`}
                                    title={training.category_name}
                                />
                                <Card className="mt-6 border-border/70">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 font-display text-base">
                                            <FileText className="h-4 w-4 text-primary" />
                                            Material de lectura
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-muted/40 p-3">
                                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                                                <FileText className="h-5 w-5" />
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-foreground break-words whitespace-normal">
                                                    {training?.category_name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    PDF {training?.pdfPeso}
                                                </p>
                                            </div>
                                            <Button size="sm" variant="outline">
                                                <a
                                                    href={training?.coursedata}
                                                    download
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2"
                                                >
                                                    <Download className="h-4 w-4 shrink-0" />
                                                    Descargar
                                                </a>
                                            </Button>
                                        </div>
                                        <div className="overflow-hidden rounded-lg border border-border/70">
                                            <iframe
                                                src={training?.coursedata}
                                                title={`Documento ${training?.coursedata}`}
                                                className="h-[380px] w-full sm:h-[520px]"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                                {training?.videourls &&
                                    training.videourls.trim() !== '' && (
                                        <Card className="mt-4 border-border/70">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 font-display text-base">
                                                    <PlayCircle className="h-4 w-4 text-primary" />
                                                    Video de la capacitación
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="grid gap-3">
                                                <div className="overflow-hidden rounded-lg border border-border/70 bg-black">
                                                    <iframe
                                                        src={clearUrlVideo(
                                                            training?.videourls,
                                                        )}
                                                        title={
                                                            training?.videourls
                                                        }
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        loading="lazy"
                                                        className="aspect-video w-full"
                                                    />
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    <a
                                                        href={
                                                            training?.videourls
                                                        }
                                                        download
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-2"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                        Ver en Linea
                                                    </a>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    )}
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
                                <form noValidate>
                                    <div className="mt-4 grid gap-3 lg:grid-cols-2">
                                        {questionTraining.map((question) => (
                                            <QuestionsProgramsCards
                                                key={question.id}
                                                question={question}
                                            />
                                        ))}
                                    </div>
                                    <QuestionsProgramsFooter
                                        isSubmitting={isSubmitting}
                                        onSave={(answers) =>
                                            handleSave(answers)
                                        }
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
