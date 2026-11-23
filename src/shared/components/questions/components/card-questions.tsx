import { memo } from 'react';
import { Button } from '@/shared/components/ui/button';
import type { QuestionProgram } from '../constants/questions';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useQuestionsPrograms } from '../context/QuestionContext';

interface Props {
    isDisabled?: boolean;
    question: QuestionProgram;
}

export const QuestionsProgramsCards = memo(
    ({ question, isDisabled }: Props) => {
        const { answers, responseQuestion } = useQuestionsPrograms();

        const selectedAnswer = answers[question.id];

        const isMultipleChoice = question.typeQuestion === 'multiple_choice';


        const answerOptions: [string, string][] = isMultipleChoice
            ? Object.entries(question.optionsMultiple ?? {})
            : question.options.map((option) => [option, option]);

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
                        className={`grid gap-2 ${
                            isMultipleChoice ? 'grid-cols-1' : 'grid-cols-2'
                        }`}
                        role="radiogroup"
                        aria-label={`Respuesta para la pregunta ${question.id}`}
                    >
                        {answerOptions.map(([key, option]) => {
                            const answerValue = isMultipleChoice ? key : option;

                            const isSelected = selectedAnswer === answerValue;

                            return (
                                <Button
                                    key={key}
                                    type="button"
                                    variant={isSelected ? 'default' : 'outline'}
                                    role="radio"
                                    aria-checked={isSelected}
                                    onClick={() =>
                                        responseQuestion(
                                            question.id,
                                            answerValue,
                                        )
                                    }
                                    disabled={isDisabled}
                                    className={`h-auto min-h-12 w-full whitespace-normal px-3 py-3 text-sm gap-2 ${
                                        isMultipleChoice
                                            ? 'justify-start text-left'
                                            : 'justify-center text-center'
                                    }`}
                                >
                                    {isSelected && (
                                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                                    )}

                                    <span className="break-words">
                                        {isMultipleChoice
                                            ? `${key.toUpperCase()}. ${option}`
                                            : option}
                                    </span>
                                </Button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        );
    },
);

QuestionsProgramsCards.displayName = 'QuestionsProgramsCards';
