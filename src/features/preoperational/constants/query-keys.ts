export const PREOPERATIONAL_QUERY_KEY = ['preoperational'] as const;

export const preoperationalQueryKey = (date: string, vehicleId?: number) =>
    [...PREOPERATIONAL_QUERY_KEY, date, vehicleId ?? null] as const;
