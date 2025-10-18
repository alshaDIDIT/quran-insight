'use server';

import { Verse } from "@/app/Models/Verses/Verses";
import { makeAuthenticatedRequest, withAuth } from "../RequestService";

const URL = process.env.QURAN_API_BASE_URL;

async function getVersesByPage(
    accessToken: string,
    page: number
): Promise<any> {
    const url = `${URL}/verses/by_page/${page}`;
    return await makeAuthenticatedRequest<Verse>(url, accessToken);
}

export async function fetchVersesByPage(page: number): Promise<{
  success: boolean;
  data?: Verse;
  error?: string;
}> {
  try {
    const verses = await withAuth(
      (accessToken) => getVersesByPage(accessToken, page),
      'getVersesWithAuth'
    );
    
    console.log('Fetched verses data:', verses);

    if (verses) {
      return { success: true, data: verses };
    } else {
      return { success: false, error: 'Failed to fetch verses' };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}