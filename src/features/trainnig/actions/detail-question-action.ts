import type { QuestionProgram } from '@/shared/components/questions/constants/questions.ts';
import { clientHttp } from '@/shared/api/client.ts';

export const DetailQuestionAction = async (
    trainingId: number,
): Promise<QuestionProgram[]> => {
    const { data } = await clientHttp.get<QuestionProgram[]>(
        `/training/detail/${trainingId}`,
    );

    return data;
};
