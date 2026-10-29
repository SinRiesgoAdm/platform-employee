import { create } from 'zustand';
import { allTrainingActions } from '@/features/dashboard/actions/get-statistics-actions.ts';
import type { GetStatisticsResponse } from '@/features/dashboard/types/get-statistics-res.ts';

type DashboardStore = {
    pendingTrainingCount: number;
    pendingBatteriesCount: number;
    pendingRouteDispatch: number;
    pendingAdditionalDataCount: number;
    pendingMorbidityCount: number;
    pendingDocuments: number;
    pendingPreoperationalCount: number;

    // permissions
    canInspections: boolean;
    canPreoperational: boolean;

    getPendingTrainingCount: () => number;
    getPendingBatteriesCount: () => number;
    getPendingAdditionalDataCount: () => number;
    getPendingMorbidityCount: () => number;
    getPendingDocumentCount: () => number;
    getPendingPreoperationalCount: () => number;
    getPendingRouteDispatch: () => number;

    // getter permission
    getPermissionsCanInspections: () => boolean;
    getPermissionsCanPreoperational: () => boolean;

    getStatistics: () => Promise<GetStatisticsResponse | undefined>;
    getTotalBadges: () => number;
    getTotalBadgesBatteries: () => number;
};

export const useDashboardStore = create<DashboardStore>()((set, get) => ({
    pendingTrainingCount: 0,
    pendingBatteriesCount: 0,
    pendingRouteDispatch: 0,
    pendingAdditionalDataCount: 0,
    pendingMorbidityCount: 0,
    pendingPreoperationalCount: 0,
    pendingDocuments: 0,

    // permissions
    canInspections: false,
    canPreoperational: false,

    getPendingTrainingCount: () => get().pendingTrainingCount,
    getPendingBatteriesCount: () => get().pendingBatteriesCount,
    getPendingRouteDispatch: () => get().pendingRouteDispatch,
    getPendingAdditionalDataCount: () => get().pendingAdditionalDataCount,
    getPendingMorbidityCount: () => get().pendingMorbidityCount,
    getPendingPreoperationalCount: () => get().pendingPreoperationalCount,
    getPendingDocumentCount: () => get().pendingAdditionalDataCount,
    getPermissionsCanInspections: () => get().canInspections,
    getPermissionsCanPreoperational: () => get().canPreoperational,

    getStatistics: async (): Promise<GetStatisticsResponse> => {
        try {
            const data = await allTrainingActions();

            set({
                pendingTrainingCount: data.pendingTrainingCount,
                pendingBatteriesCount: data.pendingBatteriesCount,
                pendingRouteDispatch: data.pendingRouteDispatch,
                pendingAdditionalDataCount: data.pendingAdditionalDataCount,
                pendingMorbidityCount: data.pendingMorbidityCount,
                pendingDocuments: data.pendingDocuments,
                pendingPreoperationalCount: data.pendingPreoperationalCount,
                canInspections: data.permissions.canInspections,
                canPreoperational: data.permissions.canPreoperational,
            });

            return data;
        } catch (error) {
            console.error(error);
            set({
                pendingTrainingCount: 0,
                pendingBatteriesCount: 0,
                pendingRouteDispatch: 0,
                pendingAdditionalDataCount: 0,
                pendingDocuments: 0,
                pendingMorbidityCount: 0,
                pendingPreoperationalCount: 0,

                canInspections: false,
                canPreoperational: false,
            });
            throw error;
        }
    },
    getTotalBadges: () => {
        const {
            pendingTrainingCount,
            pendingBatteriesCount,
            pendingRouteDispatch,
            pendingDocuments,
            pendingPreoperationalCount,
        } = get();
        return (
            pendingTrainingCount +
            pendingBatteriesCount +
            pendingRouteDispatch +
            pendingDocuments +
            pendingPreoperationalCount
        );
    },
    getTotalBadgesBatteries: () => {
        const { pendingBatteriesCount } = get();
        return pendingBatteriesCount;
    },
}));
