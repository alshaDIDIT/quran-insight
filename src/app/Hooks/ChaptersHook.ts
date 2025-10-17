'use client';

import { useState } from 'react';
import { fetchChapters } from '../Services/ChapterService';
import { Chapters } from '../Models/Chapters';

export function useChapters() {
  const [chapters, setChapters] = useState<Chapters | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadChapters = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchChapters();
      
      if (result.success && result.data) {
        setChapters(result.data);
      } else {
        setError(result.error || 'Failed to fetch chapters');
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    chapters,
    loading,
    error,
    loadChapters
  };
}