import { ClipboardCheck } from 'lucide-react';

import { PreventiveQuestionnaire } from '@/features/preventive-programs/components/preventive-questionnaire.tsx';
import { ALCOHOL_TOLERANCE_QUESTIONS } from '@/features/preventive-programs/constants/questions.ts';

const SECTIONS = [
    {
        title: 'Preguntas',
        description: 'Selecciona una respuesta para cada afirmación.',
        questions: ALCOHOL_TOLERANCE_QUESTIONS,
    },
];

const AlcoholTolerancePage = () => {
    return (
        <PreventiveQuestionnaire
            program="alcohol-tolerance"
            title="Alcohol, tabaco y otras sustancias"
            description="Responde cada pregunta de acuerdo con tu experiencia. No hay respuestas buenas o malas."
            icon={
                <ClipboardCheck className="hidden h-9 w-9 shrink-0 opacity-70 sm:block" />
            }
            sections={SECTIONS}
        />
    );
};

export default AlcoholTolerancePage;
