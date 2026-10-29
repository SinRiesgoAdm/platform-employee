import { useMutation, useQueryClient } from '@tanstack/react-query';
import { savePreventiveProgramAction } from '@/features/preventive-programs/actions/save-preventive-program-action.ts';
import type { PreventiveProgramKey } from '@/features/preventive-programs/constants/programs.ts';
import { PREVENTIVE_VERIFY_QUERY_KEY } from '@/features/preventive-programs/constants/query-keys.ts';
import type { PreventiveProgramSaveReq } from '@/features/preventive-programs/types/preventive-program-save-req.ts';
import { useInvalidateCacheGenerals } from '@/shared/hooks/useInvalidateCacheGenerals.ts';

export const useSavePreventiveProgram = (program: PreventiveProgramKey) => {
    const queryClient = useQueryClient();
    const invalidateDashboard = useInvalidateCacheGenerals(
        'dashboardStatistics',
    );

    return useMutation({
        mutationFn: (request: PreventiveProgramSaveReq) =>
            savePreventiveProgramAction(program, request),
        onSuccess: () => {
            // Sin await: la página navega al dashboard sin esperar el refetch.
            queryClient.invalidateQueries({
                queryKey: PREVENTIVE_VERIFY_QUERY_KEY,
            });
            invalidateDashboard();
        },
    });
};
