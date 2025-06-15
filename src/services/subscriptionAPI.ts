import { get, post, put, patch, remove } from "./apiCaller";

// Types for subscription data
export interface SubscriptionRequest {
    name: string;
    price: number;
    currencyUnit: string;
    startDate: string;
    endDate: string;
    description?: string;
}

export interface SubscriptionResponse {
    id: string;
    name: string;
    price: number;
    currencyUnit: string;
    startDate: string;
    endDate: string;
    active: boolean;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    data: T;
    error: string | null;
    message: string;
}

// API functions
export const createSubscription = async (subscription: SubscriptionRequest): Promise<ApiResponse<null>> => {
    const response = await post('/api/subscription', subscription);
    return response.data;
}

export const getAllSubscriptions = async (active?: boolean): Promise<ApiResponse<SubscriptionResponse[]>> => {
    const params = active !== undefined ? { active } : {};
    const response = await get('/api/subscription', params);
    return response.data;
}

export const getSubscriptionById = async (id: string): Promise<ApiResponse<SubscriptionResponse>> => {
    const response = await get(`/api/subscription/${id}`);
    return response.data;
}

export const updateSubscription = async (id: string, subscription: SubscriptionRequest): Promise<ApiResponse<SubscriptionResponse>> => {
    const response = await put(`/api/subscription/${id}`, subscription);
    return response.data;
}

export const deleteSubscription = async (id: string): Promise<ApiResponse<null>> => {
    const response = await remove(`/api/subscription/${id}`);
    return response.data;
}

export const toggleSubscriptionActive = async (id: string): Promise<ApiResponse<SubscriptionResponse>> => {
    const response = await patch(`/api/subscription/${id}/toggle-active`, {});
    return response.data;
}