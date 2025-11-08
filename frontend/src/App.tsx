import { Link, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AddExpensePage } from './pages/AddExpensePage';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-900 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold text-lime-400">
            fullstack-expense-tracker
          </Link>
          <span className="text-sm text-slate-400">Demo ready for ECS</span>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddExpensePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
