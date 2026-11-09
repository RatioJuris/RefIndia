import type { Formatted } from "../lib/engine";
import { bibliographyLabel, citationLabel, type CitationStyle } from "../lib/styles";
import CopyButton from "./CopyButton";

interface Props {
  result: Formatted | null;
  style: CitationStyle;
  placeholder?: string;
}

function Block({ label, html }: { label: string; html: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">{label}</h3>
        <CopyButton html={html} />
      </div>
      <p
        className="citation rounded-lg bg-slate-100 px-4 py-3 font-serif text-[1.05rem] leading-relaxed text-slate-900 dark:bg-slate-800 dark:text-slate-100"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export default function CitationOutput({ result, style, placeholder }: Props) {
  if (!result) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-700">
        {placeholder ?? "Fill in the required fields to see the citation."}
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <Block label={citationLabel(style)} html={result.citation} />
      {result.bibliography ? (
        <Block label={bibliographyLabel(style)} html={result.bibliography} />
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {style.label} is a footnote style without a separate bibliography format. Use the footnote above.
        </p>
      )}
    </div>
  );
}
