export interface AnswerItem {
    idQuestion: number;
    /** Texto de la pregunta: se guarda en la novedad (incidents.issuers). */
    questionName: string;
    answer: string;
    critical: number;
}

export interface InspectionSaveRequest {
    inspectionId: number;
    inspectionData: string;
    typeCheck: number;
    inspectionObservation: string;
    isOutService: number;
    answers: AnswerItem[];
}
