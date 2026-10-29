import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateEmployeeActions } from '@/features/profile/actions/update-employee.ts';
import { useAuthStore } from '@/features/auth/store/auth-store.tsx';

export const useUpdateProfileEmployee = () => {
    const queryClient = useQueryClient();
    const { updateName } = useAuthStore();

    return useMutation({
        mutationFn: UpdateEmployeeActions,
        onMutate: async (newProfileData) => {
            await queryClient.cancelQueries({ queryKey: ['employee-profile'] });

            const previousProfile = queryClient.getQueryData([
                'employee-profile',
            ]);

            queryClient.setQueryData(['employee-profile'], newProfileData);

            return { previousProfile };
        },
        onError: (_err, _newProfileData, context) => {
            if (context?.previousProfile) {
                queryClient.setQueryData(
                    ['employee-profile'],
                    context.previousProfile,
                );
            }
        },
        onSuccess: (_data, variables) => {
            updateName(variables.name);
        },
    });
};
