import { useQuery } from '@tanstack/react-query';
import { historyInspectionsAction } from '@/features/inspections/actions/history-inspections-actions.ts';

export const useHistoryInspections = (inspectionId: number) => {
    return useQuery({
        queryKey: ['historyInspections', inspectionId],
        queryFn: () => historyInspectionsAction(inspectionId),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
