import { clientHttp } from '@/shared/api/client.ts';
import type { QuestionMorbidityResponse } from '@/features/batteries/types/question-morbidity-res.ts';

export const getQuestionsMorbidityAction = async (
    page: string,
): Promise<QuestionMorbidityResponse> => {
    const { data } = await clientHttp.get<QuestionMorbidityResponse>(
        `/batteries/morbidity?page=${page}`,
    );
    return data;
};
