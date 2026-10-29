import { HardHat } from 'lucide-react';

import { PreventiveQuestionnaire } from '@/features/preventive-programs/components/preventive-questionnaire.tsx';
import { PROTECTION_ACTOR_QUESTIONS } from '@/features/preventive-programs/constants/questions.ts';

const SECTIONS = [
    {
        title: 'Preguntas',
        description: 'Selecciona una respuesta para cada afirmación.',
        questions: PROTECTION_ACTOR_QUESTIONS,
    },
];

const ProtectionRoadPage = () => {
    return (
        <PreventiveQuestionnaire
            program="protection-actor"
            title="Protección de actores viales"
            description="Responde cada pregunta de acuerdo con tu forma de conducir. No hay respuestas buenas o malas."
            icon={
                <HardHat className="hidden h-9 w-9 shrink-0 opacity-70 sm:block" />
            }
            sections={SECTIONS}
        />
    );
};

export default ProtectionRoadPage;
