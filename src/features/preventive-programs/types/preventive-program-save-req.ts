export interface PreventiveProgramAnswerReq {
    id: number;
    response: string;
}

export interface PreventiveProgramSaveReq {
    questions: PreventiveProgramAnswerReq[];
}
