import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateCacheGenerals = (key: string) => {
    const queryClient = useQueryClient();
    return (dynamicParam?: string | number) => {
        const queryKey =
            dynamicParam !== undefined ? [key, dynamicParam] : [key];
        queryClient.invalidateQueries({ queryKey });
    };
};
