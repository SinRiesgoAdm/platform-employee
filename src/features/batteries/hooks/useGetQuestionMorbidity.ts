import { useQuery } from '@tanstack/react-query';
import { getQuestionsMorbidityAction } from '@/features/batteries/action/get-questions-morbidity-action.ts';

export const useGetQuestionMorbidity = (page: string) => {
    return useQuery({
        queryKey: [`get-questions-morbidity-page${page}`, page],
        queryFn: () => getQuestionsMorbidityAction(page),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
