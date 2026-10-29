import { clientHttp } from '@/shared/api/client.ts';

import type { RouteDetailResponse } from '@/features/route-dispatch/types/route-detail-res.ts';

export const detailRouteDispatchAction = async (
    routeId: number,
): Promise<RouteDetailResponse> => {
    const { data } = await clientHttp.get<RouteDetailResponse>(
        `/dispatch/detail/${routeId}`,
    );

    return data;
};
