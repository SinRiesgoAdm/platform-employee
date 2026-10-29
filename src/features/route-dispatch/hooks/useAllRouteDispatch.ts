import { useQuery } from '@tanstack/react-query';
import { allRouteDispatchAction } from '@/features/route-dispatch/actions/all-route-dispatch-action.ts';
import { ROUTE_DISPATCH_QUERY_KEY } from '@/features/route-dispatch/constants/query-keys.ts';

export const useAllRouteDispatch = () => {
    return useQuery({
        queryKey: ROUTE_DISPATCH_QUERY_KEY,
        queryFn: allRouteDispatchAction,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
