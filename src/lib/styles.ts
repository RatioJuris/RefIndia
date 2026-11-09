export type StyleKind = "author-date" | "note" | "numeric";
export type LegalFamily = "ili" | "oscola" | "chicago-note" | "bluebook" | "author-date" | "numeric";

export interface CitationStyle {
  id: string;
  label: string;
  description: string;
  /** CSL template name registered with citation.js */
  template: string;
  locale: "en-US" | "en-GB";
  kind: StyleKind;
  /** Whether the style defines a bibliography / reference list. */
  hasBibliography: boolean;
  /** How Indian cases and statutes are written in this style. */
  legal: LegalFamily;
}

export const STYLES: CitationStyle[] = [
  {
    id: "ili",
    label: "ILI",
    description: "Indian Law Institute (Journal of the Indian Law Institute)",
    template: "journal-of-the-indian-law-institute",
    locale: "en-US",
    kind: "note",
    hasBibliography: false,
    legal: "ili",
  },
  {
    id: "oscola",
    label: "OSCOLA",
    description: "Oxford University Standard for the Citation of Legal Authorities, 4th edition",
    template: "oscola",
    locale: "en-GB",
    kind: "note",
    hasBibliography: true,
    legal: "oscola",
  },
  {
    id: "apa",
    label: "APA 7th",
    description: "American Psychological Association, 7th edition",
    template: "apa",
    locale: "en-US",
    kind: "author-date",
    hasBibliography: true,
    legal: "bluebook",
  },
  {
    id: "harvard",
    label: "Harvard",
    description: "Cite Them Right Harvard, 12th edition",
    template: "harvard-cite-them-right",
    locale: "en-GB",
    kind: "author-date",
    hasBibliography: true,
    legal: "author-date",
  },
  {
    id: "mla",
    label: "MLA 9th",
    description: "MLA Handbook, 9th edition",
    template: "modern-language-association",
    locale: "en-US",
    kind: "author-date",
    hasBibliography: true,
    legal: "author-date",
  },
  {
    id: "ieee",
    label: "IEEE",
    description: "IEEE Reference Guide",
    template: "ieee",
    locale: "en-US",
    kind: "numeric",
    hasBibliography: true,
    legal: "numeric",
  },
  {
    id: "chicago-notes",
    label: "Chicago (notes)",
    description: "Chicago Manual of Style, 18th edition, notes and bibliography",
    template: "chicago-notes-bibliography",
    locale: "en-US",
    kind: "note",
    hasBibliography: true,
    legal: "chicago-note",
  },
  {
    id: "chicago-author-date",
    label: "Chicago (author-date)",
    description: "Chicago Manual of Style, 18th edition, author-date",
    template: "chicago-author-date",
    locale: "en-US",
    kind: "author-date",
    hasBibliography: true,
    legal: "author-date",
  },
];

export function getStyle(id: string): CitationStyle {
  return STYLES.find((s) => s.id === id) ?? STYLES[0];
}

export function citationLabel(style: CitationStyle): string {
  return style.kind === "note" ? "Footnote" : "In-text citation";
}

export function bibliographyLabel(style: CitationStyle): string {
  if (style.id === "mla") return "Works Cited entry";
  if (style.kind === "note") return "Bibliography entry";
  return "Reference list entry";
}
