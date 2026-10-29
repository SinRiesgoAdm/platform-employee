import { useQuery } from '@tanstack/react-query';
import { allPreoperationalAction } from '@/features/preoperational/actions/all-preoperational-action.ts';
import { preoperationalQueryKey } from '@/features/preoperational/constants/query-keys.ts';

export const useAllPreoperational = (date: string, vehicleId?: number) => {
    return useQuery({
        queryKey: preoperationalQueryKey(date, vehicleId),
        queryFn: () => allPreoperationalAction({ date, vehicleId }),
        enabled: date !== '',
    });
};
