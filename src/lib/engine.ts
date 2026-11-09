import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-csl";
import "@citation-js/plugin-doi";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-ris";

import apa from "../csl/apa.csl?raw";
import harvard from "../csl/harvard-cite-them-right.csl?raw";
import ili from "../csl/journal-of-the-indian-law-institute.csl?raw";
import oscola from "../csl/oscola.csl?raw";
import mla from "../csl/modern-language-association.csl?raw";
import ieee from "../csl/ieee.csl?raw";
import chicagoNotes from "../csl/chicago-notes-bibliography.csl?raw";
import chicagoAuthorDate from "../csl/chicago-author-date.csl?raw";
import enGB from "../csl/locales-en-GB.xml?raw";

import { formatCase, formatStatute, toPlainText } from "./legal";
import { getSource, toCsl, type FormValues, type SourceType } from "./sources";
import type { CitationStyle } from "./styles";

const config = plugins.config.get("@csl");
config.locales.add("en-GB", enGB);
const templates: Record<string, string> = {
  apa,
  "harvard-cite-them-right": harvard,
  "journal-of-the-indian-law-institute": ili,
  oscola,
  "modern-language-association": mla,
  ieee,
  "chicago-notes-bibliography": chicagoNotes,
  "chicago-author-date": chicagoAuthorDate,
};
for (const [name, xml] of Object.entries(templates)) config.styles.add(name, xml);

export interface Formatted {
  /** HTML: footnote or in-text citation */
  citation: string;
  /** HTML: bibliography or reference-list entry, or null */
  bibliography: string | null;
}

function unwrapBibliography(html: string): string {
  // citation.js wraps entries in <div class="csl-bib-body"><div class="csl-entry">…</div></div>
  return html
    .replace(/<div class="csl-left-margin">(.*?)<\/div>\s*<div class="csl-right-inline">/s, "$1 ")
    .replace(/<\/?div[^>]*>/g, "")
    .trim();
}

/** Formats CSL-JSON items in a style. Each item is formatted on its own. */
export function formatCsl(items: Record<string, unknown>[], style: CitationStyle): Formatted[] {
  return items.map((item) => {
    const cite = new Cite(item);
    const options = { template: style.template, lang: style.locale, format: "html" };
    const citation = cite.format("citation", options).trim();
    let bibliography: string | null = null;
    if (style.hasBibliography) {
      try {
        bibliography = unwrapBibliography(cite.format("bibliography", options));
      } catch {
        bibliography = null;
      }
    }
    return { citation, bibliography };
  });
}

/**
 * Formats several items as one bibliography, so the style can sort and number them
 * (IEEE [1], [2]…). Footnote-only styles fall back to one footnote per item.
 */
export function formatList(items: Record<string, unknown>[], style: CitationStyle): string[] {
  if (!items.length) return [];
  if (!style.hasBibliography) return formatCsl(items, style).map((f) => f.citation);
  const html = new Cite(items).format("bibliography", { template: style.template, lang: style.locale, format: "html" });
  return html
    .split(/<div[^>]*\bclass="csl-entry"[^>]*>/)
    .slice(1)
    .map((entry) => unwrapBibliography(entry));
}

/** Formats a generator form in a style. */
export function formatForm(sourceId: string, values: FormValues, style: CitationStyle): Formatted {
  const source: SourceType = getSource(sourceId);
  if (source.id === "case") {
    return formatCase(
      { name: values.caseName ?? "", citation: values.citation ?? "", court: values.court, year: values.year, pinpoint: values.pinpoint },
      style.legal,
    );
  }
  if (source.id === "statute") {
    return formatStatute({ title: values.actTitle ?? "", actNumber: values.actNumber, section: values.section }, style.legal);
  }
  return formatCsl([toCsl(source, values)], style)[0];
}

/** Parses BibTeX, RIS, CSL-JSON, or one or more DOIs into CSL-JSON items. */
export async function parseInput(input: string): Promise<Record<string, unknown>[]> {
  const text = input.trim();
  const dois = text.match(/10\.\d{4,9}\/[^\s"<>]+/g);
  const looksLikeDoiList = dois && text.split(/\s+/).every((t) => /10\.\d{4,9}\//.test(t));
  const cite = await Cite.async(looksLikeDoiList ? dois : text);
  return cite.data as Record<string, unknown>[];
}

/** Exports CSL-JSON items as BibTeX or RIS. */
export function exportAs(items: Record<string, unknown>[], format: "bibtex" | "ris"): string {
  return new Cite(items).format(format, { format: "text" });
}

export { toPlainText };
