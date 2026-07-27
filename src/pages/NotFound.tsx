import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-8xl font-bold text-blue-700">
            404
          </h1>

          <h2 className="mt-4 text-3xl font-bold text-slate-900">
            Page Not Found
          </h2>

          <p className="mt-4 text-slate-600 leading-relaxed">
            The page you are looking for does not exist,
            may have been moved, or the address may be incorrect.
          </p>

          <p className="mt-2 text-slate-600">
            Use the navigation below to return to RefIndia's
            citation tools and resources.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
            >
              <Home size={18} />
              Home
            </Link>

            <Link
              to="/generator"
              className="inline-flex items-center gap-2 px-5 py-3 border rounded-lg hover:bg-slate-100"
            >
              <Search size={18} />
              Citation Generator
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-5 py-3 border rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>

          <div className="mt-10 pt-6 border-t">
            <p className="text-slate-700 font-medium">
              RefIndia
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Indian Academic & Legal Citation Generator and Converter
            </p>

            <p className="text-xs text-slate-400 mt-4">
              Copyright © 2026 RatioJuris
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
