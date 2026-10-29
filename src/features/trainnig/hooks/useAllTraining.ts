import { useQuery } from '@tanstack/react-query';
import { allTrainingActions } from '@/features/trainnig/actions/all-training-actions.ts';

export const useAllTraining = () => {
    return useQuery({
        queryKey: ['allTraining'],
        queryFn: allTrainingActions,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
