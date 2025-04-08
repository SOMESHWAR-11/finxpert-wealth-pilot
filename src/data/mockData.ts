
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  accountBalance: number;
  monthlyIncome: number;
  monthlySaving: number;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  creditScore: number;
}

export interface Transaction {
  id: string;
  userId: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
}

export interface Goal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  type: 'travel' | 'education' | 'vehicle' | 'home' | 'emergency' | 'other';
}

export interface Investment {
  id: string;
  userId: string;
  type: 'equity' | 'debt' | 'gold' | 'fd' | 'mutual_fund';
  amount: number;
  returns: number;
  startDate: string;
}

export interface Loan {
  id: string;
  userId: string;
  type: 'home' | 'personal' | 'vehicle' | 'education';
  amount: number;
  remainingAmount: number;
  emi: number;
  nextEmiDate: string;
  interestRate: number;
  tenure: number; // in months
  status: 'active' | 'closed' | 'defaulted';
}

export interface Nudge {
  id: string;
  userId: string;
  type: 'overspending' | 'idle_money' | 'missed_emi' | 'subscription' | 'goal_contribution';
  message: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  isRead: boolean;
  actionTaken: boolean;
}

// Mock currentUser
export const currentUser: User = {
  id: 'u1',
  name: 'Priya Sharma',
  email: 'priya.sharma@gmail.com',
  avatar: '/avatar.png',
  accountBalance: 124500,
  monthlyIncome: 85000,
  monthlySaving: 25000,
  riskProfile: 'moderate',
  creditScore: 780
};

// Mock transactions
export const transactions: Transaction[] = [
  {
    id: 't1',
    userId: 'u1',
    date: '2024-04-01',
    amount: 85000,
    type: 'income',
    category: 'salary',
    description: 'Monthly Salary'
  },
  {
    id: 't2',
    userId: 'u1',
    date: '2024-04-02',
    amount: 12000,
    type: 'expense',
    category: 'rent',
    description: 'Monthly Rent'
  },
  {
    id: 't3',
    userId: 'u1',
    date: '2024-04-03',
    amount: 5000,
    type: 'expense',
    category: 'groceries',
    description: 'Big Bazaar'
  },
  {
    id: 't4',
    userId: 'u1',
    date: '2024-04-05',
    amount: 3500,
    type: 'expense',
    category: 'dining',
    description: 'Restaurant Dinner'
  },
  {
    id: 't5',
    userId: 'u1',
    date: '2024-04-08',
    amount: 2500,
    type: 'expense',
    category: 'utilities',
    description: 'Electricity Bill'
  },
  {
    id: 't6',
    userId: 'u1',
    date: '2024-04-10',
    amount: 10000,
    type: 'expense',
    category: 'investment',
    description: 'SIP Investment'
  }
];

// Mock goals
export const goals: Goal[] = [
  {
    id: 'g1',
    userId: 'u1',
    name: 'Goa Trip',
    targetAmount: 120000,
    currentAmount: 65000,
    deadline: '2024-12-30',
    type: 'travel'
  },
  {
    id: 'g2',
    userId: 'u1',
    name: 'Emergency Fund',
    targetAmount: 300000,
    currentAmount: 180000,
    deadline: '2024-10-15',
    type: 'emergency'
  },
  {
    id: 'g3',
    userId: 'u1',
    name: 'New Bike',
    targetAmount: 200000,
    currentAmount: 50000,
    deadline: '2025-06-01',
    type: 'vehicle'
  }
];

// Mock investments
export const investments: Investment[] = [
  {
    id: 'i1',
    userId: 'u1',
    type: 'equity',
    amount: 150000,
    returns: 12.5,
    startDate: '2023-01-15'
  },
  {
    id: 'i2',
    userId: 'u1',
    type: 'mutual_fund',
    amount: 200000,
    returns: 14.2,
    startDate: '2023-03-10'
  },
  {
    id: 'i3',
    userId: 'u1',
    type: 'fd',
    amount: 100000,
    returns: 7.1,
    startDate: '2023-05-20'
  },
  {
    id: 'i4',
    userId: 'u1',
    type: 'debt',
    amount: 75000,
    returns: 8.4,
    startDate: '2023-07-05'
  },
  {
    id: 'i5',
    userId: 'u1',
    type: 'gold',
    amount: 50000,
    returns: 10.2,
    startDate: '2023-09-12'
  }
];

// Mock loans
export const loans: Loan[] = [
  {
    id: 'l1',
    userId: 'u1',
    type: 'personal',
    amount: 500000,
    remainingAmount: 325000,
    emi: 15000,
    nextEmiDate: '2024-05-05',
    interestRate: 12,
    tenure: 36,
    status: 'active'
  },
  {
    id: 'l2',
    userId: 'u1',
    type: 'vehicle',
    amount: 300000,
    remainingAmount: 180000,
    emi: 12000,
    nextEmiDate: '2024-05-10',
    interestRate: 9.5,
    tenure: 24,
    status: 'active'
  }
];

