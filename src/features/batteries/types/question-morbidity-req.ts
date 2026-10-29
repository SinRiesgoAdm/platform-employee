export interface QuestionMorbidityResponseReq {
    testId: number;
    year: number;
    answersResponse: AnswerResponse[];
}

export interface AnswerResponse {
    index: number;
    response: number;
}
