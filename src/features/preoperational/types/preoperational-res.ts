export interface PreoperationalVehicle {
    plate: string;
    id: number;
    type_vehicle: string;
}

export interface PreoperationalApiResponse {
    vehicle_selected: PreoperationalVehicle | null;
    vehicle_type: string | null;
    vehicles: PreoperationalVehicle[];
}

export type PreoperationalResult =
    | { kind: 'exists'; message: string }
    | { kind: 'available'; data: PreoperationalApiResponse };
