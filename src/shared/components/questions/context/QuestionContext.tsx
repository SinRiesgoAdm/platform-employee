import { createContext, useContext } from 'react';

export type AnswerExplain = {
    value: string;
    isCritical?: boolean;
};

export type AnswersMap = Record<number | string, string | AnswerExplain>;

interface PreventiveProgramsContext {
    totalQuestion: number;
    totalQuestionResponse: number;
    answers: AnswersMap;
    responseQuestion: (
        questionId: number | string,
        selectedOption: string,
    ) => void;
    setQuestionCritical: (
        questionId: number | string,
        isCritical: boolean,
    ) => void;
    addQuestion: (questionId: number | string) => void;
    removeQuestion: (questionId: number | string) => void;
    hasNonCompliant: boolean;
    isComplete: boolean;
}

export const QuestionsProgramsContext = createContext(
    {} as PreventiveProgramsContext,
);

export const useQuestionsPrograms = () => {
    const context = useContext(QuestionsProgramsContext);
    if (!context) {
        throw new Error(
            'useQuestionsPrograms should be used within a QuestionsProgramsProvider',
        );
    }
    return context;
};
