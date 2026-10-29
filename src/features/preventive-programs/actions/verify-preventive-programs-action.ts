import { clientHttp } from '@/shared/api/client.ts';
import { PREVENTIVE_VERIFY_ENDPOINT } from '@/features/preventive-programs/constants/programs.ts';
import type { PreventiveVerifyRes } from '@/features/preventive-programs/types/preventive-verify-res.ts';

export const verifyPreventiveProgramsAction =
    async (): Promise<PreventiveVerifyRes> => {
        const { data } = await clientHttp.get<PreventiveVerifyRes>(
            PREVENTIVE_VERIFY_ENDPOINT,
        );
        return data;
    };
