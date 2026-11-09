import { Cite } from "@citation-js/core";
import "@citation-js/plugin-doi";

export interface LookupResult {
  /** Where the metadata came from, shown to the user */
  source: string;
  item: Record<string, unknown>;
}

export class NotFoundError extends Error {}

export function normaliseDoi(input: string): string | null {
  const match = input.trim().match(/10\.\d{4,9}\/\S+/);
  return match ? match[0].replace(/[.,;]+$/, "") : null;
}

export function normaliseIsbn(input: string): string | null {
  const digits = input.replace(/[^0-9Xx]/g, "").toUpperCase();
  if (digits.length === 13 && /^\d{13}$/.test(digits)) return isbn13Valid(digits) ? digits : null;
  if (digits.length === 10 && /^\d{9}[\dX]$/.test(digits)) return isbn10Valid(digits) ? digits : null;
  return null;
}

function isbn13Valid(isbn: string): boolean {
  const sum = isbn.split("").reduce((acc, ch, i) => acc + Number(ch) * (i % 2 === 0 ? 1 : 3), 0);
  return sum % 10 === 0;
}

function isbn10Valid(isbn: string): boolean {
  const sum = isbn.split("").reduce((acc, ch, i) => acc + (ch === "X" ? 10 : Number(ch)) * (10 - i), 0);
  return sum % 11 === 0;
}

/** Looks up a DOI through doi.org content negotiation (Crossref, DataCite, mEDRA…). */
export async function lookupDoi(input: string): Promise<LookupResult> {
  const doi = normaliseDoi(input);
  if (!doi) throw new Error("That does not look like a DOI. A DOI starts with “10.”, for example 10.1038/nature14539.");
  try {
    const cite = await Cite.async(doi);
    const item = cite.data[0] as Record<string, unknown> | undefined;
    if (!item) throw new NotFoundError();
    return { source: "doi.org", item };
  } catch {
    throw new NotFoundError(`No record was found for DOI ${doi}.`);
  }
}

const nameFromString = (name: string) => {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? { family: parts.pop()!, given: parts.join(" ") } : { literal: name.trim() };
};

const yearFrom = (text?: string) => {
  const match = text?.match(/\d{4}/);
  return match ? { "date-parts": [[Number(match[0])]] } : undefined;
};

async function fromOpenLibrary(isbn: string): Promise<LookupResult | null> {
  const res = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
  if (!res.ok) return null;
  const data = (await res.json())[`ISBN:${isbn}`];
  if (!data?.title) return null;
  return {
    source: "Open Library",
    item: {
      type: "book",
      title: data.subtitle ? `${data.title}: ${data.subtitle}` : data.title,
      author: (data.authors ?? []).map((a: { name: string }) => nameFromString(a.name)),
      publisher: data.publishers?.[0]?.name,
      "publisher-place": data.publish_places?.[0]?.name,
      issued: yearFrom(data.publish_date),
      ISBN: isbn,
    },
  };
}

async function fromGoogleBooks(isbn: string): Promise<LookupResult | null> {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  if (!res.ok) return null;
  const info = (await res.json()).items?.[0]?.volumeInfo;
  if (!info?.title) return null;
  return {
    source: "Google Books",
    item: {
      type: "book",
      title: info.subtitle ? `${info.title}: ${info.subtitle}` : info.title,
      author: (info.authors ?? []).map(nameFromString),
      publisher: info.publisher,
      issued: yearFrom(info.publishedDate),
      ISBN: isbn,
    },
  };
}

/** Looks up an ISBN in Open Library, then Google Books. */
export async function lookupIsbn(input: string): Promise<LookupResult> {
  const isbn = normaliseIsbn(input);
  if (!isbn) throw new Error("That is not a valid ISBN. Check the 10 or 13 digits, including the final check digit.");
  for (const source of [fromOpenLibrary, fromGoogleBooks]) {
    try {
      const result = await source(isbn);
      if (result) return result;
    } catch {
      // Try the next source.
    }
  }
  throw new NotFoundError(`No record was found for ISBN ${isbn} in Open Library or Google Books. You can still enter the details by hand.`);
}
