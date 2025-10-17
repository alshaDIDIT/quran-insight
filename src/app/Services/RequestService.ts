import axios, { AxiosResponse } from "axios";
import { getClientCredentials } from "../Auth/AccessTokenService";

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