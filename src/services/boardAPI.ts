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
  return post("/api/board", board);
};

export const getBoard = () => {
  return get("/api/board");
};

export const getBoardDetail = (boardId: string) => {
  return get(`/api/board/${boardId}`);
};

export const updateBoard = (boardId: string, data: dtoCreateBoard) => {
  return put(`/api/board/${boardId}`, data);
};

export const deleteBoard = (boardId: string) => {
  return remove(`/api/board/${boardId}`);
};