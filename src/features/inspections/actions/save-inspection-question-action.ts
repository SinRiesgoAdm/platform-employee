import { clientHttp } from '@/shared/api/client.ts';

import type { InspectionSaveRequest } from '@/features/inspections/types/inspection-save-req.ts';

export const saveInspectionQuestionAction = async (
    request: InspectionSaveRequest,
): Promise<void> => {
    await clientHttp.post('/inspections/questions/save', request);
};
