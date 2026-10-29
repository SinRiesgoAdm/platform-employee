export interface TrainingQuestionRequest {
    trainingId: number;
    answersResponse: AnswerQuestionTrainingResponse[];
}

export interface AnswerQuestionTrainingResponse {
    questionId: number;
    response: string;
}
