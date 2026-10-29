import { clientHttp } from '@/shared/api/client.ts';
import {
    PREVENTIVE_PROGRAM_SAVE_ENDPOINTS,
    type PreventiveProgramKey,
} from '@/features/preventive-programs/constants/programs.ts';
import type { PreventiveProgramSaveReq } from '@/features/preventive-programs/types/preventive-program-save-req.ts';

export const savePreventiveProgramAction = async (
    program: PreventiveProgramKey,
    request: PreventiveProgramSaveReq,
): Promise<void> => {
    await clientHttp.post(PREVENTIVE_PROGRAM_SAVE_ENDPOINTS[program], request);
};
