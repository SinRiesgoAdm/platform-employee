export interface InspectionsHistoryResponse {
    is_enabled: boolean;
    machine: MachineHistoryCurrent;
    history: InspectionHistoryResponse[];
}

export interface MachineHistoryCurrent {
    id: number;
    name: string;
    code: string;
    brand: string;
    typemachine: string;
    inspectypreopCount: number;
}

export interface InspectionHistoryResponse {
    id: number;
    date: string;
    typeCheck: string;
    observations: string;
    outOfService: string;
    employeeName: string;
}
