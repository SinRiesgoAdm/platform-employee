import type { QuestionMorbidityResponse } from '@/features/batteries/types/question-morbidity-res.ts';
import type { QuestionMorbidityResponseReq } from '@/features/batteries/types/question-morbidity-req.ts';
import type { AnswersMap } from '@/shared/components/questions/context/QuestionContext.tsx';

export interface QuestionProgram {
    id: number;
    question: string;
    options: string[];
}

export interface QuestionMapperResult {
    questions: QuestionProgram[];
    answers: AnswersMap;
}

export const convertToQuestionMapper = (
    response: QuestionMorbidityResponse,
): QuestionMapperResult => {
    const answers: AnswersMap = {};

    const questions = response.data.map((question) => {
        if (question.answered) {
            answers[question.index] =
                question.answer_value === '1' ? 'SI' : 'NO';
        }

        return {
            id: question.index,
            question: question.name,
            options: ['SI', 'NO'],
        };
    });

    return {
        questions,
        answers,
    };
};

export const convertToQuestionMapperSave = (
    testId: number,
    year: number,
    answers: AnswersMap,
): QuestionMorbidityResponseReq => {
    return {
        testId,
        year,
        answersResponse: Object.entries(answers).map(([index, response]) => ({
            index: Number(index),
            response: response === 'SI' ? 1 : 0,
        })),
    };
};
