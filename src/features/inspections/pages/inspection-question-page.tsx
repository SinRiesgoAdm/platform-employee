import { CircleHelp, GraduationCap } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';

import { Separator } from '@/shared/components/ui/separator';
import { useNavigate, useParams } from 'react-router';
import { QuestionsProgramsProvider } from '@/shared/components/questions/context/QuestionProvider.tsx';
import { QuestionsProgramsHeader } from '@/shared/components/questions/components/header-questions.tsx';
import { QuestionsProgramsHeaderInfo } from '@/shared/components/questions/components/header-info.tsx';
import { QuestionsProgramsFooter } from '@/shared/components/questions/components/footer-questions.tsx';
import { useEffect, useState } from 'react';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';
import type { AnswersMap } from '@/shared/components/questions/context/QuestionContext.tsx';
import { useQuestionsPrograms } from '@/shared/components/questions/context/QuestionContext.tsx';

import { useQuestionInspection } from '@/features/inspections/hooks/useQuestionInspection.ts';
import { QuestionsProgramsCardsCritical } from '@/shared/components/questions/components/card-question-critical.tsx';
import { Label } from '@/shared/components/ui/label.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { FormSelect } from '@/shared/components/custom/select.tsx';
import { useForm, useWatch, type UseFormWatch } from 'react-hook-form';
import {
    ADD_ANSWERS_MAP,
    OUT_SERVICE_OPTIONS,
    TYPE_CHECK_OPTIONS,
    type InspectionFormValues,
} from '@/features/inspections/constants/form.ts';
import { ObservationsField } from '@/features/inspections/components/observations-field.tsx';
import { convertToInspectionQuestionSave } from '@/features/inspections/mappers/convert-to-inspection-question-save.ts';
import { saveInspectionQuestionAction } from '@/features/inspections/actions/save-inspection-question-action.ts';
import { useInvalidateCacheGenerals } from '@/shared/hooks/useInvalidateCacheGenerals.ts';

const FormAnswersSync = ({
    watch,
}: {
    watch: UseFormWatch<InspectionFormValues>;
}) => {
    const { responseQuestion } = useQuestionsPrograms();

    useEffect(() => {
        const subscription = watch((values, { name }) => {
            if (name !== 'typeCheck' && name !== 'outService') return;
            responseQuestion(name, String(values[name] ?? ''));
        });

        return () => subscription.unsubscribe();
    }, [watch, responseQuestion]);

    return null;
};

export const InspectionQuestionPage = () => {
    const { typeInspection, inspectionId } = useParams();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const questionInspection = useQuestionInspection(typeInspection ?? '');

    const invalidateCacheGenerals =
        useInvalidateCacheGenerals('historyInspections');

    const handleSave = async (
        formData: InspectionFormValues,
        answers: AnswersMap,
    ) => {
        const formComplete =
            formData.activityDate.trim() !== '' &&
            formData.typeCheck.trim() !== '' &&
            formData.outService.trim() !== '';

        if (!formComplete) {
            console.warn('Formulario incompleto', formData);
            return;
        }

        setIsSubmitting(true);
        try {
            const request = convertToInspectionQuestionSave({
                inspectionId: Number(inspectionId),
                activityDate: formData.activityDate,
                typeCheck: formData.typeCheck,
                outService: formData.outService,
                observations: formData.observations,
                answers,
            });

            await saveInspectionQuestionAction(request);
            invalidateCacheGenerals(Number(inspectionId));
            navigate(`/inspections/${inspectionId}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const now = new Date().toISOString();
    const today = now.split('T')[0];
    const activityDateTime = now.slice(0, 19);

    const form = useForm<InspectionFormValues>({
        defaultValues: {
            activityDate: activityDateTime,
            typeCheck: '',
            outService: '',
            observations: '',
        },
    });

    const { register, control, watch, handleSubmit } = form;
    const outService = useWatch({ control, name: 'outService' });

    return (
        <QueryState query={questionInspection}>
            {(questionInspection) => {
                return (
                    <QuestionsProgramsProvider
                        questions={questionInspection}
                        answers={ADD_ANSWERS_MAP}
                    >
                        <FormAnswersSync watch={watch} />
                        <main className="min-h-screen bg-background pb-28 font-sans">
                            <QuestionsProgramsHeader
                                path={`/inspections/${inspectionId}`}
                            />

                            <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                                <QuestionsProgramsHeaderInfo
                                    iconChildren={
                                        <GraduationCap className="hidden h-9 w-9 shrink-0 opacity-70 sm:block" />
                                    }
                                    category={typeInspection}
                                    description="Responde cada punto con Cumple, No cumple o No aplica. Si algo no cumple, puedes marcarlo como crítico."
                                    title="Inspección y preoperacional SST"
                                />

                                <Card className="mt-6 border-border/70 shadow-sm">
                                    <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
                                        <CardTitle className="font-display text-base font-semibold tracking-tight">
                                            Datos de la revisión
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4 p-4 pt-2 sm:grid-cols-2 sm:p-5 sm:pt-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="fecha">
                                                Fecha de actividad
                                            </Label>
                                            <Input
                                                id="fecha"
                                                type="date"
                                                value={today}
                                                disabled
                                                readOnly
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="tipo">
                                                Tipo de chequeo
                                            </Label>
                                            <FormSelect
                                                name="typeCheck"
                                                control={control}
                                                label=""
                                                options={TYPE_CHECK_OPTIONS}
                                                rules={{
                                                    required:
                                                        'El tipo de chequeo es obligatorio',
                                                }}
                                            />
                                        </div>

                                        <div className="grid gap-2 sm:col-span-2">
                                            <Label htmlFor="fuera-servicio">
                                                ¿El equipo está fuera de
                                                servicio?
                                            </Label>
                                            <FormSelect
                                                name="outService"
                                                control={control}
                                                label=""
                                                options={OUT_SERVICE_OPTIONS}
                                                rules={{
                                                    required:
                                                        'fuera de servicio es obligatorio',
                                                }}
                                            />

                                            {outService === 'si' ? (
                                                <p className="text-xs font-medium text-destructive">
                                                    El equipo quedará bloqueado
                                                    y rotulado hasta su
                                                    reparación.
                                                </p>
                                            ) : (
                                                <p className="text-xs text-muted-foreground">
                                                    El equipo puede operar
                                                    normalmente.
                                                </p>
                                            )}
                                        </div>

                                        <ObservationsField
                                            register={register}
                                            watch={watch}
                                        />
                                    </CardContent>
                                </Card>

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
                                        {questionInspection.map((question) => (
                                            <QuestionsProgramsCardsCritical
                                                key={question.id}
                                                question={question}
                                            />
                                        ))}
                                    </div>
                                    <QuestionsProgramsFooter
                                        isSubmitting={isSubmitting}
                                        onSave={(answers) =>
                                            handleSubmit((formData) =>
                                                handleSave(formData, answers),
                                            )()
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
