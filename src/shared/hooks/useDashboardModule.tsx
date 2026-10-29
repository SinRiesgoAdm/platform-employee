// src/features/dashboard/hooks/use-dashboard-modules.tsx
import {
    ClipboardList,
    GraduationCap,
    HardHat,
    MapPinned,
    Bus,
    ShieldPlus,
    FolderOpen,
} from 'lucide-react';
import { useDashboardStore } from '@/features/dashboard/store/dashboard-store.ts';
import { useAuthStore } from '@/features/auth/store/auth-store.tsx';

export function useDashboardModules() {
    const {
        getPendingTrainingCount,
        getPendingBatteriesCount,
        getPendingDocumentCount,
        getPermissionsCanInspections,
        getPendingRouteDispatch,
        getPendingPreoperationalCount,
        getPermissionsCanPreoperational,
    } = useDashboardStore();

    const { isPevActive } = useAuthStore();

    return [
        {
            title: 'Cuestionarios',
            description: 'Morbimortalidad y más',
            icon: ClipboardList,
            isEnabled: true,
            badge:
                getPendingBatteriesCount() > 0
                    ? String(getPendingBatteriesCount())
                    : undefined,
            to: 'dashboard/batteries',
        },
        {
            title: 'Plan de capacitación',
            description: 'Cursos y sesiones programadas',
            icon: GraduationCap,
            isEnabled: true,
            badge:
                getPendingTrainingCount() > 0
                    ? String(getPendingTrainingCount())
                    : undefined,
            to: '/trainnings',
        },
        {
            title: 'Inspecciones y preoperacionales SST',
            description: 'Listas de chequeo de seguridad',
            icon: HardHat,
            isEnabled: getPermissionsCanInspections(),
            badge: undefined,
            to: '/inspections',
        },
        {
            title: 'Despachos de rutas',
            badge:
                getPendingRouteDispatch() > 0
                    ? String(getPendingRouteDispatch())
                    : undefined,
            description: 'Asignación y control de recorridos',
            icon: MapPinned,
            isEnabled: isPevActive(),
            to: '/route-dispatch',
        },
        {
            title: 'Preoperacionales PESV',
            isEnabled: isPevActive() && getPermissionsCanPreoperational(),
            description: 'Verificación de vehículos',
            icon: Bus,
            badge:
                getPendingPreoperationalCount() > 0
                    ? String(getPendingPreoperationalCount())
                    : undefined,
            to: '/preoperational',
        },
        {
            title: 'Programas preventivos',
            description: 'Seguimiento de riesgos y hábitos',
            isEnabled: isPevActive(),
            icon: ShieldPlus,
            to: '/dashboard/preventive',
        },
        {
            title: 'Mis documentos',
            isEnabled: true,
            badge:
                getPendingDocumentCount() > 0
                    ? String(getPendingDocumentCount())
                    : undefined,
            description: 'Historial y certificados',
            icon: FolderOpen,
            to: '/profile/documents',
        },
    ];
}
