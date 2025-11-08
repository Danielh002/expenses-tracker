import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchExpenses, fetchSummary } from '../api';
import type { Expense } from '../types';
import { ExpenseList } from '../components/ExpenseList';

export function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [allExpenses, totals] = await Promise.all([fetchExpenses(), fetchSummary()]);
        setExpenses(allExpenses);
        setSummary(totals);
      } catch (err) {
        setError((err as Error).message || 'Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <p className="text-slate-400">Loading expenses…</p>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-red-300">{error}</p>
        <button className="rounded bg-slate-200/10 px-4 py-2" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Expenses</h1>
        <Link
          to="/add"
          className="rounded bg-lime-400 px-4 py-2 font-medium text-slate-950 hover:bg-lime-300"
        >
          Add Expense
        </Link>
      </div>
      <ExpenseList expenses={expenses} summary={summary} />
    </div>
  );
}
