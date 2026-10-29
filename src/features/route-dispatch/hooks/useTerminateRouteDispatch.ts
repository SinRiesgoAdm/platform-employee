import { useMutation, useQueryClient } from '@tanstack/react-query';
import { terminateRouteDispatchAction } from '@/features/route-dispatch/actions/terminate-route-dispatch-action.ts';
import { ROUTE_DISPATCH_QUERY_KEY } from '@/features/route-dispatch/constants/query-keys.ts';
import { useInvalidateCacheGenerals } from '@/shared/hooks/useInvalidateCacheGenerals.ts';

export const useTerminateRouteDispatch = () => {
    const queryClient = useQueryClient();
    const invalidateDashboard = useInvalidateCacheGenerals(
        'dashboardStatistics',
    );

    return useMutation({
        mutationFn: terminateRouteDispatchAction,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ROUTE_DISPATCH_QUERY_KEY,
            });
            invalidateDashboard();
        },
    });
};
