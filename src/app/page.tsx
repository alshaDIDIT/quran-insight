'use client';

import styles from "./page.module.css";
import { useEffect, useState } from 'react';
import { fetchChapters } from './Services/ChapterService';

type Chapter = {
  id: number;
  name_arabic: string;
  translated_name?: { name: string } | null;
  verses_count?: number | null;
};

type Chapters = {
  chapters: Chapter[];
};

export default function Home() {
  const [chapters, setChapters] = useState<Chapters | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadChapters() {
      try {
        setLoading(true);
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
    }

    loadChapters();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Quran Insight</h1>
        
        {loading && <p>Loading chapters...</p>}
        
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {chapters && chapters.chapters && (
          <div>
            <h2>Chapters ({chapters.chapters.length})</h2>
            {chapters.chapters.map((chapter) => (
              <p key={chapter.id}>
                <strong>Chapter {chapter.id}:</strong> {chapter.name_arabic}
                {chapter.translated_name && ` (${chapter.translated_name.name})`}
                {chapter.verses_count && ` - ${chapter.verses_count} verses`}
              </p>
            ))}
          </div>
        )}
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
