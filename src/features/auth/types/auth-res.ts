export interface EmployeeLoginResponse {
    name: string;
    uid: string;
    enterpriseName: string;
    pev: number;
    positionName: string;
    branchName: string;
    token: string;
    avatar: string;
}

/** Empresa a la que pertenece el empleado (en BD: `employees.user_id`). */
export interface EmployeeEnterprise {
    id: number;
    name: string;
    /** URL pública del logo en Spaces; vacía si la empresa no tiene logo. */
    avatar: string;
}
