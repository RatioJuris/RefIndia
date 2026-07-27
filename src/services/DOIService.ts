/**
 * RefIndia
 * Copyright © 2026 RatioJuris
 * Licensed under The Open Journal License (TOJL)
 */

export interface DOIRecord {
  doi: string;
  title?: string;
  authors?: string[];
  publisher?: string;
  journal?: string;
  year?: number;
  volume?: string;
  issue?: string;
  pages?: string;
  url?: string;
}

export class DOIService {
  /**
   * Validate DOI format.
   */
  static isValid(doi: string): boolean {
    const pattern =
      /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;

    return pattern.test(doi.trim());
  }

  /**
   * Normalize DOI input.
   */
  static normalize(doi: string): string {
    return doi
      .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
      .trim();
  }

  /**
   * Future Crossref integration.
   */
  static async lookup(
    doi: string
  ): Promise<DOIRecord | null> {
    const normalized = this.normalize(doi);

    if (!this.isValid(normalized)) {
      return null;
    }

    // TODO:
    // Integrate Crossref API
    // Integrate DOI Registry
    // Integrate DataCite

    return {
      doi: normalized,
      title: "Sample Title",
      authors: ["Sample Author"],
      publisher: "Sample Publisher",
      year: 2026,
      url: `https://doi.org/${normalized}`,
    };
  }
}
