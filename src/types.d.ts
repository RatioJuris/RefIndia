/// <reference types="vite/client" />

declare module "@citation-js/core" {
  export class Cite {
    constructor(data?: unknown, options?: Record<string, unknown>);
    static async(data: unknown, options?: Record<string, unknown>): Promise<Cite>;
    data: Record<string, unknown>[];
    format(format: string, options?: Record<string, unknown>): string;
  }
  export const plugins: {
    config: {
      get(name: string): {
        styles: { add(name: string, xml: string): void; has(name: string): boolean };
        locales: { add(name: string, xml: string): void; has(name: string): boolean };
      };
    };
  };
}

declare module "@citation-js/plugin-csl";
declare module "@citation-js/plugin-doi";
declare module "@citation-js/plugin-bibtex";
declare module "@citation-js/plugin-ris";
