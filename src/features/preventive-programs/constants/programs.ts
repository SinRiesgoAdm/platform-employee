import type { PreventiveVerifyRes } from '@/features/preventive-programs/types/preventive-verify-res.ts';

export type PreventiveProgramKey =
    'alcohol-tolerance' | 'prevention' | 'protection-actor';

export const PREVENTIVE_PROGRAM_SAVE_ENDPOINTS: Record<
    PreventiveProgramKey,
    string
> = {
    'alcohol-tolerance': '/program-preventive/alcohol-tolerance/save',
    prevention: '/program-preventive/prevention/save',
    'protection-actor': '/program-preventive/protection-actor/save',
};

export const PREVENTIVE_VERIFY_ENDPOINT = '/program-preventive/verify';

export const PREVENTIVE_PROGRAM_VERIFY_FIELD: Record<
    PreventiveProgramKey,
    keyof PreventiveVerifyRes
> = {
    'alcohol-tolerance': 'alcoholydrogas',
    prevention: 'prevdistraccion',
    'protection-actor': 'protactoresvial',
};

export const PREVENTIVE_DASHBOARD_PATH = '/dashboard/preventive';
