'use server';

import { makeAuthenticatedRequest, withAuth } from './RequestService';
import { Chapter } from '../Models/Chapters/Chapter';
import { Chapters } from '../Models/Chapters/Chapters';
import { ChapterInfo } from '../Models/Chapters/ChapterInfo';

const URL = process.env.QURAN_API_BASE_URL;
const PATH = '/chapters';

async function getChapter(
  accessToken: string,
  id: number
): Promise<Chapter | undefined> {
  const url = `${URL}${PATH}/${id}`;
  return await makeAuthenticatedRequest<Chapter>(url, accessToken);
}

async function getChapters(
  accessToken: string
): Promise<Chapters | undefined> {
  const url = `${URL}${PATH}`;
  return await makeAuthenticatedRequest<Chapters>(url, accessToken);
}

async function getChapterInfo(
  accessToken: string,
  id: number
): Promise<ChapterInfo | undefined> {
  const url = `${URL}${PATH}/${id}/info`;
  return await makeAuthenticatedRequest<ChapterInfo>(url, accessToken);
}

export async function fetchChapterById(id: number): Promise<{
  success: boolean;
  data?: Chapter;
  error?: string;
}> {
  try {
    const chapter = await withAuth(
      (accessToken) => getChapter(accessToken, id),
      'getChapterWithAuth'
    );

    if (chapter) {
      return { success: true, data: (chapter as any).chapter || chapter };
    } else {
      return { success: false, error: 'Failed to fetch chapter' };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function fetchChapters(): Promise<{
  success: boolean;
  data?: Chapters;
  error?: string;
}> {
  try {
    const chapters = await withAuth(
      (accessToken) => getChapters(accessToken),
      'getChaptersWithAuth'
    );

    if (chapters) {
      return { success: true, data: chapters };
    } else {
      return { success: false, error: 'Failed to fetch chapters' };
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export async function fetchChapterInfoById(id: number): Promise<{
  success: boolean;
  data?: ChapterInfo;
  error?: string;
}> {
  try {
    const chapterInfo = await withAuth(
      (accessToken) => getChapterInfo(accessToken, id),
      'getChapterInfoWithAuth'
    );

    if (chapterInfo) {
      return { success: true, data: (chapterInfo as any).chapter_info || chapterInfo };
    } else {
      return { success: false, error: 'Failed to fetch chapter info' };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
