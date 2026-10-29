import { lazy } from 'react';

// Layouts
export const EmployeeLayout = lazy(
    () => import('@/app/layouts/employee-layout'),
);
export const AuthLayout = lazy(() => import('@/app/layouts/auth-layout'));

// Páginas con export default
export const DashboardPage = lazy(
    () => import('@/features/dashboard/pages/dashboard-page.tsx'),
);
export const PreventiveDashboardPage = lazy(
    () =>
        import('@/features/preventive-programs/pages/preventive-dashboard.tsx'),
);
export const AlcoholTolerancePage = lazy(
    () => import('@/features/preventive-programs/pages/alcohol-tolerance'),
);
export const PreventionDistractionPage = lazy(
    () => import('@/features/preventive-programs/pages/prevention-distration'),
);
export const ProtectionRoadPage = lazy(
    () => import('@/features/preventive-programs/pages/protection-road-user'),
);
export const ProfileEmployeePage = lazy(
    () => import('@/features/profile/pages/employee.tsx'),
);
export const EmployeeExtendPage = lazy(
    () => import('@/features/profile/pages/employee-socio-page.tsx'),
);
export const MorbidityPage = lazy(
    () => import('@/features/batteries/pages/morbidity-page.tsx'),
);

// Páginas con export nombrado
export const LoginPage = lazy(() =>
    import('@/features/auth/pages/login-page.tsx').then((m) => ({
        default: m.LoginPage,
    })),
);
export const BatteriesDashboard = lazy(() =>
    import('@/features/batteries/pages/batteries-dashboard.tsx').then((m) => ({
        default: m.BatteriesDashboard,
    })),
);
export const ProfileDocumentsPage = lazy(() =>
    import('@/features/profile/pages/profile-documents-page.tsx').then((m) => ({
        default: m.ProfileDocumentsPage,
    })),
);
export const TrainingPage = lazy(() =>
    import('@/features/trainnig/pages/trainning-page.tsx').then((m) => ({
        default: m.TrainingPage,
    })),
);
export const TrainingDetailPage = lazy(() =>
    import('@/features/trainnig/pages/training-detail-page.tsx').then((m) => ({
        default: m.TrainingDetailPage,
    })),
);
export const InspectionPage = lazy(() =>
    import('@/features/inspections/pages/inspection-page.tsx').then((m) => ({
        default: m.InspectionPage,
    })),
);
export const InspectionDetailHistory = lazy(() =>
    import('@/features/inspections/pages/inspection-detail-page.tsx').then(
        (m) => ({ default: m.InspectionDetailHistory }),
    ),
);
export const InspectionQuestionPage = lazy(() =>
    import('@/features/inspections/pages/inspection-question-page.tsx').then(
        (m) => ({ default: m.InspectionQuestionPage }),
    ),
);
export const RouteDispatchPage = lazy(() =>
    import('@/features/route-dispatch/pages/route-dispatch-page.tsx').then(
        (m) => ({ default: m.RouteDispatchPage }),
    ),
);
export const RouteDispatchDetailPage = lazy(() =>
    import('@/features/route-dispatch/pages/route-dispatch-detail-page.tsx').then(
        (m) => ({ default: m.RouteDispatchDetailPage }),
    ),
);
export const PreoperationalPage = lazy(() =>
    import('@/features/preoperational/pages/preoperational-page.tsx').then(
        (m) => ({ default: m.PreoperationalPage }),
    ),
);
