import { fetchVersesByPage } from "@/app/Services/VersesServices/ByPageServices";
import { useState } from "react";

export function useByPage() {
  const [verses, setVerses] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVersesByPage = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchVersesByPage(page);

      if (result.success && result.data) {
        setVerses(result.data);
      } else {
        setError(result.error || `Failed to fetch verses for page ${page}`);
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    verses,
    loading,
    error,
    loadVersesByPage
  };
}