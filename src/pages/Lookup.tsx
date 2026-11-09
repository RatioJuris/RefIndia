import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Hash, Loader2, PencilLine, Search } from "lucide-react";
import CitationOutput from "../components/CitationOutput";
import StylePicker from "../components/StylePicker";
import { formatCsl } from "../lib/engine";
import { lookupDoi, lookupIsbn, type LookupResult } from "../lib/lookup";
import { fromCsl } from "../lib/sources";
import { getStyle } from "../lib/styles";

type Mode = "doi" | "isbn";

const MODES: { id: Mode; label: string; icon: typeof Hash; placeholder: string; help: string }[] = [
  { id: "doi", label: "DOI", icon: Hash, placeholder: "10.1038/nature14539 or https://doi.org/…", help: "Journal articles, conference papers, books and datasets with a DOI. Searched through doi.org (Crossref, DataCite and others)." },
  { id: "isbn", label: "ISBN", icon: BookOpen, placeholder: "978-93-5035-030-0", help: "Books. Searched in Open Library, then Google Books." },
];

const names = (list?: { family?: string; given?: string; literal?: string }[]) =>
  (list ?? []).map((n) => n.literal ?? [n.given, n.family].filter(Boolean).join(" ")).join("; ");

export default function Lookup() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("doi");
  const [query, setQuery] = useState("");
  const [styleId, setStyleId] = useState("apa");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LookupResult | null>(null);

  const current = MODES.find((m) => m.id === mode)!;
  const style = getStyle(styleId);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(mode === "doi" ? await lookupDoi(query) : await lookupIsbn(query));
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "The lookup failed. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const item = result?.item as Record<string, any> | undefined;
  let formatted = null;
  try {
    formatted = item ? formatCsl([item], style)[0] : null;
  } catch {
    formatted = null;
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">Lookup</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Find a publication by its DOI or ISBN, then cite it in any style or edit the details.
        </p>
      </header>

      <form onSubmit={run} className="card p-6">
        <div className="mb-5 flex gap-2" role="tablist" aria-label="Identifier type">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={m.id === mode}
              onClick={() => { setMode(m.id); setResult(null); setError(null); }}
              className={`btn ${m.id === mode ? "bg-brand-700 text-white dark:bg-saffron-500 dark:text-slate-950" : "border border-slate-300 dark:border-slate-700"}`}
            >
              <m.icon size={16} aria-hidden /> {m.label}
            </button>
          ))}
        </div>
        <label htmlFor="query" className="field-label">{current.label}</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input id="query" className="field" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={current.placeholder} autoComplete="off" />
          <button type="submit" className="btn-primary sm:w-36" disabled={loading || !query.trim()}>
            {loading ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Search size={16} aria-hidden />}
            {loading ? "Searching" : "Look up"}
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{current.help}</p>
      </form>

      <div aria-live="polite">
        {error && (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">{error}</p>
        )}

        {item && (
          <section className="card mt-6 p-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Found in {result!.source}</p>
                <h2 className="mt-1 font-serif text-xl text-slate-900 dark:text-white">{String(item.title ?? "Untitled")}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {[names(item.author), Array.isArray(item["container-title"]) ? item["container-title"][0] : item["container-title"], item.publisher, item.issued?.["date-parts"]?.[0]?.[0]]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <button type="button" className="btn-secondary" onClick={() => navigate("/generator", { state: fromCsl(item) })}>
                <PencilLine size={16} aria-hidden /> Edit in Generator
              </button>
            </div>
            <StylePicker value={styleId} onChange={setStyleId} />
            <div className="mt-5">
              <CitationOutput result={formatted} style={style} placeholder="This record could not be formatted in this style." />
            </div>
          </section>
        )}
      </div>

      <p className="mt-8 text-xs text-slate-500 dark:text-slate-400">
        Lookups go directly from your browser to doi.org, Open Library or Google Books. RefIndia has no server and keeps no record of your searches.
        Metadata can be incomplete; check it before you submit.
      </p>
    </div>
  );
}
