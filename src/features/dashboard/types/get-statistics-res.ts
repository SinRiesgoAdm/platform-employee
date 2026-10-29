export interface GetStatisticsResponse {
    pendingTrainingCount: number;
    pendingBatteriesCount: number;
    pendingRouteDispatch: number;
    pendingAdditionalDataCount: number;
    pendingDocuments: number;
    pendingMorbidityCount: number;
    pendingPreoperationalCount: number;
    permissions: PermissionsResponse;
}

export interface PermissionsResponse {
    canInspections: boolean;
    canPreoperational: boolean;
}
