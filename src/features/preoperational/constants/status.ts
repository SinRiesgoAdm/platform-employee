export const PREOPERATIONAL_STATUS = {
    good: 1,
    bad: 2,
    notApply: 3,
} as const;

export type PreoperationalStatus =
    (typeof PREOPERATIONAL_STATUS)[keyof typeof PREOPERATIONAL_STATUS];

export const PREOPERATIONAL_STATUS_OPTIONS: {
    value: PreoperationalStatus;
    label: string;
}[] = [
    { value: PREOPERATIONAL_STATUS.good, label: 'Bueno' },
    { value: PREOPERATIONAL_STATUS.bad, label: 'Malo' },
    { value: PREOPERATIONAL_STATUS.notApply, label: 'N/A' },
];

export const PREOPERATIONAL_DEFAULT_QUANTITY = '1';

export const RESOURCES_EXISTS_CODE = 'RESOURCES_EXISTS';
