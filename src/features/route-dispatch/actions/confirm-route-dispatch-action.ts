import { clientHttp } from '@/shared/api/client.ts';

export const confirmRouteDispatchAction = async (
    routeId: number,
): Promise<void> => {
    await clientHttp.post(`/dispatch/confirm/${routeId}`);
};
