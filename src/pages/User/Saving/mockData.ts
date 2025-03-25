import { v4 as uuidv4 } from 'uuid';
import { mockBankAccounts } from '../BankAccount/mockData';

// Define TypeScript interfaces
export interface Contribution {
  date: string;
  amount: number;
  bankAccountId?: string;
}

export interface AutoContribution {
  amount: number;
  frequency: 'none' | 'weekly' | 'biweekly' | 'monthly';
}

export interface SavingGoal {
  id: number;
  name: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  notes: string;
  contributions: Contribution[];
  autoContribution: AutoContribution;
  status: 'active' | 'completed';
  bankAccountId?: string;
}

// Get savings accounts from bank account mock data
const savingsAccounts = mockBankAccounts.filter(account => 
  account.type === 'Savings' && account.isActive
);

// Mock data for saving goals
export const mockSavingGoals: SavingGoal[] = [
  {
    id: 1,
    name: 'Vacation to Japan',
    icon: 'global',
    targetAmount: 115000000,
    currentAmount: 63250000,
    deadline: '2025-09-15',
    category: 'Travel',
    notes: 'Planning a 2-week trip to Tokyo and Kyoto',
    contributions: [
      { date: '2025-01-05', amount: 11500000, bankAccountId: savingsAccounts[0]?.id },
      { date: '2025-02-10', amount: 17250000, bankAccountId: savingsAccounts[0]?.id },
      { date: '2025-03-08', amount: 23000000, bankAccountId: savingsAccounts[0]?.id },
      { date: '2025-03-15', amount: 11500000, bankAccountId: savingsAccounts[0]?.id },
    ],
    autoContribution: { amount: 5750000, frequency: 'monthly' },
    status: 'active',
    bankAccountId: savingsAccounts[0]?.id,
  },
  {
    id: 2,
    name: 'New Car',
    icon: 'car',
    targetAmount: 460000000,
    currentAmount: 115000000,
    deadline: '2025-12-31',
    category: 'Vehicle',
    notes: 'Looking at electric vehicles',
    contributions: [
      { date: '2024-10-05', amount: 46000000, bankAccountId: savingsAccounts[0]?.id },
      { date: '2024-12-10', amount: 34500000, bankAccountId: savingsAccounts[0]?.id },
      { date: '2025-02-15', amount: 34500000, bankAccountId: savingsAccounts[0]?.id },
    ],
    autoContribution: { amount: 11500000, frequency: 'monthly' },
    status: 'active',
    bankAccountId: savingsAccounts[0]?.id,
  },
  {
    id: 3,
    name: 'Emergency Fund',
    icon: 'bank',
    targetAmount: 345000000,
    currentAmount: 310500000,
    deadline: '2025-06-30',
    category: 'Emergency',
    notes: '6 months of living expenses',
    contributions: [
      { date: '2024-08-05', amount: 115000000, bankAccountId: savingsAccounts[1]?.id },
      { date: '2024-09-10', amount: 92000000, bankAccountId: savingsAccounts[1]?.id },
      { date: '2024-11-15', amount: 69000000, bankAccountId: savingsAccounts[1]?.id },
      { date: '2025-01-20', amount: 34500000, bankAccountId: savingsAccounts[1]?.id },
    ],
    autoContribution: { amount: 11500000, frequency: 'monthly' },
    status: 'active',
    bankAccountId: savingsAccounts[1]?.id,
  },
  {
    id: 4,
    name: 'Wedding Fund',
    icon: 'heart',
    targetAmount: 575000000,
    currentAmount: 575000000,
    deadline: '2024-06-15',
    category: 'Event',
    notes: 'Completed saving for wedding',
    contributions: [
      { date: '2023-06-05', amount: 230000000, bankAccountId: savingsAccounts[1]?.id },
      { date: '2023-09-10', amount: 184000000, bankAccountId: savingsAccounts[1]?.id },
      { date: '2023-12-15', amount: 161000000, bankAccountId: savingsAccounts[1]?.id },
    ],
    autoContribution: { amount: 0, frequency: 'none' },
    status: 'completed',
    bankAccountId: savingsAccounts[1]?.id,
  },
  {
    id: 5,
    name: 'Home Down Payment',
    icon: 'home',
    targetAmount: 1150000000,
    currentAmount: 287500000,
    deadline: '2026-12-31',
    category: 'Home',
    notes: 'Saving for 20% down payment on a house',
    contributions: [
      { date: '2024-01-15', amount: 115000000, bankAccountId: savingsAccounts[0]?.id },
      { date: '2024-03-20', amount: 80500000, bankAccountId: savingsAccounts[0]?.id },
      { date: '2024-05-10', amount: 92000000, bankAccountId: savingsAccounts[0]?.id },
    ],
    autoContribution: { amount: 23000000, frequency: 'monthly' },
    status: 'active',
    bankAccountId: savingsAccounts[0]?.id,
  },
  {
    id: 6,
    name: 'Education Fund',
    icon: 'book',
    targetAmount: 690000000,
    currentAmount: 690000000,
    deadline: '2023-08-15',
    category: 'Education',
    notes: 'Completed saving for MBA program',
    contributions: [
      { date: '2022-05-10', amount: 345000000, bankAccountId: savingsAccounts[1]?.id },
      { date: '2022-09-15', amount: 230000000, bankAccountId: savingsAccounts[1]?.id },
      { date: '2023-01-20', amount: 115000000, bankAccountId: savingsAccounts[1]?.id },
    ],
    autoContribution: { amount: 0, frequency: 'none' },
    status: 'completed',
    bankAccountId: savingsAccounts[1]?.id,
  }
];

