import type { TrainingQuestionRequest } from '@/features/trainnig/types/training-question-req.ts';
import type { AnswersMap } from '@/shared/components/questions/context/QuestionContext.tsx';

export const convertToQuestionTrainning = (
    trainingId: number,
    answers: AnswersMap,
): TrainingQuestionRequest => {
    return {
        trainingId: trainingId,
        answersResponse: Object.entries(answers).map(([index, response]) => ({
            questionId: Number(index),
            response: response === 'Verdadero' ? 'Si' : 'No',
        })),
    };
};
