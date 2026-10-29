import { useQuery } from '@tanstack/react-query';
import { allInspectionsAction } from '@/features/inspections/actions/all-inspection-actions.ts';

export const useAllInspections = () => {
    return useQuery({
        queryKey: ['allInspections'],
        queryFn: allInspectionsAction,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
