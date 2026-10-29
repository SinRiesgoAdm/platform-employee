import { useQuery } from '@tanstack/react-query';
import { getExtendEmployeeAction } from '@/features/profile/actions/get-extend-employee.ts';

export const useProfileEmployeeExtend = () => {
    return useQuery({
        queryKey: ['employee-extends'],
        queryFn: getExtendEmployeeAction,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
