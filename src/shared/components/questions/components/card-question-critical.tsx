import { memo } from 'react';
import { Button } from '@/shared/components/ui/button';
import type { QuestionProgram } from '../constants/questions';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import { CheckCircle2, Flame } from 'lucide-react';
import { useQuestionsPrograms } from '../context/QuestionContext';
import { Checkbox } from '@/shared/components/ui/checkbox.tsx';

interface Props {
    isDisabled?: boolean;
    question: QuestionProgram;
}

export const QuestionsProgramsCardsCritical = memo(
    ({ question, isDisabled }: Props) => {
        const { answers, responseQuestion, setQuestionCritical } =
            useQuestionsPrograms();

        const currentAnswerRaw = answers[question.id];
        const selectedAnswer =
            typeof currentAnswerRaw === 'object' && currentAnswerRaw !== null
                ? currentAnswerRaw.value
                : currentAnswerRaw;

        const isCritical =
            typeof currentAnswerRaw === 'object' && currentAnswerRaw !== null
                ? !!currentAnswerRaw.isCritical
                : false;

        return (
            <Card className="border-border/70 shadow-sm">
                <CardHeader className="p-4 pb-3 sm:p-5 sm:pb-3">
                    <div className="flex items-start gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold bg-primary/10 text-primary">
                            {question.idQuestionShow
                                ? question.idQuestionShow
                                : question.id}
                        </span>
                        <CardTitle className="pt-0.5 text-sm font-semibold leading-relaxed">
                            {question.question}
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-1 sm:p-5 sm:pt-2">
                    <div
                        className="grid grid-cols-3 gap-2"
                        role="radiogroup"
                        aria-label={`Respuesta para la pregunta ${question.id}`}
                    >
                        {question.options.map((option) => {
                            const isSelected = selectedAnswer === option;
                            return (
                                <Button
                                    key={option}
                                    type="button"
                                    variant={
                                        isSelected
                                            ? option === 'No cumple'
                                                ? 'destructive'
                                                : 'default'
                                            : 'outline'
                                    }
                                    role="radio"
                                    aria-checked={isSelected}
                                    onClick={() =>
                                        responseQuestion(question.id, option)
                                    }
                                    disabled={isDisabled}
                                    className="h-auto min-h-10 whitespace-normal px-2 py-2.5 text-xs sm:text-sm gap-1.5"
                                >
                                    {isSelected ? (
                                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                                    ) : null}
                                    {option}
                                </Button>
                            );
                        })}
                    </div>
                    {selectedAnswer === 'No cumple' ? (
                        <label
                            htmlFor={`critico-${question.id}`}
                            className="mt-3 flex items-center gap-2.5 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm"
                        >
                            <Checkbox
                                id={`critico-${question.id}`}
                                checked={isCritical}
                                onCheckedChange={(checked) =>
                                    setQuestionCritical(
                                        question.id,
                                        checked === true,
                                    )
                                }
                            />
                            <span className="flex items-center gap-1.5 font-medium text-destructive">
                                <Flame className="h-3.5 w-3.5" />
                                Marcar como crítico
                            </span>
                            <span className="text-xs text-muted-foreground">
                                (opcional)
                            </span>
                        </label>
                    ) : null}
                </CardContent>
            </Card>
        );
    },
);

QuestionsProgramsCardsCritical.displayName = 'QuestionsProgramsCardsCritical';
