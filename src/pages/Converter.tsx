import { useMemo, useState } from "react";
import { Download, FileInput, Loader2, RefreshCw, Trash2 } from "lucide-react";
import StylePicker from "../components/StylePicker";
import CopyButton from "../components/CopyButton";
import { download } from "../lib/clipboard";
import { exportAs, formatList, parseInput } from "../lib/engine";
import { getStyle } from "../lib/styles";

const EXAMPLE = `@article{sathe2003,
  author  = {Sathe, S. P.},
  title   = {Judicial Review in India},
  journal = {Journal of the Indian Law Institute},
  volume  = {45},
  number  = {2},
  pages   = {151--180},
  year    = {2003}
}

@book{seervai1991,
  author    = {Seervai, H. M.},
  title     = {Constitutional Law of India},
  edition   = {4},
  publisher = {Universal Law Publishing},
  address   = {New Delhi},
  year      = {1991}
}`;

export default function Converter() {
  const [input, setInput] = useState("");
  const [styleId, setStyleId] = useState("oscola");
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const style = getStyle(styleId);
  const formatted = useMemo(() => {
    try {
      return formatList(items, style);
    } catch {
      return [];
    }
  }, [items, style]);

  const convert = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setItems([]);
    try {
      const parsed = await parseInput(input);
      if (!parsed.length) throw new Error();
      setItems(parsed);
    } catch {
      setError("RefIndia could not read this input. Paste BibTeX, RIS, CSL-JSON, or DOIs (one per line). Free-text citations copied from a document cannot be converted reliably, so they are not supported.");
    } finally {
      setLoading(false);
    }
  };

  const allHtml = formatted.join("<br>");

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">Converter</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-400">
          Convert references exported from Zotero, Mendeley, EndNote, Google Scholar or a publisher's website into any supported style, or turn a list of DOIs into a formatted bibliography.
        </p>
      </header>

      <section className="card p-6">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="input" className="field-label mb-0">BibTeX, RIS, CSL-JSON or DOIs</label>
          <button type="button" className="btn-ghost" onClick={() => setInput(EXAMPLE)}>
            <FileInput size={16} aria-hidden /> Load example
          </button>
        </div>
        <textarea
          id="input"
          rows={10}
          className="field font-mono text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"@article{key,\n  author = {Family, Given},\n  title = {…},\n  …\n}\n\nor one DOI per line:\n10.1038/nature14539"}
          spellCheck={false}
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="btn-primary" onClick={convert} disabled={loading || !input.trim()}>
            {loading ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <RefreshCw size={16} aria-hidden />}
            {loading ? "Reading" : "Convert"}
          </button>
          <button type="button" className="btn-secondary" onClick={() => { setInput(""); setItems([]); setError(null); }}>
            <Trash2 size={16} aria-hidden /> Clear
          </button>
        </div>
      </section>

      <div aria-live="polite">
        {error && (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">{error}</p>
        )}

        {items.length > 0 && (
          <section className="card mt-6 p-6">
            <StylePicker value={styleId} onChange={setStyleId} />
            <div className="mt-5 mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {items.length} {items.length === 1 ? "reference" : "references"} in {style.label}
              </h2>
              <div className="flex flex-wrap gap-1">
                <CopyButton html={allHtml} label="Copy all" />
                <button type="button" className="btn-ghost" onClick={() => download("references.bib", exportAs(items, "bibtex"))}>
                  <Download size={16} aria-hidden /> BibTeX
                </button>
                <button type="button" className="btn-ghost" onClick={() => download("references.ris", exportAs(items, "ris"))}>
                  <Download size={16} aria-hidden /> RIS
                </button>
              </div>
            </div>
            <ol className="divide-y divide-slate-200 dark:divide-slate-800">
              {formatted.map((html, i) => (
                <li key={i} className="flex items-start justify-between gap-3 py-3">
                  <p className="citation font-serif leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
                  <CopyButton html={html} />
                </li>
              ))}
            </ol>
            {!style.hasBibliography && (
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{style.label} has no bibliography format, so footnote forms are shown.</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
