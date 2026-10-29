import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { QuestionProgram } from '../constants/questions';
import {
    QuestionsProgramsContext,
    type AnswerExplain,
    type AnswersMap,
} from '@/shared/components/questions/context/QuestionContext.tsx';

interface props {
    children: ReactNode;
    questions: QuestionProgram[];
    answers?: AnswersMap;
}

type QuestionId = number | string;

const NON_COMPLIANT_OPTION = 'No cumple';

const getAnswerValue = (
    answer: string | AnswerExplain | undefined,
): string | undefined =>
    typeof answer === 'object' && answer !== null ? answer.value : answer;

const isAnswered = (answer: string | AnswerExplain | undefined) => {
    const value = getAnswerValue(answer);
    return typeof value === 'string' && value.trim() !== '';
};

export const QuestionsProgramsProvider = (props: props) => {
    const [answers, setAnswers] = useState<AnswersMap>(props.answers ?? {});
    const [extraQuestions, setExtraQuestions] = useState<QuestionId[]>([]);

    const responseQuestion = useCallback(
        (questionId: QuestionId, selectedOption: string) => {
            setAnswers((prev) => {
                if (prev[questionId] === selectedOption) return prev;
                return { ...prev, [questionId]: selectedOption };
            });
        },
        [],
    );

    const setQuestionCritical = useCallback(
        (questionId: QuestionId, isCritical: boolean) => {
            setAnswers((prev) => {
                const currentAnswer = prev[questionId];

                if (currentAnswer === undefined) return prev;

                const currentValue = getAnswerValue(currentAnswer) ?? '';

                const currentCritical =
                    typeof currentAnswer === 'object' && currentAnswer !== null
                        ? currentAnswer.isCritical
                        : false;

                if (currentCritical === isCritical) return prev;

                return {
                    ...prev,
                    [questionId]: { value: currentValue, isCritical },
                };
            });
        },
        [],
    );

    const addQuestion = useCallback((questionId: QuestionId) => {
        setExtraQuestions((prev) =>
            prev.includes(questionId) ? prev : [...prev, questionId],
        );
    }, []);

    const removeQuestion = useCallback((questionId: QuestionId) => {
        setExtraQuestions((prev) => prev.filter((id) => id !== questionId));
        setAnswers((prev) => {
            if (!(questionId in prev)) return prev;
            const next = { ...prev };
            delete next[questionId];
            return next;
        });
    }, []);

    const baseAnswerIds = useMemo<QuestionId[]>(
        () => Object.keys(props.answers ?? {}),
        [props.answers],
    );

    const questionIds = useMemo<QuestionId[]>(
        () => [
            ...props.questions.map((question) => question.id),
            ...baseAnswerIds,
            ...extraQuestions,
        ],
        [props.questions, baseAnswerIds, extraQuestions],
    );

    const totalQuestion = questionIds.length;

    const totalQuestionResponse = useMemo(
        () => questionIds.filter((id) => isAnswered(answers[id])).length,
        [questionIds, answers],
    );

    const hasNonCompliant = useMemo(
        () =>
            props.questions.some(
                (question) =>
                    getAnswerValue(answers[question.id]) ===
                    NON_COMPLIANT_OPTION,
            ),
        [props.questions, answers],
    );

    const isComplete =
        totalQuestion > 0 && totalQuestionResponse === totalQuestion;

    const contextValue = useMemo(
        () => ({
            questions: props.questions,
            totalQuestion,
            totalQuestionResponse,
            answers,
            responseQuestion,
            setQuestionCritical,
            addQuestion,
            removeQuestion,
            hasNonCompliant,
            isComplete,
        }),
        [
            props.questions,
            totalQuestion,
            totalQuestionResponse,
            answers,
            responseQuestion,
            setQuestionCritical,
            addQuestion,
            removeQuestion,
            hasNonCompliant,
            isComplete,
        ],
    );

    return (
        <QuestionsProgramsContext.Provider value={contextValue}>
            {props.children}
        </QuestionsProgramsContext.Provider>
    );
};
