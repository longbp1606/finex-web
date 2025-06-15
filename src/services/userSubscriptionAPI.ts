import { get, post, put, patch } from "./apiCaller";

// Types for user subscription data
export interface UserSubscriptionRequest {
    subscriptionId: string;
    expiryDate?: string; // Optional, defaults to 1 month from purchase date
}

export interface UserSubscriptionResponse {
    id: string;
    accountId: string;
    subscriptionId: string;
    subscription: {
        id: string;
        name: string;
        price: number;
        currencyUnit: string;
        description?: string;
        active: boolean;
        startDate: string;
        endDate: string;
    };
    purchaseDate: string;
    expiryDate: string;
    active: boolean;
    paymentStatus: string; // "PENDING" | "COMPLETED" | "FAILED"
    createdAt: string;
    updatedAt: string;
}

export interface UserSubscriptionUpdateRequest {
    expiryDate?: string;
    active?: boolean;
    paymentStatus?: string;
}

export interface ApiResponse<T> {
    data: T;
    error: string | null;
    message: string;
}

// API functions
export const purchaseSubscription = async (subscription: UserSubscriptionRequest): Promise<ApiResponse<UserSubscriptionResponse>> => {
    const response = await post('/api/user-subscription', subscription);
    return response.data;
}

export const getAllUserSubscriptions = async (params?: { active?: boolean, subscriptionId?: string, paymentStatus?: string }): Promise<ApiResponse<UserSubscriptionResponse[]>> => {
    const response = await get('/api/user-subscription', params || {});
    return response.data;
}

export const getUserSubscriptionById = async (id: string): Promise<ApiResponse<UserSubscriptionResponse>> => {
    const response = await get(`/api/user-subscription/${id}`);
    return response.data;
}

export const updateUserSubscription = async (id: string, subscription: UserSubscriptionUpdateRequest): Promise<ApiResponse<UserSubscriptionResponse>> => {
    const response = await put(`/api/user-subscription/${id}`, subscription);
    return response.data;
}

export const cancelUserSubscription = async (id: string): Promise<ApiResponse<UserSubscriptionResponse>> => {
    const response = await patch(`/api/user-subscription/${id}/cancel`, {});
    return response.data;
}

export const renewUserSubscription = async (id: string): Promise<ApiResponse<UserSubscriptionResponse>> => {
    const response = await patch(`/api/user-subscription/${id}/renew`, {});
    return response.data;
}