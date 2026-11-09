/**
 * Indian legal citation formatter for cases and statutes.
 *
 * General-purpose CSL styles cannot express Indian law-report citations such as
 * "(1973) 4 SCC 225" or "AIR 1973 SC 1461", so RefIndia formats cases and
 * legislation itself, following ILI and OSCOLA conventions. Output is HTML
 * (case names in italics); use `toPlainText` for plain text.
 */

import type { LegalFamily } from "./styles.ts";

export interface CaseInput {
  /** Case name, e.g. "Kesavananda Bharati vs State of Kerala" */
  name: string;
  /** Citation as reported, e.g. "(1973) 4 SCC 225" or "AIR 1973 SC 1461" */
  citation: string;
  /** Optional court, e.g. "SC", "Del HC" */
  court?: string;
  /** Optional year of decision; taken from the citation when blank */
  year?: string;
  /** Optional pinpoint, e.g. "para 23" or "at 230" */
  pinpoint?: string;
}

export interface StatuteInput {
  /** Official short title including year, e.g. "Information Technology Act, 2000" */
  title: string;
  /** Optional Act number, e.g. "21 of 2000" */
  actNumber?: string;
  /** Optional provision, e.g. "43", "43A", "66–66F" */
  section?: string;
}

export interface LegalOutput {
  /** Footnote (note styles) or in-text citation (author-date and numeric styles) */
  citation: string;
  /** Bibliography / reference list entry, or null where the style has none */
  bibliography: string | null;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const clean = (s: string | undefined) => (s ?? "").replace(/\s+/g, " ").trim();

/** Normalises "vs", "vs.", "versus", "v" and "v." to the separator a style uses. */
export function normaliseVersus(name: string, separator: "v" | "v."): string {
  return clean(name).replace(/\s+(?:v|vs|versus)\.?\s+/gi, ` ${separator} `);
}

/** Extracts a four-digit year from a citation such as "(1973) 4 SCC 225" or "AIR 1973 SC 1461". */
export function yearFromCitation(citation: string): string {
  const match = citation.match(/\b(1[6-9]\d{2}|20\d{2})\b/);
  return match ? match[1] : "";
}

const endWithStop = (s: string) => (/[.?!]$/.test(s) ? s : `${s}.`);

function isRange(section: string): boolean {
  return /[,–—-]|\band\b/.test(section);
}

export function formatCase(input: CaseInput, family: LegalFamily): LegalOutput {
  const citation = escapeHtml(clean(input.citation));
  const court = clean(input.court) ? ` (${escapeHtml(clean(input.court))})` : "";
  const pin = escapeHtml(clean(input.pinpoint));
  const year = clean(input.year) || yearFromCitation(input.citation);
  const withV = escapeHtml(normaliseVersus(input.name, "v."));
  const withoutStop = escapeHtml(normaliseVersus(input.name, "v"));

  switch (family) {
    case "ili": {
      // Kesavananda Bharati v. State of Kerala, (1973) 4 SCC 225, para 23.
      const note = `<i>${withV}</i>, ${citation}${court}${pin ? `, ${pin}` : ""}`;
      return { citation: endWithStop(note), bibliography: null };
    }
    case "oscola": {
      // Kesavananda Bharati v State of Kerala (1973) 4 SCC 225 (SC) [23].
      const note = `<i>${withoutStop}</i> ${citation}${court}${pin ? ` ${pin}` : ""}`;
      return {
        citation: endWithStop(note),
        // Table of cases: no italics, no full stop, no pinpoint.
        bibliography: `${withoutStop} ${citation}${court}`,
      };
    }
    case "chicago-note": {
      const full = `<i>${withV}</i>, ${citation}${court}`;
      return { citation: endWithStop(`${full}${pin ? `, ${pin}` : ""}`), bibliography: endWithStop(full) };
    }
    case "bluebook": {
      // APA follows legal citation conventions for cases.
      return {
        citation: `(<i>${withV}</i>${year ? `, ${year}` : ""})`,
        bibliography: endWithStop(`<i>${withV}</i>, ${citation}${court || " (India)"}`),
      };
    }
    case "numeric":
      return { citation: "[1]", bibliography: endWithStop(`[1] <i>${withV}</i>, ${citation}${court}`) };
    case "author-date":
    default:
      return {
        citation: `(<i>${withV}</i>${year ? `, ${year}` : ""})`,
        bibliography: endWithStop(`<i>${withV}</i> ${citation}${court}`),
      };
  }
}

export function formatStatute(input: StatuteInput, family: LegalFamily): LegalOutput {
  const title = escapeHtml(clean(input.title));
  const actNumber = escapeHtml(clean(input.actNumber));
  const section = escapeHtml(clean(input.section));
  const range = section ? isRange(section) : false;

  switch (family) {
    case "ili": {
      // The Information Technology Act, 2000 (Act 21 of 2000), s. 43.
      const sec = section ? `, ${range ? "ss." : "s."} ${section}` : "";
      const no = actNumber ? ` (Act ${actNumber})` : "";
      return { citation: endWithStop(`${title}${no}${sec}`), bibliography: null };
    }
    case "oscola": {
      // Information Technology Act, 2000, s 43.
      const sec = section ? `, ${range ? "ss" : "s"} ${section}` : "";
      return { citation: endWithStop(`${title}${sec}`), bibliography: title };
    }
    case "bluebook": {
      const sec = section ? `, ${range ? "§§" : "§"} ${section}` : "";
      return { citation: `(${title})`, bibliography: endWithStop(`${title}${sec} (India)`) };
    }
    case "numeric": {
      const sec = section ? `, ${range ? "ss." : "s."} ${section}` : "";
      return { citation: "[1]", bibliography: endWithStop(`[1] ${title}${sec}`) };
    }
    case "chicago-note":
    case "author-date":
    default: {
      const sec = section ? `, ${range ? "ss." : "s."} ${section}` : "";
      const no = actNumber ? ` (Act ${actNumber})` : "";
      return {
        citation: family === "chicago-note" ? endWithStop(`${title}${no}${sec}`) : `(${title})`,
        bibliography: endWithStop(`${title}${no}${sec}`),
      };
    }
  }
}

export function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}
