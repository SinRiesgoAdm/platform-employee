import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateEmployeeExtends } from '@/features/profile/actions/update-employee-extends.ts';

export const useUpdateEmployeeExtends = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: UpdateEmployeeExtends,
        onMutate: async (newEmployeeExtendsData) => {
            await queryClient.cancelQueries({ queryKey: ['employee-extends'] });

            const previousProfile = queryClient.getQueryData([
                'employee-extends',
            ]);

            queryClient.setQueryData(
                ['employee-extends'],
                newEmployeeExtendsData,
            );

            return { previousProfile };
        },
        onError: (_err, _newEmployeeExtendsData, context) => {
            if (context?.previousProfile) {
                queryClient.setQueryData(
                    ['employee-extends'],
                    context.previousProfile,
                );
            }
        },
    });
};
