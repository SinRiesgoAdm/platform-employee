export const ROUTE_DISPATCH_QUERY_KEY = ['route-dispatches'] as const;

export const routeDispatchDetailQueryKey = (routeId: number) =>
    [...ROUTE_DISPATCH_QUERY_KEY, 'detail', routeId] as const;
