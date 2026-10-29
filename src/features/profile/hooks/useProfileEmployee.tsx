import { useQuery } from '@tanstack/react-query';
import { getDetailProfileAction } from '@/features/profile/actions/get-detail-profile-action.ts';

export const useProfileEmployee = () => {
    return useQuery({
        queryKey: ['employee-profile'],
        queryFn: getDetailProfileAction,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
