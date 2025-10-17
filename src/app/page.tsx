'use client';

import styles from "./page.module.css";
import { useEffect } from 'react';
import { useChapter } from "./Hooks/ChapterHook";
import { useChapters } from "./Hooks/ChaptersHook";

export default function Home() {
  const { 
    chapter,
    loading: chapterLoading,
    error: chapterError,
    loadChapterById
  } = useChapter();
  
  const { 
    chapters,
    loading: chaptersLoading,
    error: chaptersError,
    loadChapters
  } = useChapters();
  
  const loading = chapterLoading || chaptersLoading;
  const error = chapterError || chaptersError;

  useEffect(() => {
    loadChapterById(2);
    loadChapters();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Quran Insight</h1>
        {loading && <p>Loading chapters...</p>}

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {chapter && (
          <div>
            <p>
              <strong>Chapter {chapter.id}:</strong> {chapter.name_arabic}
              {chapter.translated_name && ` (${chapter.translated_name.name})`}
              {chapter.verses_count && ` - ${chapter.verses_count} verses`}
            </p>
          </div>
        )}
                
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
