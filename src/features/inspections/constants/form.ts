import type { AnswersMap } from '@/shared/components/questions/context/QuestionContext.tsx';

export type InspectionFormValues = {
    activityDate: string;
    typeCheck: string;
    outService: string;
    observations: string;
};

export const TYPE_CHECK_OPTIONS = [
    { value: '', label: 'Seleccione una opcion' },
    { value: 'preoperacional', label: 'Preoperacional' },
    { value: 'inspeccion', label: 'Inspección' },
];

export const OUT_SERVICE_OPTIONS = [
    { value: '', label: 'Seleccione una opcion' },
    { value: 'no', label: 'No. Esta operativo' },
    { value: 'si', label: 'Si. Fuera de servicio' },
];

export const ADD_ANSWERS_MAP: AnswersMap = {
    typeCheck: '',
    outService: '',
};
