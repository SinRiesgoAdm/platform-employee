import { useQuery } from '@tanstack/react-query';
import { verifyPreventiveProgramsAction } from '@/features/preventive-programs/actions/verify-preventive-programs-action.ts';
import { PREVENTIVE_VERIFY_QUERY_KEY } from '@/features/preventive-programs/constants/query-keys.ts';

export const useVerifyPreventivePrograms = () => {
    return useQuery({
        queryKey: PREVENTIVE_VERIFY_QUERY_KEY,
        queryFn: verifyPreventiveProgramsAction,
    });
};
