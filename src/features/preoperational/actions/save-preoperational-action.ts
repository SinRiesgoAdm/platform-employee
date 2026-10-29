import { clientHttp } from '@/shared/api/client.ts';

import type { PreoperationalSaveRequest } from '@/features/preoperational/types/preoperational-save-req.ts';

export const savePreoperationalAction = async (
    request: PreoperationalSaveRequest,
): Promise<void> => {
    await clientHttp.post('/preoperational/save', request);
};
