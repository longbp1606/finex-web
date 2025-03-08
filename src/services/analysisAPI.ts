import { get } from "./apiCaller";
import { CategoryResponse } from "./categoryAPI";

export const extractedRecord = (params: AnalysisParamsRequest) => {
    return get(`/api/board/${params.boardId}/analysis/extracted-record`, { date: params.date });
}

export const dailyAnalysis = (params: AnalysisParamsRequest) => {
    return get(`/api/board/${params.boardId}/analysis/daily`, { date: params.date });
}

export const monthlyAnalysis = (params: AnalysisParamsRequest) => {
    return get(`/api/board/${params.boardId}/analysis/monthly`, { date: params.date });
}

export interface AnalysisParamsRequest {
    date: string;
    boardId: string;
}

export interface AnalysisResponse {
    id: string;
    amount: number;
    content: string;
    createdAt: Date;
    categories: CategoryResponse[];
}

export interface DailyAnalysisResponse {
    id: string;
    date: number;
    month: number;
    year: number;
    total: number;
}

export interface MonthlyAnalysisResponse {
    id: string;
    avg: number;
    median: number;
    month: number;
    total: number;
    variance: number;
    year: number;
    chart: number[];
}