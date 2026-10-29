import type {
    AnswerExplain,
    AnswersMap,
} from '@/shared/components/questions/context/QuestionContext.tsx';
import type {
    AnswerItem,
    InspectionSaveRequest,
} from '@/features/inspections/types/inspection-save-req.ts';

export interface InspectionQuestionPayload {
    inspectionId: number;
    activityDate: string;
    typeCheck: string;
    outService: string;
    observations: string;
    answers: AnswersMap;
}

const TYPE_CHECK_CODES: Record<string, number> = {
    preoperacional: 1,
    inspeccion: 2,
};

const OUT_SERVICE_CODES: Record<string, number> = {
    no: 0,
    si: 1,
};

const NON_COMPLIANT_ANSWER = 'no_cumple';

const ANSWER_CODES: Record<string, string> = {
    Cumple: 'cumple',
    'No cumple': NON_COMPLIANT_ANSWER,
    'No aplica': 'no_aplica',
};

const isAnswerExplain = (
    answer: string | AnswerExplain,
): answer is AnswerExplain => typeof answer === 'object' && answer !== null;

const isQuestionId = (questionId: string) =>
    questionId.trim() !== '' && Number.isInteger(Number(questionId));

export const convertToInspectionQuestionSave = (
    payload: InspectionQuestionPayload,
): InspectionSaveRequest => {
    const answers: AnswerItem[] = Object.entries(payload.answers)
        .filter(([questionId]) => isQuestionId(questionId))
        .map(([questionId, rawAnswer]) => {
            const value = isAnswerExplain(rawAnswer)
                ? rawAnswer.value
                : rawAnswer;
            const answer = ANSWER_CODES[value] ?? value;
            const isCritical =
                isAnswerExplain(rawAnswer) && rawAnswer.isCritical === true;

            return {
                idQuestion: Number(questionId),
                answer,
                critical: answer === NON_COMPLIANT_ANSWER && isCritical ? 1 : 0,
            };
        });

    return {
        inspectionId: payload.inspectionId,
        inspectionData: payload.activityDate,
        typeCheck: TYPE_CHECK_CODES[payload.typeCheck] ?? 0,
        inspectionObservation: payload.observations,
        isOutService: OUT_SERVICE_CODES[payload.outService] ?? 0,
        answers,
    };
};
