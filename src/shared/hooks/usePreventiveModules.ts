import { EyeOff, HardHat, ShieldCheck } from 'lucide-react';

export const usePreventiveModules = () => {
    return [
        {
            title: 'Alcohol y drogas',
            description: 'Prevención y control del consumo',
            icon: ShieldCheck,
            badge: undefined,
            to: '/program-preventive/alcohol-tolerance',
        },
        {
            title: 'Distracción vial',
            description: 'Prevención de riesgos por distracciones',
            icon: EyeOff,
            badge: undefined,
            to: '/program-preventive/prevention',
        },
        {
            title: 'Actores viales',
            description: 'Protección y prevención de riesgos viales',
            icon: HardHat,
            badge: undefined,
            to: '/program-preventive/protection-actor',
        },
    ];
};