// Mock nudges
export const nudges: Nudge[] = [
  {
    id: 'n1',
    userId: 'u1',
    type: 'idle_money',
    message: 'You have ₹50,000 sitting idle in your account. Consider investing it for better returns.',
    severity: 'medium',
    date: '2024-04-05',
    isRead: false,
    actionTaken: false
  },
  {
    id: 'n2',
    userId: 'u1',
    type: 'subscription',
    message: 'Your Netflix subscription of ₹799 was renewed today. You have not used this service in 2 months.',
    severity: 'low',
    date: '2024-04-07',
    isRead: true,
    actionTaken: false
  },
  {
    id: 'n3',
    userId: 'u1',
    type: 'goal_contribution',
    message: 'You are 15% behind on your "New Bike" goal. Consider increasing your monthly contribution.',
    severity: 'medium',
    date: '2024-04-08',
    isRead: false,
    actionTaken: false
  },
  {
    id: 'n4',
    userId: 'u1',
    type: 'overspending',
    message: 'You have spent 85% of your dining budget this month and there are still 20 days left.',
    severity: 'high',
    date: '2024-04-10',
    isRead: false,
    actionTaken: false
  }
];

// Mock budget categories
export const budgetCategories = [
  { name: 'Housing', allocated: 25000, spent: 22000 },
  { name: 'Food', allocated: 15000, spent: 12500 },
  { name: 'Transportation', allocated: 8000, spent: 6200 },
  { name: 'Utilities', allocated: 5000, spent: 4800 },
  { name: 'Entertainment', allocated: 7000, spent: 8500 },
  { name: 'Health', allocated: 5000, spent: 2000 },
  { name: 'Shopping', allocated: 10000, spent: 15000 },
  { name: 'Misc', allocated: 5000, spent: 2000 }
];

// Asset allocation data
export const assetAllocation = [
  { name: 'Equity', value: 35 },
  { name: 'Debt', value: 25 },
  { name: 'Gold', value: 10 },
  { name: 'Fixed Deposits', value: 20 },
  { name: 'Cash', value: 10 }
];

// Monthly expense data
export const monthlyExpenseData = [
  { name: 'Jan', amount: 55000 },
  { name: 'Feb', amount: 52000 },
  { name: 'Mar', amount: 58000 },
  { name: 'Apr', amount: 60000 },
  { name: 'May', amount: 54000 },
  { name: 'Jun', amount: 51000 },
  { name: 'Jul', amount: 53000 },
  { name: 'Aug', amount: 56000 },
  { name: 'Sep', amount: 58000 },
  { name: 'Oct', amount: 61000 },
  { name: 'Nov', amount: 57000 },
  { name: 'Dec', amount: 63000 }
];

// SIP growth simulation data
export const sipGrowthData = [
  { year: 1, investment: 120000, value: 132000 },
  { year: 2, investment: 240000, value: 275000 },
  { year: 3, investment: 360000, value: 432000 },
  { year: 5, investment: 600000, value: 780000 },
  { year: 10, investment: 1200000, value: 1850000 },
  { year: 15, investment: 1800000, value: 3250000 },
  { year: 20, investment: 2400000, value: 5200000 },
  { year: 25, investment: 3000000, value: 8100000 }
];

// FAQs for chatbot
export const faqs = [
  {
    question: "How do I start investing?",
    answer: "You can start by creating a financial goal in our Goal Planner, and then use our Investment Allocator to determine the right mix of investments based on your risk profile and time horizon."
  },
  {
    question: "What is SIP?",
    answer: "SIP stands for Systematic Investment Plan. It allows you to invest a fixed amount regularly (usually monthly) in mutual funds, helping you build wealth through the power of compounding and rupee cost averaging."
  },
  {
    question: "How can I improve my credit score?",
    answer: "To improve your credit score: pay bills on time, reduce credit card balances, don't close old credit accounts, limit new credit applications, and regularly check your credit report for errors."
  },
  {
    question: "How much emergency fund should I have?",
    answer: "Financial experts recommend having 3-6 months of your essential expenses saved in an emergency fund. This fund should be easily accessible in case of unforeseen circumstances."
  },
  {
    question: "What is the difference between equity and debt?",
    answer: "Equity investments (like stocks and equity mutual funds) represent ownership in companies and typically offer higher returns with higher risk. Debt investments (like bonds and FDs) represent loans that pay interest and are generally lower risk with more stable returns."
  }
];
