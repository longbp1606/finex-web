import { get, post } from "./apiCaller";

export const generateChat = (message: string) => {
  return post("/api/chat", { message });
};

export const listChat = () => {
  return get("/api/chat");
};

export interface ChatResponse {
  id: string;
  message: string;
  role: string;
}

export interface ChatRequest {
  message: string;
}
