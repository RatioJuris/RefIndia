export type FieldKey =
  | "authors" | "editors" | "title" | "containerTitle" | "edition" | "publisher" | "place"
  | "year" | "month" | "day" | "volume" | "issue" | "pages" | "doi" | "url" | "accessed"
  | "genre" | "number"
  | "caseName" | "citation" | "court" | "pinpoint"
  | "actTitle" | "actNumber" | "section";

export interface FieldDef {
  key: FieldKey;
  label: string;
  placeholder?: string;
  hint?: string;
  multiline?: boolean;
  required?: boolean;
  wide?: boolean;
  type?: "text" | "date";
}

export type SourceId =
  | "case" | "statute" | "book" | "chapter" | "article" | "conference"
  | "thesis" | "report" | "webpage";

export interface SourceType {
  id: SourceId;
  label: string;
  group: "Legal" | "Academic" | "Other";
  /** Cases and statutes are formatted by RefIndia's Indian legal formatter. */
  legal: boolean;
  fields: FieldDef[];
}

const AUTHORS: FieldDef = {
  key: "authors", label: "Author(s)", multiline: true, wide: true,
  placeholder: "Seervai, H. M.\nLaw Commission of India",
  hint: "One per line: “Family, Given”. Organisations are kept as written; wrap a name in {braces} to keep it exactly.",
};
const TITLE: FieldDef = { key: "title", label: "Title", required: true, wide: true };
const YEAR: FieldDef = { key: "year", label: "Year", placeholder: "2024" };
const PUBLISHER: FieldDef = { key: "publisher", label: "Publisher" };
const PLACE: FieldDef = { key: "place", label: "Place of publication", placeholder: "New Delhi" };
const PAGES: FieldDef = { key: "pages", label: "Pages", placeholder: "151–180" };
const DOI: FieldDef = { key: "doi", label: "DOI", placeholder: "10.xxxx/xxxxx" };
const URL_FIELD: FieldDef = { key: "url", label: "URL", placeholder: "https://", wide: true };

export const SOURCE_TYPES: SourceType[] = [
  {
    id: "case", label: "Case law", group: "Legal", legal: true,
    fields: [
      { key: "caseName", label: "Case name", required: true, wide: true, placeholder: "Kesavananda Bharati v. State of Kerala", hint: "“v”, “v.”, “vs” and “versus” are written the way each style requires." },
      { key: "citation", label: "Reported citation", required: true, placeholder: "(1973) 4 SCC 225", hint: "As printed in the report: (2017) 10 SCC 1 · AIR 1973 SC 1461 · 2023 INSC 1 · 2019 SCC OnLine Del 1234" },
      { key: "court", label: "Court (optional)", placeholder: "SC / Del HC", hint: "Add when the report does not make the court clear." },
      { key: "year", label: "Year of decision (optional)", placeholder: "Taken from the citation if blank" },
      { key: "pinpoint", label: "Pinpoint (optional)", placeholder: "para 23", hint: "For OSCOLA, write paragraph pinpoints as [23]." },
    ],
  },
  {
    id: "statute", label: "Statute / Act", group: "Legal", legal: true,
    fields: [
      { key: "actTitle", label: "Short title with year", required: true, wide: true, placeholder: "The Information Technology Act, 2000" },
      { key: "actNumber", label: "Act number (optional)", placeholder: "21 of 2000", hint: "Used by ILI." },
      { key: "section", label: "Section(s) (optional)", placeholder: "43 or 66–66F" },
    ],
  },
  {
    id: "book", label: "Book", group: "Academic", legal: false,
    fields: [AUTHORS, TITLE, { key: "edition", label: "Edition", placeholder: "4" }, PUBLISHER, PLACE, YEAR, DOI],
  },
  {
    id: "chapter", label: "Book chapter", group: "Academic", legal: false,
    fields: [
      AUTHORS, { ...TITLE, label: "Chapter title" },
      { key: "editors", label: "Editor(s)", multiline: true, wide: true, placeholder: "Choudhry, Sujit\nKhosla, Madhav" },
      { key: "containerTitle", label: "Book title", required: true, wide: true },
      { key: "edition", label: "Edition" }, PUBLISHER, PLACE, YEAR, PAGES, DOI,
    ],
  },
  {
    id: "article", label: "Journal article", group: "Academic", legal: false,
    fields: [
      AUTHORS, TITLE,
      { key: "containerTitle", label: "Journal", required: true, wide: true, placeholder: "Journal of the Indian Law Institute" },
      YEAR, { key: "volume", label: "Volume" }, { key: "issue", label: "Issue" }, PAGES, DOI, URL_FIELD,
    ],
  },
  {
    id: "conference", label: "Conference paper", group: "Academic", legal: false,
    fields: [
      AUTHORS, TITLE,
      { key: "containerTitle", label: "Proceedings title", wide: true },
      PUBLISHER, PLACE, YEAR, PAGES, DOI, URL_FIELD,
    ],
  },
  {
    id: "thesis", label: "Thesis / dissertation", group: "Academic", legal: false,
    fields: [
      AUTHORS, TITLE,
      { key: "genre", label: "Type", placeholder: "PhD thesis / LLM dissertation" },
      { key: "publisher", label: "University", required: true },
      YEAR, { ...URL_FIELD, hint: "For example, the Shodhganga handle." },
    ],
  },
  {
    id: "report", label: "Government / institutional report", group: "Other", legal: false,
    fields: [
      { ...AUTHORS, placeholder: "Law Commission of India" }, TITLE,
      { key: "number", label: "Report number", placeholder: "Report No. 277" },
      { key: "publisher", label: "Issued by", placeholder: "Ministry of Law and Justice" },
      PLACE, YEAR, URL_FIELD,
    ],
  },
  {
    id: "webpage", label: "Web page", group: "Other", legal: false,
    fields: [
      AUTHORS, TITLE,
      { key: "containerTitle", label: "Website name", placeholder: "Press Information Bureau" },
      { key: "year", label: "Year published" }, { key: "month", label: "Month (1–12)" }, { key: "day", label: "Day" },
      { ...URL_FIELD, required: true },
      { key: "accessed", label: "Accessed on", type: "date" },
    ],
  },
];

