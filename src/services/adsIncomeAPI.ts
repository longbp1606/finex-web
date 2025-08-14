import { get } from "./apiCaller";

export type AdsIncomeStatus = 'paid' | 'pending' | 'failed' | string;

export interface AdsIncomeRecord {
    id: string;
    source: string;
    amount: number;
    currency: string;
    date: string; // ISO
    status?: AdsIncomeStatus;
}

export interface AdsIncomeQueryParams {
    from?: string; // ISO datetime
    to?: string;   // ISO datetime
    source?: string;
    status?: string; // 'paid' | 'pending' | 'failed'
}

export interface ApiResponse<T> {
    data: T;
    error: string | null;
    message: string;
}

export const getAdsIncome = async (
    params: AdsIncomeQueryParams
): Promise<ApiResponse<AdsIncomeRecord[]>> => {
    const res = await get('/api/admin/ads-income', params);
    return res.data;
};

// Optional: if backend provides a summary endpoint, you can use this
export interface AdsIncomeSummary {
    total: number;
    paid: number;
    pending: number;
    failed: number;
    currency: string;
}

export const getAdsIncomeSummary = async (
    params: AdsIncomeQueryParams
): Promise<ApiResponse<AdsIncomeSummary>> => {
    const res = await get('/api/admin/ads-income/summary', params);
    return res.data;
};
