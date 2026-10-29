import { FilePenLine, HeartPulse } from 'lucide-react';
import { useDashboardStore } from '@/features/dashboard/store/dashboard-store.ts';

export const useBatteriesModules = () => {
    const { getPendingMorbidityCount, getPendingAdditionalDataCount } =
        useDashboardStore();

    return [
        {
            title: 'Morbilidad sentida',
            description: 'Encuesta de morbimortalidad',
            icon: HeartPulse,
            badge:
                getPendingMorbidityCount() > 0
                    ? String(getPendingMorbidityCount())
                    : undefined,
            to: '/batteries/morbidity',
        },
        {
            title: 'Datos adicionales',
            description: 'Formulario de datos adicionales',
            icon: FilePenLine,
            badge:
                getPendingAdditionalDataCount() > 0
                    ? String(getPendingAdditionalDataCount())
                    : undefined,
            to: '/profile/extend',
        },
    ];
};
