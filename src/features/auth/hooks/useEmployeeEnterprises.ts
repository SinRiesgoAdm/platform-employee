import { useMutation } from '@tanstack/react-query';
import { getEmployeeEnterprisesAction } from '@/features/auth/action/get-employee-enterprises-action.ts';

// Mutation (no query): se dispara al enviar la cédula y no debe cachearse
// entre sesiones de distintos empleados en el mismo dispositivo.
export const useEmployeeEnterprises = () =>
    useMutation({
        mutationFn: getEmployeeEnterprisesAction,
    });
