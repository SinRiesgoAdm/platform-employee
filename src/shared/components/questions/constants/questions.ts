export type QuestionType = 'true_false' | 'multiple_choice';

export type OptionsMultiple = Record<string, string>;

export interface QuestionProgram {
    id: number;
    typeQuestion?: QuestionType;
    idQuestionShow?: number | null;
    session?: number | null;
    question: string;
    options: string[];
    optionsMultiple?: OptionsMultiple | null;
}
