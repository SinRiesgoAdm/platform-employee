import type { PropsWithChildren } from 'react';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { Navigate, useLocation } from 'react-router';
import { useReturnTo } from '@/shared/hooks/useReturnTo.ts';

export const PublicRoute = ({ children }: PropsWithChildren) => {
    const { authStatus } = useAuthStore();
    const returnTo = useReturnTo();

    if (authStatus === 'checking') {
        return null;
    }

    if (authStatus === 'authenticated') {
        return <Navigate to={returnTo} replace />;
    }

    return <>{children}</>;
};

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { authStatus } = useAuthStore();
    const location = useLocation();

    if (authStatus === 'checking') {
        return null;
    }

    if (authStatus !== 'authenticated') {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <>{children}</>;
};
