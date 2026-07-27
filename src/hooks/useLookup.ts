/**
 * RefIndia
 * Copyright © 2026 RatioJuris
 * Licensed under The Open Journal License (TOJL)
 */

import { useCallback, useState } from "react";
import {
  MetadataResult,
  MetadataService,
} from "../services/MetadataService";

export type LookupType = "doi" | "isbn";

interface UseLookupState {
  loading: boolean;
  error: string | null;
  results: MetadataResult[];
}

export function useLookup() {
  const [state, setState] = useState<UseLookupState>({
    loading: false,
    error: null,
    results: [],
  });

  const lookup = useCallback(
    async (
      query: string,
      type: LookupType
    ) => {
      if (!query.trim()) {
        setState({
          loading: false,
          error: "Please enter a valid query.",
          results: [],
        });

        return;
      }

      try {
        setState({
          loading: true,
          error: null,
          results: [],
        });

        const results =
          await MetadataService.lookup(
            query,
            type
          );

        setState({
          loading: false,
          error: null,
          results,
        });
      } catch (error) {
        setState({
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Lookup failed.",
          results: [],
        });
      }
    },
    []
  );

  const clear = useCallback(() => {
    setState({
      loading: false,
      error: null,
      results: [],
    });
  }, []);

  return {
    loading: state.loading,
    error: state.error,
    results: state.results,
    lookup,
    clear,
  };
}
