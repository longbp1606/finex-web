import { post } from "./apiCaller";

export const generateChat = (message: string) => {
    return post('/api/chat', { message });
}