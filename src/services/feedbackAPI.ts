import { get, post } from "./apiCaller";

export type FeedbackType =
    | "Bug Report"
    | "Feature Request"
    | "General"
    | "Question"
    | "Complaint";

export interface FeedbackReplyResponse {
    id: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string; // ISO string from API
    isAdmin?: boolean;
}

export interface FeedbackResponseItem {
    id: string;
    userId: string;
    userName: string;
    type: FeedbackType | string; // allow unknown server values gracefully
    title: string;
    content: string;
    rating: number; // 1..5
    createdAt: string; // ISO string from API
    status: "Open" | "In Progress" | "Resolved" | "Closed" | string;
    replies: FeedbackReplyResponse[];
}

export interface ApiResponse<T> {
    data: T;
    error: string | null;
    message: string;
}

export interface ListFeedbackParams {
    status?: string;
    type?: string;
    mine?: boolean; // if true, only current user's feedback
}

export interface CreateFeedbackRequest {
    title: string;
    content: string;
    type: FeedbackType | string;
    rating: number;
}

export interface CreateReplyRequest {
    content: string;
}

// List feedbacks
export const listFeedbacks = async (
    params: ListFeedbackParams = {}
): Promise<ApiResponse<FeedbackResponseItem[]>> => {
    const res = await get("/api/feedback", params);
    return res.data;
};

// Create new feedback
export const createFeedback = async (
    payload: CreateFeedbackRequest
): Promise<ApiResponse<FeedbackResponseItem>> => {
    const res = await post("/api/feedback", payload);
    return res.data;
};

// Reply to a feedback thread
export const replyFeedback = async (
    feedbackId: string,
    payload: CreateReplyRequest
): Promise<ApiResponse<FeedbackResponseItem>> => {
    const res = await post(`/api/feedback/${feedbackId}/reply`, payload);
    return res.data;
};
