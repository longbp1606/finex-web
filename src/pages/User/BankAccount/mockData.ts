import { BankAccount } from '@/services/bankAccountAPI';
import { v4 as uuidv4 } from 'uuid';

// Mock data for bank accounts
export const mockBankAccounts: BankAccount[] = [
  {
    id: '1',
    accountName: 'Primary Checking',
    accountNumber: 'XXXX-XXXX-XXXX-1234',
    bankName: 'Chase Bank',
    balance: 123500000,
    currency: 'VND',
    type: 'Checking',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    accountName: 'Savings Account',
    accountNumber: 'XXXX-XXXX-XXXX-5678',
    bankName: 'Bank of America',
    balance: 298000000,
    currency: 'VND',
    type: 'Savings',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    accountName: 'Investment Portfolio',
    accountNumber: 'XXXX-XXXX-XXXX-9012',
    bankName: 'Fidelity',
    balance: 665000000,
    currency: 'VND',
    type: 'Investment',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    accountName: 'Credit Card',
    accountNumber: 'XXXX-XXXX-XXXX-3456',
    bankName: 'Citibank',
    balance: 29200000,
    currency: 'VND',
    type: 'Credit Card',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    accountName: 'Home Loan',
    accountNumber: 'XXXX-XXXX-XXXX-7890',
    bankName: 'Wells Fargo',
    balance: 4325000000,
    currency: 'VND',
    type: 'Loan',
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    accountName: 'VND Savings',
    accountNumber: 'XXXX-XXXX-XXXX-2468',
    bankName: 'Vietcombank',
    balance: 25000000.00,
    currency: 'VND',
    type: 'Savings',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Mock API functions
export const mockFetchBankAccounts = () => {
  return Promise.resolve({
    data: {
      data: [...mockBankAccounts]
    }
  });
};

export const mockCreateBankAccount = (data: any) => {
  const newAccount: BankAccount = {
    id: uuidv4(),
    accountName: data.accountName,
    accountNumber: data.accountNumber,
    bankName: data.bankName,
    balance: data.balance,
    currency: data.currency,
    type: data.type,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockBankAccounts.push(newAccount);
  return Promise.resolve({ data: newAccount });
};

export const mockUpdateBankAccount = (id: string, data: any) => {
  const index = mockBankAccounts.findIndex(account => account.id === id);
  if (index !== -1) {
    mockBankAccounts[index] = {
      ...mockBankAccounts[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return Promise.resolve({ data: mockBankAccounts[index] });
  }
  return Promise.reject(new Error('Account not found'));
};

export const mockDeleteBankAccount = (id: string) => {
  const index = mockBankAccounts.findIndex(account => account.id === id);
  if (index !== -1) {
    mockBankAccounts.splice(index, 1);
    return Promise.resolve({ success: true });
  }
  return Promise.reject(new Error('Account not found'));
};