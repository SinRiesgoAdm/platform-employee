import { clientHttp } from '@/shared/api/client.ts';
import type { EmployeeProfileResponse } from '@/features/profile/types/employee-profile-res.ts';

export const getDetailProfileAction =
    async (): Promise<EmployeeProfileResponse> => {
        const { data } =
            await clientHttp.get<EmployeeProfileResponse>('/profile/detail');

        return data;
    };
