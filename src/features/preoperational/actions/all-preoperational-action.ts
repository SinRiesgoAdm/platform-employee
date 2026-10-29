import { clientHttp } from '@/shared/api/client.ts';
import type { ApiErrorResponse } from '@/shared/api/dto.ts';

import { RESOURCES_EXISTS_CODE } from '@/features/preoperational/constants/status.ts';
import type {
    PreoperationalApiResponse,
    PreoperationalResult,
} from '@/features/preoperational/types/preoperational-res.ts';

interface AllPreoperationalParams {
    date: string;
    vehicleId?: number;
}

const isResourceExists = (
    data: PreoperationalApiResponse | ApiErrorResponse,
): data is ApiErrorResponse =>
    'code' in data && data.code === RESOURCES_EXISTS_CODE;

export const allPreoperationalAction = async ({
    date,
    vehicleId,
}: AllPreoperationalParams): Promise<PreoperationalResult> => {
    const { data } = await clientHttp.get<
        PreoperationalApiResponse | ApiErrorResponse
    >('/preoperational/all', {
        params: { date, vehicle_id: vehicleId },
    });

    if (isResourceExists(data)) {
        return { kind: 'exists', message: data.message };
    }

    return { kind: 'available', data };
};
