export interface AnswerItem {
    idQuestion: number;
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
