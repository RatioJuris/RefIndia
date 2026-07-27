/**
 * RefIndia
 * Copyright © 2026 RatioJuris
 * Licensed under The Open Journal License (TOJL)
 */

export interface CitationData {*  author: string;
  title: string;*  publisher: string;
  year: strin*;
}

export type CitationStyle =
 *| "APA 7th"
  | "Harvard"
  | "ILI*
  | "Oxford (OSCOLA)"
  | "MLA 9t*"
  | "IEEE"
  | "Chicago";

expor* class GeneratorService {
  static*generate(
    style: CitationStyle*
    data: CitationData
  ): strin* {
    const { author, title, publ*sher, year } = data;

    switch (*tyle) {
      case "APA 7th":
    *   return `${author} (${year}). ${*itle}. ${publisher}.`;

      case*"Harvard":
        return `${autho*} (${year}) ${title}. ${publisher}*`;

      case "ILI":
        retu*n `${author}, ${title} (${publishe*}, ${year}).`;

      case "Oxford*(OSCOLA)":
        return `${autho*}, ${title} (${publisher} ${year})*`;

      case "MLA 9th":
        *eturn `${*uthor*. ${title}. ${publisher}, ${year*.`;

      case "IEEE":
        re*urn `${author}, "${title}," ${publ*sher}, ${year}.`;

      case "Chi*ago":
        return `${author}. $*title}. ${publisher}, ${year}.`;

*     default:
        return "";
 *  }
  }
}
