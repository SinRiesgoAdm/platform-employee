import { useEffect } from 'react';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Label } from '@/shared/components/ui/label.tsx';
import { Textarea } from '@/shared/components/ui/textarea.tsx';
import { useQuestionsPrograms } from '@/shared/components/questions/context/QuestionContext.tsx';
import type { InspectionFormValues } from '@/features/inspections/constants/form.ts';

interface Props {
    register: UseFormRegister<InspectionFormValues>;
    watch: UseFormWatch<InspectionFormValues>;
}

const OBSERVATIONS_QUESTION_ID = 'observations';

export const ObservationsField = ({ register, watch }: Props) => {
    const { hasNonCompliant, addQuestion, removeQuestion, responseQuestion } =
        useQuestionsPrograms();

    const observations = watch('observations') ?? '';
    const isMissing = hasNonCompliant && observations.trim() === '';

    useEffect(() => {
        if (!hasNonCompliant) {
            removeQuestion(OBSERVATIONS_QUESTION_ID);
            return;
        }

        addQuestion(OBSERVATIONS_QUESTION_ID);
        responseQuestion(OBSERVATIONS_QUESTION_ID, observations);
    }, [
        hasNonCompliant,
        observations,
        addQuestion,
        removeQuestion,
        responseQuestion,
    ]);

    return (
        <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="observaciones">
                Observaciones generales
                {hasNonCompliant ? (
                    <span className="ml-1 text-destructive">*</span>
                ) : null}
            </Label>
            <Textarea
                id="observaciones"
                rows={3}
                {...register('observations', {
                    required: hasNonCompliant
                        ? 'Las observaciones son obligatorias'
                        : false,
                })}
                aria-invalid={isMissing || undefined}
                placeholder="Describe hallazgos, novedades o acciones realizadas."
            />
        </div>
    );
};
