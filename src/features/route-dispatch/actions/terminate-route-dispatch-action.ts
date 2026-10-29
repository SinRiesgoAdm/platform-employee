import { clientHttp } from '@/shared/api/client.ts';

import type { TerminateDispatchRequest } from '@/features/route-dispatch/types/terminate-dispatch-req.ts';

interface TerminateRouteDispatchParams {
    routeId: number;
    request: TerminateDispatchRequest;
}

export const terminateRouteDispatchAction = async ({
    routeId,
    request,
}: TerminateRouteDispatchParams): Promise<void> => {
    await clientHttp.post(`/dispatch/terminate/${routeId}`, request);
};
