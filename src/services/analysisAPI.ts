import { get } from "./apiCaller";

export const extractedRecord = (params: AnalysisParamsRequest) => {
    return get(`/api/board/${params.boardId}/analysis/extracted-record`, { date: params.date });
}

export const dailyAnalysis = (params: AnalysisParamsRequest) => {
    return get(`/api/board/${params.boardId}/analysis/daily`, { date: params.date });
}

export interface AnalysisParamsRequest {
    date: string;
    boardId: string;
}