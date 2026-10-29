import { useQuery } from '@tanstack/react-query';
import { questionInspectionsAction } from '@/features/inspections/actions/question-inspections-action.ts';

export const useQuestionInspection = (typeMachine: string) => {
    return useQuery({
        queryKey: ['question-inspections', typeMachine],
        queryFn: () => questionInspectionsAction(typeMachine),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
