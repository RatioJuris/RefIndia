import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Download, Eraser, Layers } from "lucide-react";
import CitationOutput from "../components/CitationOutput";
import StylePicker from "../components/StylePicker";
import CopyButton from "../components/CopyButton";
import { exportAs, formatForm, type Formatted } from "../lib/engine";
import { download } from "../lib/clipboard";
import { getSource, missingRequired, SOURCE_TYPES, toCsl, type FormValues, type SourceId } from "../lib/sources";
import { getStyle, STYLES } from "../lib/styles";

interface Prefill {
  source?: SourceId;
  values?: FormValues;
}

const GROUPS = ["Legal", "Academic", "Other"] as const;

function safeFormat(sourceId: string, values: FormValues, styleId: string): Formatted | null {
  try {
    return formatForm(sourceId, values, getStyle(styleId));
  } catch {
    return null;
  }
}

export default function Generator() {
  const location = useLocation();
  const prefill = (location.state ?? {}) as Prefill;

  const [sourceId, setSourceId] = useState<SourceId>(prefill.source ?? "case");
  const [styleId, setStyleId] = useState("ili");
  const [values, setValues] = useState<FormValues>(prefill.values ?? {});
  const [compare, setCompare] = useState(false);

  useEffect(() => {
    if (prefill.source) {
      setSourceId(prefill.source);
      setValues(prefill.values ?? {});
    }
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  const source = getSource(sourceId);
  const style = getStyle(styleId);
  const missing = missingRequired(source, values);

  const result = useMemo(
    () => (missing.length ? null : safeFormat(sourceId, values, styleId)),
    [sourceId, values, styleId, missing.length],
  );

  const comparison = useMemo(
    () =>
      compare && !missing.length
        ? STYLES.map((s) => ({ style: s, result: safeFormat(sourceId, values, s.id) }))
        : [],
    [compare, sourceId, values, missing.length],
  );

  const setField = (key: string, value: string) => setValues((prev) => ({ ...prev, [key]: value }));

  const exportFile = (format: "bibtex" | "ris") => {
    const content = exportAs([toCsl(source, values)], format);
    download(format === "bibtex" ? "refindia.bib" : "refindia.ris", content);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">Citation Generator</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
          Choose what you are citing and the style you need. The citation updates as you type.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <section className="card p-6" aria-label="Source details">
          <fieldset className="mb-6">
            <legend className="field-label">What are you citing?</legend>
            <div className="space-y-3">
              {GROUPS.map((group) => (
                <div key={group} className="flex flex-wrap items-center gap-2">
                  <span className="w-20 text-xs font-semibold tracking-wider text-slate-400 uppercase">{group}</span>
                  {SOURCE_TYPES.filter((s) => s.group === group).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={s.id === sourceId}
                      onClick={() => setSourceId(s.id)}
                      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                        s.id === sourceId
                          ? "border-saffron-500 bg-saffron-500/10 text-saffron-600 dark:text-saffron-400"
                          : "border-slate-300 text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            {source.fields.map((field) => {
              const id = `f-${field.key}`;
              const common = {
                id,
                value: values[field.key] ?? "",
                placeholder: field.placeholder,
                className: "field",
                "aria-describedby": field.hint ? `${id}-hint` : undefined,
              };
              return (
                <div key={field.key} className={field.wide || field.multiline ? "sm:col-span-2" : ""}>
                  <label htmlFor={id} className="field-label">
                    {field.label}
                    {field.required && <span className="text-saffron-600"> *</span>}
                  </label>
                  {field.multiline ? (
                    <textarea {...common} rows={3} onChange={(e) => setField(field.key, e.target.value)} />
                  ) : (
                    <input {...common} type={field.type ?? "text"} onChange={(e) => setField(field.key, e.target.value)} />
                  )}
                  {field.hint && (
                    <p id={`${id}-hint`} className="mt-1 text-xs text-slate-500 dark:text-slate-400">{field.hint}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={() => setValues({})}>
              <Eraser size={16} aria-hidden /> Clear
            </button>
            {!source.legal && !missing.length && (
              <>
                <button type="button" className="btn-secondary" onClick={() => exportFile("bibtex")}>
                  <Download size={16} aria-hidden /> BibTeX
                </button>
                <button type="button" className="btn-secondary" onClick={() => exportFile("ris")}>
                  <Download size={16} aria-hidden /> RIS
                </button>
              </>
            )}
          </div>
        </section>

        <section className="card h-fit p-6 lg:sticky lg:top-24" aria-label="Citation" aria-live="polite">
          <StylePicker value={styleId} onChange={setStyleId} />
          <p className="mt-2 mb-5 text-xs text-slate-500 dark:text-slate-400">{style.description}</p>
          <CitationOutput
            result={result}
            style={style}
            placeholder={missing.length ? `Still needed: ${missing.join(", ")}.` : undefined}
          />
          {source.legal && (
            <p className="mt-5 rounded-lg bg-saffron-500/10 px-3 py-2 text-xs text-saffron-600 dark:text-saffron-400">
              Indian cases and statutes are formatted by RefIndia's legal formatter, following ILI and OSCOLA conventions.
            </p>
          )}
          <button type="button" className="btn-ghost mt-4" onClick={() => setCompare((c) => !c)} disabled={!!missing.length}>
            <Layers size={16} aria-hidden /> {compare ? "Hide other styles" : "Compare all styles"}
          </button>
        </section>
      </div>

      {comparison.length > 0 && (
        <section className="card mt-6 divide-y divide-slate-200 dark:divide-slate-800" aria-label="All styles">
          {comparison.map(({ style: s, result: r }) =>
            r ? (
              <div key={s.id} className="grid gap-2 p-5 md:grid-cols-[10rem_1fr_auto] md:items-start">
                <strong className="text-sm text-brand-700 dark:text-saffron-400">{s.label}</strong>
                <p className="citation font-serif" dangerouslySetInnerHTML={{ __html: r.bibliography ?? r.citation }} />
                <CopyButton html={r.bibliography ?? r.citation} />
              </div>
            ) : null,
          )}
        </section>
      )}

      <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
        Always check citations against the rules of your university, journal or court.
      </p>
    </div>
  );
}
