import { createBrowserRouter } from 'react-router';

import {
    EmployeeLayout,
    AuthLayout,
    LoginPage,
    DashboardPage,
    AlcoholTolerancePage,
    PreventionDistractionPage,
    ProtectionRoadPage,
    ProfileEmployeePage,
    PreventiveDashboardPage,
    BatteriesDashboard,
    MorbidityPage,
    EmployeeExtendPage,
    TrainingPage,
    TrainingDetailPage,
    InspectionPage,
    InspectionDetailHistory,
    InspectionQuestionPage,
    RouteDispatchPage,
    RouteDispatchDetailPage,
    PreoperationalPage,
    ProfileDocumentsPage,
} from './lazy-router';
import {
    ProtectedRoute,
    PublicRoute,
} from '@/app/routers/protected-routes.tsx';
import {
    NotFoundPage,
    RouteErrorPage,
} from '@/app/routers/route-error-page.tsx';

export const IndexRouter = createBrowserRouter([
    {
        // Ruta raíz sin path: atrapa los errores de TODAS las rutas
        errorElement: <RouteErrorPage />,
        children: [
            {
                path: '/',
                element: (
                    <ProtectedRoute>
                        <EmployeeLayout />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <DashboardPage />,
                    },
                    {
                        path: 'dashboard/preventive',
                        element: <PreventiveDashboardPage />,
                    },
                    {
                        path: 'dashboard/batteries',
                        element: <BatteriesDashboard />,
                    },
                ],
            },
            {
                path: '/login',
                element: (
                    <PublicRoute>
                        <AuthLayout />
                    </PublicRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <LoginPage />,
                    },
                ],
            },
            {
                path: '/program-preventive/alcohol-tolerance',
                element: (
                    <ProtectedRoute>
                        <AlcoholTolerancePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/program-preventive/prevention',
                element: (
                    <ProtectedRoute>
                        <PreventionDistractionPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/program-preventive/protection-actor',
                element: (
                    <ProtectedRoute>
                        <ProtectionRoadPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/profile',
                element: (
                    <ProtectedRoute>
                        <ProfileEmployeePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/profile/extend',
                element: (
                    <ProtectedRoute>
                        <EmployeeExtendPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/profile/documents',
                element: (
                    <ProtectedRoute>
                        <ProfileDocumentsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/batteries/morbidity',
                element: (
                    <ProtectedRoute>
                        <MorbidityPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/trainnings',
                element: (
                    <ProtectedRoute>
                        <TrainingPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/trainnings/:trainingId',
                element: (
                    <ProtectedRoute>
                        <TrainingDetailPage />
                    </ProtectedRoute>
                ),
            },

            {
                path: '/inspections',
                element: (
                    <ProtectedRoute>
                        <InspectionPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/inspections/:inspectionId',
                element: (
                    <ProtectedRoute>
                        <InspectionDetailHistory />
                    </ProtectedRoute>
                ),
            },

            {
                path: '/inspections/create/:inspectionId/:typeInspection',
                element: (
                    <ProtectedRoute>
                        <InspectionQuestionPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/route-dispatch',
                element: (
                    <ProtectedRoute>
                        <RouteDispatchPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/route-dispatch/:routeId',
                element: (
                    <ProtectedRoute>
                        <RouteDispatchDetailPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/preoperational',
                element: (
                    <ProtectedRoute>
                        <PreoperationalPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);
