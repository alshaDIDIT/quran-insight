'use server';

import { GetChaptersResponse } from './Models/Responses/GetChaptersResponse';
import { getChaptersWithAuth } from './Services/ChapterService';

export async function fetchChapters(): Promise<{
  success: boolean;
  data?: GetChaptersResponse;
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