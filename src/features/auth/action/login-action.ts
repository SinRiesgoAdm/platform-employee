import { clientHttp } from '@/shared/api/client.ts';
import type { EmployeeLoginResponse } from '@/features/auth/types/auth-res.ts';

export const loginAction = async (
    uid: string,
    enterpriseId: number,
): Promise<EmployeeLoginResponse> => {
    const { data } = await clientHttp.post<EmployeeLoginResponse>(
        '/auth/login',
        {
            uid,
            enterpriseId,
            password: 'no-validate-password',
        },
    );
    return data;
};
