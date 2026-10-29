import { clientHttp } from '@/shared/api/client.ts';
import type { GetStatisticsResponse } from '@/features/dashboard/types/get-statistics-res.ts';

export const allTrainingActions = async (): Promise<GetStatisticsResponse> => {
    const { data } =
        await clientHttp.get<GetStatisticsResponse>('profile/statistics');

    return data;
};
