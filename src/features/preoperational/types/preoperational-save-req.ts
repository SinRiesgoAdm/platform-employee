import type { PreoperationalStatus } from '@/features/preoperational/constants/status.ts';

/** Pregunta contestada: `id` es el id del catálogo de preguntas. */
export interface PreoperationalQuestionAnswer {
    id: number;
    /** "CATEGORÍA - pregunta": se guarda en la novedad (incidents.issuers). */
    name: string;
    quantity: number;
    response: PreoperationalStatus;
}

export interface PreoperationalSaveRequest {
    questions: PreoperationalQuestionAnswer[];
    comments: string;
    vehicleId: number;
    /** Formato yyyy-mm-dd. */
    date: string;
}
