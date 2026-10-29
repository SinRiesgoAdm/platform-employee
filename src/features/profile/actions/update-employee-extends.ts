import { clientHttp } from '@/shared/api/client.ts';
import type { EmployeeExtendResponse } from '@/features/profile/types/employee-extend.ts';

export const UpdateEmployeeExtends = async (
    payload: EmployeeExtendResponse,
): Promise<void> => {
    console.log(payload);

    payload.dependency = payload.dependency.toString();
    payload.stratum = payload.stratum.toString();
    payload.time = payload.time?.toString() || null;
    payload.time_2 = payload.time_2?.toString() || null;

    await clientHttp.post('/profile/extends/save', payload);
};
