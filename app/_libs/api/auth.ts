import { createHttpClient } from '../http-client';

import type { IAuthToken } from '@/app/_types/auth';
import { URLS } from '@/app/constants';

export async function refreshToken(): Promise<IAuthToken> {
  const client = await createHttpClient();
  return client.post<IAuthToken>(URLS.refreshToken(), null);
}
