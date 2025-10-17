import { AuthTokenResponse } from "@/app/Models/Auth/AuthTokenResponse";
import axios, { AxiosResponse } from "axios";

const QURAN_AUTH_URL = process.env.QURAN_AUTH_URL || 'https://oauth2.quran.foundation/oauth2/token';

export function getClientCredentials() {
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