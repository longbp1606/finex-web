import { get } from "./apiCaller";

export const listCategories = () => {
    return get('/api/category');
}

export interface CategoryResponse {
    id: string;
    language: string;
    name: string;
}
