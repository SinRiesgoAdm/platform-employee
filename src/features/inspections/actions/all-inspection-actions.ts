import { clientHttp } from '@/shared/api/client.ts';

import type { InspectionsResponse } from '@/features/inspections/types/inspection-all-res.ts';

export const allInspectionsAction = async (): Promise<
    InspectionsResponse[]
> => {
    const { data } =
        await clientHttp.get<InspectionsResponse[]>('/inspections/all');

    return data;
};
