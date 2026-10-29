import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { EmployeeLoginResponse } from '@/features/auth/types/auth-res.ts';
import { loginAction } from '@/features/auth/action/login-action.ts';
import { PWA_PRIVATE_CACHES } from '@/shared/constants/pwa-caches.ts';
import { queryClient } from '@/shared/api/query-client.ts';
import { requestPersistentStorage } from '@/shared/pwa/persistent-storage.ts';

const clearPrivateCaches = async () => {
    if (!('caches' in window)) return;

    await Promise.all(PWA_PRIVATE_CACHES.map((name) => caches.delete(name)));
};

type AuthStatus = 'authenticated' | 'not authenticated' | 'checking';

type AuthStore = {
    // properties
    user: EmployeeLoginResponse | null;
    token: string | null;
    authStatus: AuthStatus;

    // getters
    getEmployeeName: () => string | null;
    getEmployeeUid: () => string | null;
    getEnterpriseName: () => string | null;
    getPositionName: () => string | null;
    getBranchName: () => string | null;
    getAvatar: () => string | null;
    isPevActive: () => boolean;
    isAuthenticated: () => boolean;

    // actions
    login: (nit: string) => Promise<boolean>;
    updateAvatar: (avatarUrl: string) => void;
    logout: () => void;
    updateName: (name: string) => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            // properties
            user: null,
            token: null,
            authStatus: 'checking',

            // getters
            getEmployeeName: () => get().user?.name ?? null,
            getEmployeeUid: () => get().user?.uid ?? null,
            getEnterpriseName: () => get().user?.enterpriseName ?? null,
            getPositionName: () => get().user?.positionName ?? null,
            getBranchName: () => get().user?.branchName ?? null,
            getAvatar: () => get().user?.avatar ?? null,
            isPevActive: () => get().user?.pev === 1,
            isAuthenticated: () => get().authStatus === 'authenticated',

            login: async (nit: string) => {
                const data = await loginAction(nit);

                set({
                    user: data,
                    token: data.token,
                    authStatus: 'authenticated',
                });

                // Ya hay datos del empleado que proteger
                void requestPersistentStorage();

                return true;
            },
            updateAvatar: (avatarUrl: string) => {
                console.log(avatarUrl);
                set((state) => ({
                    user: state.user
                        ? { ...state.user, avatar: avatarUrl }
                        : null,
                }));
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    authStatus: 'not authenticated',
                });

                queryClient.clear();
                void clearPrivateCaches();
            },
            updateName: (name: string) => {
                set((state) => ({
                    user: state.user ? { ...state.user, name } : null,
                }));
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.authStatus = state.token
                        ? 'authenticated'
                        : 'not authenticated';

                    // Sesión guardada: el empleado no vuelve a pasar por login
                    if (state.token) void requestPersistentStorage();
                }
            },
        },
    ),
);
