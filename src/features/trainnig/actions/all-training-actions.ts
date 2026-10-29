import { clientHttp } from '@/shared/api/client.ts';
import type { EmployeeTrainingResponse } from '@/features/trainnig/types/training-all-res.ts';

export const allTrainingActions = async (): Promise<
    EmployeeTrainingResponse[]
> => {
    const { data } =
        await clientHttp.get<EmployeeTrainingResponse[]>('/training/all');

    return data;
};
