import { FormEvent, useState } from 'react';

const categories = ['housing', 'utilities', 'food', 'transportation', 'entertainment', 'other'];

interface ExpenseFormProps {
  onSubmit: (payload: { amount: number; category: string; date: string }) => Promise<void>;
}

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit({
        amount: Number(amount),
        category,
        date: new Date(date).toISOString()
      });
      setAmount('');
      setCategory(categories[0]);
    } catch (err) {
      setError((err as Error).message || 'Unable to save expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded border border-slate-800 bg-slate-900/40 p-6">
      {error && <p className="rounded bg-red-500/10 p-2 text-sm text-red-300">{error}</p>}
      <div>
        <label className="mb-1 block text-sm text-slate-300" htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          required
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className="w-full rounded border border-slate-700 bg-slate-950 p-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-slate-300" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded border border-slate-700 bg-slate-950 p-2"
        >
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm text-slate-300" htmlFor="date">
          Date
        </label>
        <input
          id="date"
          type="date"
          required
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="w-full rounded border border-slate-700 bg-slate-950 p-2"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-lime-400 px-4 py-2 font-semibold text-slate-950 hover:bg-lime-300 disabled:opacity-60"
      >
        {loading ? 'Saving…' : 'Add Expense'}
      </button>
    </form>
  );
}
