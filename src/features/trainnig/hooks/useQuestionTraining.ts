import { useQuery } from '@tanstack/react-query';
import { DetailQuestionAction } from '@/features/trainnig/actions/detail-question-action.ts';

export const useQuestionTraining = (trainingId: number) => {
    return useQuery({
        queryKey: ['question-training', trainingId],
        queryFn: () => DetailQuestionAction(trainingId),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
