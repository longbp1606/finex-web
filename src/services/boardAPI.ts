import { get, post, put, remove } from "./apiCaller";

export type dtoCreateBoard = {
  title: string;
  currencyUnit: string;
  language: string;
};

export type dtoGetBoard = {
  id: string;
  title: string;
  currencyUnit: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
  isAnalyzed: boolean;
  isDeleted: boolean;
};

export const createBoard = (board: dtoCreateBoard) => {
  return post("/api/budget", board);
};

export const getBoard = () => {
  return get("/api/budget");
};

export const getBoardDetail = (boardId: string) => {
  return get(`/api/budget/${boardId}`);
};

export const updateBoard = (boardId: string, data: dtoCreateBoard) => {
  return put(`/api/budget/${boardId}`, data);
};

export const deleteBoard = (boardId: string) => {
  return remove(`/api/budget/${boardId}`);
};

export const createBudgetWithAI = async (prompt: string, language: string = "vi") => {
  try {
    const response = await post("/api/budget/ai-create", {
      prompt,
      language,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating budget with AI:", error);
    throw error;
  }
};