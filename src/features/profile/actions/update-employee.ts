import type { EmployeeProfileResponse } from '@/features/profile/types/employee-profile-res.ts';
import { clientHttp } from '@/shared/api/client.ts';

export const UpdateEmployeeActions = async (
    payload: EmployeeProfileResponse,
): Promise<void> => {
    await clientHttp.put('/profile/save', payload);
};
