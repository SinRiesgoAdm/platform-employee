import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SaveQuestionMorbidityActions } from '@/features/batteries/action/save-questions-morbidity.ts';
import type { QuestionMorbidityResponseReq } from '@/features/batteries/types/question-morbidity-req.ts';

export const useSaveQuestionsMorbidity = (page: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            questionMorbidityResponseReq: QuestionMorbidityResponseReq,
        ) => SaveQuestionMorbidityActions(questionMorbidityResponseReq),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [`get-questions-morbidity-page${page}`, page],
            });
        },
    });
};
