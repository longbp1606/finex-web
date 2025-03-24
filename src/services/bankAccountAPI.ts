import { get, post, put, remove } from './apiCaller';

export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  balance: number;
  currency: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBankAccountRequest {
  accountName: string;
  accountNumber: string;
  bankName: string;
  balance: number;
  currency: string;
  type: string;
}

export interface UpdateBankAccountRequest {
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  balance?: number;
  currency?: string;
  type?: string;
  isActive?: boolean;
}

export const fetchBankAccounts = () => {
  return get('/api/bank-accounts');
};

export const fetchBankAccountById = (id: string) => {
  return get(`/api/bank-accounts/${id}`);
};

export const createBankAccount = (data: CreateBankAccountRequest) => {
  return post('/api/bank-accounts', data);
};

export const updateBankAccount = (id: string, data: UpdateBankAccountRequest) => {
  return put(`/api/bank-accounts/${id}`, data);
};

export const deleteBankAccount = (id: string) => {
  return remove(`/api/bank-accounts/${id}`);
};