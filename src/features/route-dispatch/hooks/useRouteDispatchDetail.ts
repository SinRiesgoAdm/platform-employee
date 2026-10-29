import { useQuery } from '@tanstack/react-query';
import { detailRouteDispatchAction } from '@/features/route-dispatch/actions/detail-route-dispatch-action.ts';
import { routeDispatchDetailQueryKey } from '@/features/route-dispatch/constants/query-keys.ts';

export const useRouteDispatchDetail = (routeId: number) => {
    return useQuery({
        queryKey: routeDispatchDetailQueryKey(routeId),
        queryFn: () => detailRouteDispatchAction(routeId),
        enabled: routeId > 0,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
