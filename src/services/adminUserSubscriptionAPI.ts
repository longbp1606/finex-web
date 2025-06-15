import { get, put, patch } from "./apiCaller";

// Types for admin user subscription management
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
    paymentStatus: string; // "pending" | "completed" | "cancelled" | "failed"
    createdAt: string;
    updatedAt: string;
}

export interface UserSubscriptionUpdateRequest {
    expiryDate?: string;
    active?: boolean;
    paymentStatus?: string;
}

export interface UserSubscriptionStatistics {
    totalSubscriptions: number;
    activeSubscriptions: number;
    expiredSubscriptions: number;
    expiringSubscriptions: number;
}

export interface ApiResponse<T> {
    data: T;
    error: string | null;
    message: string;
}

// Admin API functions for managing user subscriptions
export const getAllUserSubscriptions = async (params?: { 
    active?: boolean, 
    subscriptionId?: string, 
    accountId?: string,
    paymentStatus?: string 
}): Promise<ApiResponse<UserSubscriptionResponse[]>> => {
    const response = await get('/api/admin/user-subscription', params || {});
    return response.data;
}

export const getUserSubscriptionStatistics = async (): Promise<ApiResponse<UserSubscriptionStatistics>> => {
    const response = await get('/api/admin/user-subscription/statistics');
    return response.data;
}

export const getUserSubscriptionById = async (id: string): Promise<ApiResponse<UserSubscriptionResponse>> => {
    const response = await get(`/api/admin/user-subscription/${id}`);
    return response.data;
}

export const updateUserSubscription = async (id: string, subscription: UserSubscriptionUpdateRequest): Promise<ApiResponse<UserSubscriptionResponse>> => {
    const response = await put(`/api/admin/user-subscription/${id}`, subscription);
    return response.data;
}

export const cancelUserSubscription = async (id: string): Promise<ApiResponse<UserSubscriptionResponse>> => {
    const response = await patch(`/api/admin/user-subscription/${id}/cancel`, {});
    return response.data;
}

export const renewUserSubscription = async (id: string, monthsToAdd?: number): Promise<ApiResponse<UserSubscriptionResponse>> => {
    const response = await patch(`/api/admin/user-subscription/${id}/renew`, { monthsToAdd });
    return response.data;
}