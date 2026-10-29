import { clientHttp } from '@/shared/api/client.ts';
import type { QuestionMorbidityResponseReq } from '@/features/batteries/types/question-morbidity-req.ts';

export const SaveQuestionMorbidityActions = async (
    payload: QuestionMorbidityResponseReq,
): Promise<void> => {
    await clientHttp.post('/batteries/morbidity/save', payload);
};
