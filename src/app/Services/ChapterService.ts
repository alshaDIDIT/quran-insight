'use server';

import { makeAuthenticatedRequest, withAuth } from './RequestService';

type Chapters = any;

const URL = process.env.QURAN_API_BASE_URL;
const PATH = '/chapters';

async function getChapter(
  accessToken: string,
  id: number
): Promise<Chapters | undefined> {
  const url = `${URL}${PATH}/${id}`;
  return await makeAuthenticatedRequest<Chapters>(url, accessToken);
}
  
async function getChapters(
  accessToken: string
): Promise<Chapters | undefined> {
  const url = `${URL}${PATH}`;
  return await makeAuthenticatedRequest<Chapters>(url, accessToken);
}

async function getChapterWithAuth(id: number): Promise<Chapters | undefined> {
  return await withAuth(
    (accessToken) => getChapter(accessToken, id),
    'getChapterWithAuth'
  );
}

async function getChaptersWithAuth(): Promise<Chapters | undefined> {
  return await withAuth(
    (accessToken) => getChapters(accessToken),
    'getChaptersWithAuth'
  );
}

async function fetchChapterById(id: number): Promise<{
  success: boolean;
  data?: Chapters;
  error?: string;
}> {
  try {
    const chapter = await getChapterWithAuth(id);
    if (chapter) {
      return { success: true, data: chapter };
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
    const chapters = await getChaptersWithAuth();
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