// Mock API functions
export const mockFetchSavingGoals = () => {
  return Promise.resolve({
    data: {
      data: [...mockSavingGoals]
    }
  });
};

export const mockFetchSavingGoalsByBankAccountId = (bankAccountId: string) => {
  const filteredGoals = mockSavingGoals.filter(goal => goal.bankAccountId === bankAccountId);
  return Promise.resolve({
    data: {
      data: filteredGoals
    }
  });
};

export const mockCreateSavingGoal = (data: Omit<SavingGoal, 'id' | 'contributions' | 'status'> & { currentAmount?: number }) => {
  const newGoal: SavingGoal = {
    id: Math.max(0, ...mockSavingGoals.map(g => g.id)) + 1,
    name: data.name,
    icon: data.icon,
    targetAmount: data.targetAmount,
    currentAmount: data.currentAmount || 0,
    deadline: data.deadline,
    category: data.category,
    notes: data.notes || '',
    contributions: data.currentAmount ? [
      {
        date: new Date().toISOString().split('T')[0],
        amount: data.currentAmount,
        bankAccountId: data.bankAccountId
      }
    ] : [],
    autoContribution: data.autoContribution,
    status: 'active',
    bankAccountId: data.bankAccountId
  };
  
  mockSavingGoals.push(newGoal);
  return Promise.resolve({ data: newGoal });
};

export const mockUpdateSavingGoal = (id: number, data: Partial<SavingGoal>) => {
  const index = mockSavingGoals.findIndex(goal => goal.id === id);
  if (index !== -1) {
    mockSavingGoals[index] = {
      ...mockSavingGoals[index],
      ...data,
      // Check if goal is completed after update
      status: data.currentAmount && data.targetAmount && data.currentAmount >= data.targetAmount 
        ? 'completed' 
        : mockSavingGoals[index].status
    };
    return Promise.resolve({ data: mockSavingGoals[index] });
  }
  return Promise.reject(new Error('Saving goal not found'));
};

export const mockDeleteSavingGoal = (id: number) => {
  const index = mockSavingGoals.findIndex(goal => goal.id === id);
  if (index !== -1) {
    mockSavingGoals.splice(index, 1);
    return Promise.resolve({ success: true });
  }
  return Promise.reject(new Error('Saving goal not found'));
};

export const mockAddContribution = (goalId: number, amount: number, bankAccountId?: string) => {
  const index = mockSavingGoals.findIndex(goal => goal.id === goalId);
  if (index !== -1) {
    const goal = mockSavingGoals[index];
    const usedBankAccountId = bankAccountId || goal.bankAccountId;
    
    // Create the new contribution
    const newContribution: Contribution = {
      date: new Date().toISOString().split('T')[0],
      amount,
      bankAccountId: usedBankAccountId
    };
    
    // Update the saving goal
    const newCurrentAmount = goal.currentAmount + amount;
    const newStatus = newCurrentAmount >= goal.targetAmount ? 'completed' : 'active';
    
    mockSavingGoals[index] = {
      ...goal,
      currentAmount: newCurrentAmount,
      contributions: [...goal.contributions, newContribution],
      status: newStatus
    };
    
    // Update the bank account balance
    if (usedBankAccountId) {
      const bankAccountIndex = mockBankAccounts.findIndex(account => account.id === usedBankAccountId);
      if (bankAccountIndex !== -1) {
        mockBankAccounts[bankAccountIndex] = {
          ...mockBankAccounts[bankAccountIndex],
          balance: mockBankAccounts[bankAccountIndex].balance - amount,
          updatedAt: new Date().toISOString()
        };
      }
    }
    
    return Promise.resolve({ data: mockSavingGoals[index] });
  }
  return Promise.reject(new Error('Saving goal not found'));
};