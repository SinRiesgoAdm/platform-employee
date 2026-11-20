import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth/store/auth-store.tsx';

interface LoginVariables {
    uid: string;
    enterpriseId: number;
}

export const useLoginEmployee = () => {
    const login = useAuthStore((state) => state.login);

    return useMutation({
        mutationFn: ({ uid, enterpriseId }: LoginVariables) =>
            login(uid, enterpriseId),
    });
};
