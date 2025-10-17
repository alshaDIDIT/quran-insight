'use server';

import { getAccessToken } from '../Auth/AccessTokenService';
import { makeAuthenticatedRequest } from './RequestService';

type Chapters = any;

const URL = process.env.QURAN_API_BASE_URL;
const PATH = '/chapters';
  
async function getChapters(
  accessToken: string
): Promise<Chapters | undefined> {
  const url = `${URL}${PATH}`;
  return await makeAuthenticatedRequest<Chapters>(url, accessToken);
}

async function getChapter(
  accessToken: string,
  id: number
): Promise<Chapters | undefined> {
  const url = `${URL}${PATH}/${id}`;
  return await makeAuthenticatedRequest<Chapters>(url, accessToken);
}

async function getChaptersWithAuth(): Promise<Chapters | undefined> {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error('Failed to obtain access token');
      return undefined;
    }

    return await getChapters(accessToken);
  } catch (error) {
    console.error('Error in getChaptersWithAuth:', error);
    return undefined;
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
