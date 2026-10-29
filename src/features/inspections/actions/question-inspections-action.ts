import { clientHttp } from '@/shared/api/client.ts';

import type { QuestionProgram } from '@/shared/components/questions/constants/questions.ts';

export const questionInspectionsAction = async (
    typeMachine: string,
): Promise<QuestionProgram[]> => {
    const { data } = await clientHttp.get<QuestionProgram[]>(
        `/inspections/questions?typeMachine=${typeMachine}`,
    );

    return data;
};
