import { EyeOff } from 'lucide-react';

import { PreventiveQuestionnaire } from '@/features/preventive-programs/components/preventive-questionnaire.tsx';
import {
    PREVENTION_QUESTIONS_SESSION_1,
    PREVENTION_QUESTIONS_SESSION_2,
} from '@/features/preventive-programs/constants/questions.ts';

const SECTIONS = [
    {
        title: 'Preguntas',
        description: 'Selecciona una respuesta para cada afirmación.',
        questions: PREVENTION_QUESTIONS_SESSION_1,
    },
    {
        title: 'Mientras conduce, suele realizar actividades como',
        description: 'Indica con qué frecuencia realizas cada actividad.',
        questions: PREVENTION_QUESTIONS_SESSION_2,
    },
];

const PreventionDistractionPage = () => {
    return (
        <PreventiveQuestionnaire
            program="prevention"
            title="Prevención de distracciones"
            description="Responde cada pregunta de acuerdo con tus hábitos al conducir. No hay respuestas buenas o malas."
            icon={
                <EyeOff className="hidden h-9 w-9 shrink-0 opacity-70 sm:block" />
            }
            sections={SECTIONS}
        />
    );
};

export default PreventionDistractionPage;
