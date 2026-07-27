/**
 * RefIndia
 * Copyright © 2026 RatioJuris
 * Licensed under The Open Journal License (TOJL)
 */

import { DOIService } from "./DOIService";
import { ISBNService } from "./ISBNService";
import { CrossRefService } from "./CrossRefService";
import { OpenLibraryService } from "./OpenLibraryService";
import { GoogleBooksService } from "./GoogleBooksService";

export type MetadataSource =
  | "DOI"
  | "ISBN"
  | "CrossRef"
  | "OpenLibrary"
  | "GoogleBooks";

export interface MetadataResult {
  source: MetadataSource;
  success: boolean;
  data: unknown;
  message?: string;
}

export class MetadataService {
  /**
   * Lookup metadata using a DOI.
   */
  static async lookupDOI(
    doi: string
  ): Promise<MetadataResult> {
    try {
      const data = await DOIService.lookup(doi);

      return {
        source: "DOI",
        success: !!data,
        data,
      };
    } catch (error) {
      return {
        source: "DOI",
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : "DOI lookup failed",
      };
    }
  }

  /**
   * Lookup metadata using an ISBN.
   */
  static async lookupISBN(
    isbn: string
  ): Promise<MetadataResult> {
    try {
      const data = await ISBNService.lookup(isbn);

      return {
        source: "ISBN",
        success: !!data,
        data,
      };
    } catch (error) {
      return {
        source: "ISBN",
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : "ISBN lookup failed",
      };
    }
  }

  /**
   * CrossRef search using DOI.
   */
  static async lookupCrossRef(
    doi: string
  ): Promise<MetadataResult> {
    try {
      const data =
        await CrossRefService.findByDOI(doi);

      return {
        source: "CrossRef",
        success: !!data,
        data,
      };
    } catch (error) {
      return {
        source: "CrossRef",
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : "CrossRef lookup failed",
      };
    }
  }

  /**
   * Open Library lookup using ISBN.
   */
  static async lookupOpenLibrary(
    isbn: string
  ): Promise<MetadataResult> {
    try {
      const data =
        await OpenLibraryService.findByISBN(
          isbn
        );

      return {
        source: "OpenLibrary",
        success: !!data,
        data,
      };
    } catch (error) {
      return {
        source: "OpenLibrary",
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : "Open Library lookup failed",
      };
    }
  }

  /**
   * Google Books lookup using ISBN.
   */
  static async lookupGoogleBooks(
    isbn: string
  ): Promise<MetadataResult> {
    try {
      const data =
        await GoogleBooksService.findByISBN(
          isbn
        );

      return {
        source: "GoogleBooks",
        success: !!data,
        data,
      };
    } catch (error) {
      return {
        source: "GoogleBooks",
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : "Google Books lookup failed",
      };
    }
  }

  /**
   * Unified lookup helper.
   */
  static async lookup(
    query: string,
    type: "doi" | "isbn"
  ): Promise<MetadataResult[]> {
    if (type === "doi") {
      return [
        await this.lookupDOI(query),
        await this.lookupCrossRef(query),
      ];
    }

    return [
      await this.lookupISBN(query),
      await this.lookupOpenLibrary(query),
      await this.lookupGoogleBooks(query),
    ];
  }
}
