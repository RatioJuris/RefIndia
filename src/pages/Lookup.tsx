import { useState } from "react";
import {
  Search,
  Link,
  BookOpen,
  Hash,
  Copy,
  Trash2,
} from "lucide-react";

type LookupType = "DOI" | "ISBN" | "URL";

export default function Lookup() {
  const [type, setType] = useState<LookupType>("DOI");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const handleLookup = async () => {
    if (!query.trim()) return;

    // TODO:
    // Replace with actual services:
    // Crossref
    // Open Library
    // Google Books
    // DOI Registry
    // Shodhganga

    setResult(
      JSON.stringify(
        {
          source: type,
          query,
          title: "Sample Publication Title",
          author: "Sample Author",
          year: "2026",
          publisher: "Sample Publisher",
        },
        null,
        2
      )
    );
  };

  const clearForm = () => {
    setQuery("");
    setResult("");
  };

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Metadata Lookup
          </h1>

          <p className="mt-3 text-slate-600">
            Retrieve publication metadata using DOI, ISBN,
            or webpage URLs.
          </p>
        </div>

        {/* Lookup Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setType("DOI")}
              className={`rounded-xl p-4 border ${
                type === "DOI"
                  ? "bg-blue-700 text-white border-blue-700"
                  : "hover:bg-slate-50"
              }`}
            >
              <Hash className="mx-auto mb-2" />
              DOI Lookup
            </button>

            <button
              onClick={() => setType("ISBN")}
              className={`rounded-xl p-4 border ${
                type === "ISBN"
                  ? "bg-blue-700 text-white border-blue-700"
                  : "hover:bg-slate-50"
              }`}
            >
              <BookOpen className="mx-auto mb-2" />
              ISBN Lookup
            </button>

            <button
              onClick={() => setType("URL")}
              className={`rounded-xl p-4 border ${
                type === "URL"
                  ? "bg-blue-700 text-white border-blue-700"
                  : "hover:bg-slate-50"
              }`}
            >
              <Link className="mx-auto mb-2" />
              URL Metadata
            </button>
          </div>

          <label className="block mb-2 font-medium">
            {type} Identifier
          </label>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              type === "DOI"
                ? "10.1000/xyz123"
                : type === "ISBN"
                ? "9781234567890"
                : "https://example.com/article"
            }
            className="w-full border rounded-lg p-3"
          />

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleLookup}
              className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
            >
              <Search size={18} />
              Lookup
            </button>

            <button
              onClick={clearForm}
              className="flex items-center gap-2 border px-6 py-3 rounded-lg hover:bg-slate-100"
            >
              <Trash2 size={18} />
              Clear
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              Metadata Result
            </h2>

            {result && (
              <button
                onClick={copyResult}
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
              >
                <Copy size={18} />
                Copy
              </button>
            )}
          </div>

          {result ? (
            <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              {result}
            </pre>
          ) : (
            <p className="text-slate-500">
              Retrieved metadata will appear here.
            </p>
          )}
        </div>

        {/* Supported Sources */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-6">
            Supported Sources
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-100 p-4 rounded-lg">
              DOI Registry
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              Crossref
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              Open Library
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              Google Books
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              Shodhganga
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              UGC CARE Resources
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-900">
            Metadata is retrieved from external bibliographic
            databases and should be verified before submission
            to journals, universities, publishers, or courts.
          </p>
        </div>
      </div>
    </main>
  );
}
