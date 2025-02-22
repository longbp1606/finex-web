export interface TransactionItem {
  id: string;
  name: string;
  date: string;
  amount: number;
}

export interface BudgetItem {
  id: string;
  title: string;
  date: string;
  tags: string[];
  target: number;
  balance: number;
  transaction: TransactionItem[];
}

export const budgets: BudgetItem[] = [
  {
    id: "1",
    title: "Japan Travel 🇯🇵",
    date: "2024-03-15",
    target: 5000,
    balance: 1200,
    tags: ["Vacation", "Flights", "Hotels"],
    transaction: [
      { id: "t1", name: "Flight Tickets", date: "2024-02-01", amount: 800 },
      { id: "t2", name: "Hotel Booking", date: "2024-02-10", amount: 500 },
    ],
  },
  {
    id: "2",
    title: "Wedding Expenses 💍",
    date: "2024-06-10",
    target: 15000,
    balance: 5000,
    tags: ["Venue", "Catering", "Photography"],
    transaction: [
      { id: "t3", name: "Venue Deposit", date: "2024-04-15", amount: 3000 },
      { id: "t4", name: "Photographer Booking", date: "2024-05-05", amount: 2000 },
    ],
  },
  {
    id: "3",
    title: "Tesla Model Y 🚗",
    date: "2024-09-05",
    target: 60000,
    balance: 25000,
    tags: ["Car", "Electric Vehicle", "Tesla"],
    transaction: [
      { id: "t5", name: "Initial Down Payment", date: "2024-06-01", amount: 20000 },
      { id: "t6", name: "Charging Station Installation", date: "2024-07-10", amount: 5000 },
    ],
  },
  {
    id: "4",
    title: "Home Renovation 🏡",
    date: "2024-11-20",
    target: 25000,
    balance: 8000,
    tags: ["Furniture", "Interior Design", "Construction"],
    transaction: [
      { id: "t7", name: "Kitchen Remodeling", date: "2024-09-01", amount: 5000 },
      { id: "t8", name: "Living Room Furniture", date: "2024-09-20", amount: 3000 },
    ],
  },
  {
    id: "5",
    title: "Tech Startup 🚀",
    date: "2025-01-01",
    target: 100000,
    balance: 45000,
    tags: ["Business", "Startup", "Investment"],
    transaction: [
      { id: "t9", name: "Office Rental", date: "2024-10-01", amount: 10000 },
      { id: "t10", name: "Equipment Purchase", date: "2024-10-15", amount: 15000 },
    ],
  },
];

