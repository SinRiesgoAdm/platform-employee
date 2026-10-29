import { useMutation, useQueryClient } from '@tanstack/react-query';
import { confirmRouteDispatchAction } from '@/features/route-dispatch/actions/confirm-route-dispatch-action.ts';
import { ROUTE_DISPATCH_QUERY_KEY } from '@/features/route-dispatch/constants/query-keys.ts';

export const useConfirmRouteDispatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: confirmRouteDispatchAction,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ROUTE_DISPATCH_QUERY_KEY,
            }),
    });
};
