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
                        className="grid grid-cols-2 gap-2"
                        role="radiogroup"
                        aria-label={`Respuesta para la pregunta ${question.id}`}
                    >
                        {question.options.map((option) => {
                            const isSelected = selectedAnswer === option;

                            return (
                                <Button
                                    key={option}
                                    type="button"
                                    variant={isSelected ? 'default' : 'outline'}
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
                </CardContent>
            </Card>
        );
    },
);

QuestionsProgramsCards.displayName = 'QuestionsProgramsCards';
