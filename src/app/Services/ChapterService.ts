import axios, { AxiosResponse } from 'axios';
import { GetChaptersResponse } from '../Models/Responses/GetChaptersResponse';
import { AuthTokenResponse } from '../Models/Auth/AuthTokenResponse';

// Configuration constants
const QURAN_AUTH_URL = process.env.QURAN_AUTH_URL || 'https://prelive-oauth2.quran.foundation/oauth2/token';
const QURAN_API_BASE_URL = process.env.QURAN_API_BASE_URL || 'https://apis-prelive.quran.foundation/content/api/v4';

// Helper function to get client credentials
function getClientCredentials() {
  const clientId = process.env.QURAN_CLIENT_ID;
  const clientSecret = process.env.QURAN_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing required environment variables: QURAN_CLIENT_ID or QURAN_CLIENT_SECRET');
  }

  return { clientId, clientSecret };
}

export async function getAccessToken(): Promise<string | undefined> {
  try {
    const { clientId, clientSecret } = getClientCredentials();
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response: AxiosResponse<AuthTokenResponse> = await axios({
      method: 'post',
      url: QURAN_AUTH_URL,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: 'grant_type=client_credentials&scope=content'
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    return undefined;
  }
}

export async function getChapters(
  accessToken: string
): Promise<GetChaptersResponse | undefined> {
  try {
    const { clientId } = getClientCredentials();

    const response: AxiosResponse<GetChaptersResponse> = await axios({
      method: 'get',
      url: `${QURAN_API_BASE_URL}/chapters`,
      headers: {
        'x-auth-token': accessToken,
        'x-client-id': clientId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return undefined;
  }
}

export async function getChaptersWithAuth(): Promise<GetChaptersResponse | undefined> {
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
