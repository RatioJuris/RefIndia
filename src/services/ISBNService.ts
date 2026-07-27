/**
 * RefIndia
 * Copyright © 2026 RatioJuris
 * Licensed under The Open Journal License (TOJL)
 */

export interface ISBNRecord {
  isbn: string;
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  language?: string;
  pages?: number;
  description?: string;
  coverImage?: string;
}

export class ISBNService {
  /**
   * Remove spaces and dashes.
   */
  static normalize(isbn: string): string {
    return isbn.replace(/[-\s]/g, "").trim();
  }

  /**
   * Validate ISBN-10 or ISBN-13.
   */
  static isValid(isbn: string): boolean {
    const normalized = this.normalize(isbn);

    return (
      /^(?:\d{9}X|\d{10})$/i.test(normalized) ||
      /^\d{13}$/.test(normalized)
    );
  }

  /**
   * Detect ISBN type.
   */
  static getType(
    isbn: string
  ): "ISBN-10" | "ISBN-13" | "Unknown" {
    const normalized = this.normalize(isbn);

    if (/^(?:\d{9}X|\d{10})$/i.test(normalized)) {
      return "ISBN-10";
    }

    if (/^\d{13}$/.test(normalized)) {
      return "ISBN-13";
    }

    return "Unknown";
  }

  /**
   * Future metadata lookup.
   */
  static async lookup(
    isbn: string
  ): Promise<ISBNRecord | null> {
    const normalized = this.normalize(isbn);

    if (!this.isValid(normalized)) {
      return null;
    }

    // TODO:
    // Open Library API
    // Google Books API
    // National Library APIs

    return {
      isbn: normalized,
      title: "Sample Book Title",
      authors: ["Sample Author"],
      publisher: "Sample Publisher",
      publishedDate: "2026",
    };
  }
}
