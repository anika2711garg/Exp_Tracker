
import { useState, useCallback } from 'react';

interface Expense {
  id: number;
  amount: number;
  category: string;
  date: Date;
  description: string;
}

export const useExpenseData = (accountName: string) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = useCallback((expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  }, []);

  const getMonthlyTotal = useCallback((targetDate: Date) => {
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    
    return expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
      })
      .reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  const getCategoryTotals = useCallback((targetDate: Date) => {
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
    });

    return monthlyExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });
  }, [expenses]);

  return {
    expenses,
    addExpense,
    getMonthlyTotal,
    getCategoryTotals,
  };
};
