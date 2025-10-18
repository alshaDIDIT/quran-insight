'use client';

import { useState } from 'react';
import { fetchChapterById } from '../Services/ChapterService';
import { Chapter } from '../Models/Chapters/Chapter';

export function useChapter() {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadChapterById = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchChapterById(id);

      if (result.success && result.data) {
        setChapter(result.data);
      } else {
        setError(result.error || `Failed to fetch chapter with ID ${id}`);
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    chapter,
    loading,
    error,
    loadChapterById
  };
}