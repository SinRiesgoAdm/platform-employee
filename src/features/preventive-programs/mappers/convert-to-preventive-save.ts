import type { QuestionProgram } from '@/shared/components/questions/constants/questions.ts';
import type { AnswersMap } from '@/shared/components/questions/context/QuestionContext.tsx';
import type { PreventiveProgramSaveReq } from '@/features/preventive-programs/types/preventive-program-save-req.ts';

export const convertToPreventiveSave = (
    questions: QuestionProgram[],
    answers: AnswersMap,
): PreventiveProgramSaveReq => ({
    questions: questions.flatMap((question) => {
        const answer = answers[question.id];
        const response = typeof answer === 'object' ? answer.value : answer;
        return response ? [{ id: question.id, response }] : [];
    }),
});
