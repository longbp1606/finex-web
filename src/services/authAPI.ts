import { get, post } from "./apiCaller"

export type LoginSchemeType = {
    scheme: string;
    code: string;
    provider?: string;
}

export type RegisterSchemeType = {
    email: string;
    fname: string;
    lname: string;
    password: string;
    phone: string;
    avt?: string;
}

export type ProfileType = {
    id: string;
    email: string;
    fname: string;
    lname: string;
    phone: string;
    avt?: string;
    role: number;
    createdAt: string;
    updatedAt: string;
}

export const login = (loginInfo: LoginSchemeType) => {
    return post('/api/auth/login', loginInfo);
}

export const register = (registerInfo: RegisterSchemeType) => {
    return post('/api/account', registerInfo);
}

export const getProfile = () => {
    return get('/api/auth/profile');
}