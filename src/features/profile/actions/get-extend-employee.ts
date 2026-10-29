import { clientHttp } from '@/shared/api/client.ts';
import type { EmployeeExtendResponse } from '@/features/profile/types/employee-extend.ts';

export const getExtendEmployeeAction =
    async (): Promise<EmployeeExtendResponse> => {
        const { data } =
            await clientHttp.get<EmployeeExtendResponse>('/profile/extends');

        return data;
    };
