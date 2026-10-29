import { clientHttp } from '@/shared/api/client.ts';

import type { InspectionsHistoryResponse } from '@/features/inspections/types/inspections-history-res.ts';

export const historyInspectionsAction = async (
    inspectionId: number,
): Promise<InspectionsHistoryResponse> => {
    const { data } = await clientHttp.get<InspectionsHistoryResponse>(
        `/inspections/history/${inspectionId}`,
    );

    return data;
};
