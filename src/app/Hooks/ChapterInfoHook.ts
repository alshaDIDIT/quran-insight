'use client';

import { useState } from 'react';
import { fetchChapterInfoById } from '../Services/ChapterService';
import { ChapterInfo } from '../Models/ChapterInfo';

export function useChapterInfo() {
  const [chapterInfo, setChapterInfo] = useState<ChapterInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadChapterInfoById = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchChapterInfoById(id);

      if (result.success && result.data) {
        console.log('Fetched chapter info:', result.data);
        console.log('Chapter info properties:', Object.keys(result.data));
        setChapterInfo(result.data);
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
    chapterInfo,
    loading,
    error,
    loadChapterInfoById
  };
}