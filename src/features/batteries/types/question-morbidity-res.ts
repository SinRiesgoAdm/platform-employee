export interface QuestionMorbidityResponse {
    answered_count: number;
    max_allowed_page: number;
    year: number;
    test_id: number;
    total_questions: number;
    page: number;
    max_page: number;
    is_completed: boolean;
    data: TestQuestionDto[];
}

export interface TestQuestionDto {
    id: number;
    name: string;
    index: number;
    answered: boolean;
    answer_value: string | null;
}
