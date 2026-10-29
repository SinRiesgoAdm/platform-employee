import { useMutation, useQueryClient } from '@tanstack/react-query';
import { savePreoperationalAction } from '@/features/preoperational/actions/save-preoperational-action.ts';
import { PREOPERATIONAL_QUERY_KEY } from '@/features/preoperational/constants/query-keys.ts';
import { useInvalidateCacheGenerals } from '@/shared/hooks/useInvalidateCacheGenerals.ts';

export const useSavePreoperational = () => {
    const queryClient = useQueryClient();
    const invalidateDashboard = useInvalidateCacheGenerals(
        'dashboardStatistics',
    );

    return useMutation({
        mutationFn: savePreoperationalAction,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: PREOPERATIONAL_QUERY_KEY,
            });
            invalidateDashboard();
        },
    });
};
