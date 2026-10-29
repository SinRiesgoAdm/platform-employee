export interface QuestionProgram {
    id: number;
    idQuestionShow?: number | null;
    session?: number | null;
    question: string;
    options: string[];
}
