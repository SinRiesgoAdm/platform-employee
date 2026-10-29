import {
    LEVEL_EDUCATION_MAP,
    LICENSE_TYPE_MAP,
    ROLE_VIAL_MAP,
    SEX_MAP,
    TYPE_CONTRACTS_MAP,
    VEHICLE_ROLE_MAP,
    VEHICLE_TYPES_MAP,
    WORKING_DAY_MAP,
    ZONE_MAP,
} from '../constant/profiles';

export interface EmployeeProfileResponse {
    uid: string;
    name: string;
    email: string;
    address: string;
    mobile: string;
    positionName: string;
    employeeLocation: string;
    zone: string;
    arlName: string;
    epsName: string;
    fpName: string;
    contractType: number;
    branchName: string;
    startdate: string;
    workday: string;
    horary: string;
    riskLevel: number;
    gender: number;
    birthday: string;
    educationLevel: number;
    ocupation: string;
    estadoCivil: string;
    areaTemp: string;
    salario: string;
    temporalTemp: string;
    branchLocation: string;
    finalContract: string;
    roleVial: string;
    licenceCategory: string;
    typeVehicle: string;
    typeDisplacement: string;
    licenceVenc: string;
}

export const getEducationLevelLabel = (level?: number): string => {
    if (level === undefined || level === null) return 'No definido';
    return (
        LEVEL_EDUCATION_MAP[level as keyof typeof LEVEL_EDUCATION_MAP] ??
        'No definido'
    );
};

export const getZone = (zone?: string): string => {
    if (zone === undefined || zone === null) return 'No definido';
    return ZONE_MAP[zone as keyof typeof ZONE_MAP] ?? 'No definido';
};

export const getContract = (contract?: number): string => {
    if (contract === undefined || contract === null) return 'No definido';
    return (
        TYPE_CONTRACTS_MAP[contract as keyof typeof TYPE_CONTRACTS_MAP] ??
        'No definido'
    );
};

export const getWorkDay = (workDay?: string): string => {
    if (workDay === undefined || workDay === null) return 'No definido';
    return (
        WORKING_DAY_MAP[Number(workDay) as keyof typeof WORKING_DAY_MAP] ??
        'No definido'
    );
};

export const getRoleVial = (role?: string): string => {
    if (role === undefined || role === null) return 'No Aplica';
    return ROLE_VIAL_MAP[role as keyof typeof ROLE_VIAL_MAP] ?? 'No Aplica';
};

export const getLicenseCategory = (license?: string): string => {
    if (license === undefined || license === null) return 'No Aplica';
    return (
        LICENSE_TYPE_MAP[license as keyof typeof LICENSE_TYPE_MAP] ??
        'No Aplica'
    );
};

export const getTypeVehicle = (type?: string): string => {
    if (type === undefined || type === null) return 'No Aplica';
    return (
        VEHICLE_TYPES_MAP[type as keyof typeof VEHICLE_TYPES_MAP] ?? 'No Aplica'
    );
};

export const getTypeDisplacement = (type?: string): string => {
    if (type === undefined || type === null) return 'No Aplica';
    return (
        VEHICLE_ROLE_MAP[type as keyof typeof VEHICLE_ROLE_MAP] ?? 'No Aplica'
    );
};

export const getSex = (sex?: number): string => {
    if (sex === undefined || sex === null) return 'No Aplica';
    return SEX_MAP[sex as keyof typeof SEX_MAP] ?? 'No Aplica';
};