export type FormValues = Partial<Record<FieldKey, string>>;

export function getSource(id: string): SourceType {
  return SOURCE_TYPES.find((s) => s.id === id) ?? SOURCE_TYPES[0];
}

const ORGANISATION = /\b(ministry|government|commission|court|university|institute|council|department|authority|board|committee|bank|association|society|organi[sz]ation|foundation|bureau|agency|tribunal|parliament|assembly|office|centre|center|trust|limited|ltd|inc)\b/i;

export interface CslName { family?: string; given?: string; literal?: string }

/** Parses one name per line: "Family, Given", "Given Family", an organisation, or {literal}. */
export function parseNames(text: string | undefined): CslName[] {
  return (text ?? "")
    .split(/\n|;/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const braced = line.match(/^\{(.+)\}$/);
      if (braced) return { literal: braced[1].trim() };
      if (line.includes(",")) {
        const [family, ...rest] = line.split(",");
        return { family: family.trim(), given: rest.join(",").trim() };
      }
      if (ORGANISATION.test(line)) return { literal: line };
      const parts = line.split(/\s+/);
      if (parts.length === 1) return { family: line };
      return { family: parts.pop()!, given: parts.join(" ") };
    });
}

function dateParts(year?: string, month?: string, day?: string) {
  const y = parseInt(year ?? "", 10);
  if (!y) return undefined;
  const parts = [y];
  const m = parseInt(month ?? "", 10);
  if (m >= 1 && m <= 12) {
    parts.push(m);
    const d = parseInt(day ?? "", 10);
    if (d >= 1 && d <= 31) parts.push(d);
  }
  return { "date-parts": [parts] };
}

const CSL_TYPE: Record<string, string> = {
  book: "book", chapter: "chapter", article: "article-journal", conference: "paper-conference",
  thesis: "thesis", report: "report", webpage: "webpage",
};

/** Builds a CSL-JSON item from the form, for non-legal source types. */
export function toCsl(source: SourceType, v: FormValues): Record<string, unknown> {
  const item: Record<string, unknown> = { id: "refindia", type: CSL_TYPE[source.id] ?? "document" };
  const set = (key: string, value: unknown) => {
    if (value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0)) item[key] = value;
  };
  set("author", parseNames(v.authors));
  set("editor", parseNames(v.editors));
  set("title", v.title?.trim());
  set("container-title", v.containerTitle?.trim());
  set("edition", v.edition?.trim());
  set("publisher", v.publisher?.trim());
  set("publisher-place", v.place?.trim());
  set("issued", dateParts(v.year, v.month, v.day));
  set("volume", v.volume?.trim());
  set("issue", v.issue?.trim());
  set("page", v.pages?.trim());
  set("DOI", v.doi?.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, ""));
  set("URL", v.url?.trim());
  set("genre", v.genre?.trim());
  set("number", v.number?.trim());
  if (v.accessed) {
    const [y, m, d] = v.accessed.split("-");
    set("accessed", dateParts(y, m, d));
  }
  return item;
}

/** Fills form values from a CSL-JSON item (used by Lookup → Generator). */
export function fromCsl(item: Record<string, any>): { source: SourceId; values: FormValues } {
  const typeMap: Record<string, SourceId> = {
    book: "book", chapter: "chapter", "article-journal": "article", "article-magazine": "article",
    "article-newspaper": "article", "paper-conference": "conference", thesis: "thesis",
    report: "report", webpage: "webpage", "post-weblog": "webpage",
  };
  const names = (list?: CslName[]) =>
    (list ?? []).map((n) => n.literal ?? [n.family, n.given].filter(Boolean).join(", ")).join("\n");
  const parts: number[] = item.issued?.["date-parts"]?.[0] ?? [];
  const containerTitle = Array.isArray(item["container-title"]) ? item["container-title"][0] : item["container-title"];
  return {
    source: typeMap[item.type] ?? "book",
    values: {
      authors: names(item.author),
      editors: names(item.editor),
      title: item.title ?? "",
      containerTitle: containerTitle ?? "",
      edition: item.edition ? String(item.edition) : "",
      publisher: item.publisher ?? "",
      place: item["publisher-place"] ?? "",
      year: parts[0] ? String(parts[0]) : "",
      month: parts[1] ? String(parts[1]) : "",
      day: parts[2] ? String(parts[2]) : "",
      volume: item.volume ? String(item.volume) : "",
      issue: item.issue ? String(item.issue) : "",
      pages: item.page ?? "",
      doi: item.DOI ?? "",
      url: item.URL ?? "",
      genre: item.genre ?? "",
      number: item.number ? String(item.number) : "",
    },
  };
}

/** Returns the labels of required fields that are still empty. */
export function missingRequired(source: SourceType, v: FormValues): string[] {
  return source.fields.filter((f) => f.required && !v[f.key]?.trim()).map((f) => f.label);
}
