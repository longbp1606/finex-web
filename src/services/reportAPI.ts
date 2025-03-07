import { get, post, put, remove } from "./apiCaller";

export const getReport = (boardId: string, date?: string) => {
    const url = `/api/board/${boardId}/record${date ? `?date=${date}` : ""}`;
    return get(url);
};

export const createReport = (boardId: string, content: string, createdAt?: string) => {
    const url = `/api/board/${boardId}/record`;
    const body = {
        content,
        createdAt: createdAt || new Date().toISOString(),
    };
    return post(url, body);
};

export const updateReport = (boardId: string, recordId: string, content: string, createdAt?: string) => {
    const url = `/api/board/${boardId}/record/${recordId}`;
    const body = {
        content,
        createdAt: createdAt || new Date().toISOString(),
    };
    return put(url, body);
};

export const removeReport = (boardId: string, recordId: string) => {
    const url = `/api/board/${boardId}/record/${recordId}`;
    return remove(url);
};

