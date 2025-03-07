import { get, post } from "./apiCaller";

export const generateChat = (message: string) => {
  return post("/api/chat", { message });
};

export const listChat = () => {
  return get("/api/chat");
};
