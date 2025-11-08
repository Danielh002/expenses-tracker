import type { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  summary: Record<string, number>;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export function ExpenseList({ expenses, summary }: ExpenseListProps) {
  if (!expenses.length) {
    return <p className="text-slate-400">No expenses logged yet.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">By Category</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {Object.entries(summary).map(([category, total]) => (
            <div key={category} className="rounded border border-slate-700 bg-slate-900/40 p-4">
              <p className="text-sm uppercase text-slate-400">{category}</p>
              <p className="text-xl font-semibold text-lime-400">{currencyFormatter.format(total)}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">All Expenses</h2>
        <ul className="divide-y divide-slate-800 rounded border border-slate-800 bg-slate-900/40">
          {expenses.map((expense) => (
            <li key={expense.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium capitalize">{expense.category}</p>
                <p className="text-sm text-slate-400">{new Date(expense.date).toLocaleDateString()}</p>
              </div>
              <p className="text-lg font-semibold">{currencyFormatter.format(expense.amount)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
