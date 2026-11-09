import { Link } from "react-router-dom";
import { ArrowLeft, Gavel, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="font-serif text-7xl font-bold text-brand-700 dark:text-saffron-400">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">This page does not exist or may have moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary"><Home size={16} aria-hidden /> Home</Link>
        <Link to="/generator" className="btn-secondary"><Gavel size={16} aria-hidden /> Generator</Link>
        <button type="button" onClick={() => window.history.back()} className="btn-secondary"><ArrowLeft size={16} aria-hidden /> Back</button>
      </div>
    </div>
  );
}
