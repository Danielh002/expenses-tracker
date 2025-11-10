import axios from 'axios';
import type { Expense } from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

export const fetchExpenses = async (): Promise<Expense[]> => {
  const { data } = await api.get<Expense[]>('/expenses');
  return data;
};

export const createExpense = async (
  expense: Pick<Expense, 'amount' | 'category' | 'date'>
): Promise<Expense> => {
  const { data } = await api.post<Expense>('/expenses', expense);
  return data;
};

export const fetchSummary = async (): Promise<Record<string, number>> => {
  const { data } = await api.get<Record<string, number>>('/summary');
  return data;
};
