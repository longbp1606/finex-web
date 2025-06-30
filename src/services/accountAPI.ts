import { get, post } from "./apiCaller"

export const getAccounts = () => {
    return get("/api/account");
}

export const getAccountDetail = (id: string) => {
    return get(`/api/account/${id}`);
}

export const createAccount = (data: AccountRequest) => {
    return post("/api/account", data);
}

export interface AccountRequest {
    email: string;
    password: string;
    fname: string;
    lname: string;
    phone: string;
    avt?: string;
}
