import { useNavigate } from 'react-router-dom';
import { ExpenseForm } from '../components/ExpenseForm';
import { createExpense } from '../api';

export function AddExpensePage() {
  const navigate = useNavigate();

  const handleSubmit = async (payload: { amount: number; category: string; date: string }) => {
    await createExpense(payload);
    navigate('/');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Add Expense</h1>
          <p className="text-sm text-slate-400">Track spending in just a few clicks.</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="rounded border border-slate-600 px-4 py-2 text-sm text-slate-200"
        >
          Back
        </button>
      </div>
      <ExpenseForm onSubmit={handleSubmit} />
    </div>
  );
}
