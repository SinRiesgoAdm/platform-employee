import { clientHttp } from '@/shared/api/client.ts';

import { convertToRouteDispatch } from '@/features/route-dispatch/mappers/convert-to-route-dispatch.ts';
import type {
    RouteDispatchApiResponse,
    RouteDispatchResponse,
} from '@/features/route-dispatch/types/route-dispatch-res.ts';

export const allRouteDispatchAction = async (): Promise<
    RouteDispatchResponse[]
> => {
    const { data } =
        await clientHttp.get<RouteDispatchApiResponse[]>('/dispatch/all');

    return data.map(convertToRouteDispatch);
};
