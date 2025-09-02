// src/hooks/useSports.ts

import { useState, useEffect, useCallback } from "react";
import type { Sport } from "../types";
import api from "../services/api";

export function useSports() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<Sport[]>("/sports");
      setSports(response.data);
    } catch (err) {
      setError("Falha ao carregar a lista de esportes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSports();
  }, [fetchSports]);

  return { sports, loading, error };
}