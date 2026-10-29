import { RouterProvider } from 'react-router';
import { IndexRouter } from '@/app/routers/index-router.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/api/query-client.ts';
import { Toaster } from '@/shared/components/ui/sonner.tsx';
import { Suspense, type PropsWithChildren } from 'react';
import { useDashboardStore } from '@/features/dashboard/store/dashboard-store.ts';
import { useAuthStore } from '@/features/auth/store/auth-store.tsx';
import LoadingPage from '@/shared/components/custom/loading.tsx';
import { PwaUpdatePrompt } from '@/shared/components/custom/pwa-update-prompt.tsx';
import { PwaInstallPrompt } from '@/shared/components/custom/pwa-install-prompt.tsx';
import { OfflineBanner } from '@/shared/components/custom/offline-banner.tsx';
import { PushNotificationsBridge } from '@/features/notifications/components/push-notifications-bridge.tsx';
import { PushPermissionPrompt } from '@/features/notifications/components/push-permission-prompt.tsx';

const CheckStatistics = ({ children }: PropsWithChildren) => {
    const dashboardStore = useDashboardStore();
    const authStore = useAuthStore();

    const isAuthenticated = Boolean(
        authStore.getEnterpriseName() &&
        authStore.getPositionName() &&
        authStore.getEmployeeUid(),
    );

    useQuery({
        retry: false,
        queryKey: ['dashboardStatistics'],
        queryFn: dashboardStore.getStatistics,
        enabled: isAuthenticated,
    });

    return children;
};

const EmployeeApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CheckStatistics>
                <OfflineBanner />
                <Suspense fallback={<LoadingPage />}>
                    <RouterProvider router={IndexRouter} />
                </Suspense>
                <ReactQueryDevtools initialIsOpen={false} />
            </CheckStatistics>

            <Toaster richColors position="bottom-center" />
            <PwaUpdatePrompt />
            <PwaInstallPrompt />
            <PushNotificationsBridge />
            <PushPermissionPrompt />
        </QueryClientProvider>
    );
};

export default EmployeeApp;
