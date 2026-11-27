import { clientHttp } from '@/shared/api/client.ts';
import type { EmployeeEnterprise } from '@/features/auth/types/auth-res.ts';

/** Empresas activas a las que pertenece la cédula (paso previo al login). */
export const getEmployeeEnterprisesAction = async (
    uid: string,
): Promise<EmployeeEnterprise[]> => {
    const { data } = await clientHttp.post<EmployeeEnterprise[]>(
        '/auth/enterprises',
        { uid },
    );
    return data;
};
