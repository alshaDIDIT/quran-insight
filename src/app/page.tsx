'use client';

import styles from "./page.module.css";
import { useEffect } from 'react';
import { useChapter } from "./Hooks/ChapterHook";
import { useChapters } from "./Hooks/ChaptersHook";
import { useChapterInfo } from "./Hooks/ChapterInfoHook";
import { useByPage } from "./Hooks/VersesHooks/ByPageHook";

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

  const {
    chapterInfo,
    loading: chapterInfoLoading,
    error: chapterInfoError,
    loadChapterInfoById
  } = useChapterInfo();

  const {
    verses,
    loading: versesLoading,
    error: versesError,
    loadVersesByPage
  } = useByPage();

  const loading = 
    chapterLoading 
    || chaptersLoading 
    || chapterInfoLoading
    || versesLoading;
  
  const error = 
    chapterError
    || chaptersError
    || chapterInfoError
    || versesError;

  useEffect(() => {
    loadChapterById(2);
    loadChapters();
    loadChapterInfoById(2)
    loadVersesByPage(1);
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

        {chapterInfo && (
          <div>
            <h2>Chapter Info</h2>
            <p>
              <strong>Chapter {chapterInfo.chapter_id} Info:</strong> {chapterInfo.short_text}
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
