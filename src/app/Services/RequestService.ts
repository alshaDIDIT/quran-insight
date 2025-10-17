import axios, { AxiosResponse } from "axios";
import { getAccessToken, getClientCredentials } from "../Auth/AccessTokenService";

export async function makeAuthenticatedRequest<T>(
  url: string,
  accessToken: string
): Promise<T | undefined> {
  try {
    const { clientId } = getClientCredentials();

    const response: AxiosResponse<T> = await axios({
      method: 'get',
      url: url,
      headers: {
        'x-auth-token': accessToken,
        'x-client-id': clientId,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error making request to ${url}:`, error);
    return undefined;
  }
}

export async function withAuth<T>(
  apiCall: (accessToken: string) => Promise<T | undefined>,
  errorContext: string
): Promise<T | undefined> {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error('Failed to obtain access token');
      return undefined;
    }

    return await apiCall(accessToken);
  } catch (error) {
    console.error(`Error in ${errorContext}:`, error);
    return undefined;
  }
}