import type { Session } from 'next-auth';

import { fetchWithAuth } from '@/app/_libs/http-client';
import type { IAuthToken } from '@/app/_types/auth';
import { URLS } from '@/app/constants';
import { auth, unstable_update } from '@/auth';

export async function refreshToken(): Promise<IAuthToken> {
  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;
  const response = await fetchWithAuth(URLS.refreshToken());
  if (!response.ok) {
    if (session) {
      session.accessToken = null;
      session.refreshToken = null;
      unstable_update(session).catch((error) => {
        console.error('Error updating session:', error);
      });
    }
    throw new Error('Failed to refresh token');
  }
  const token = (await response.json()) as IAuthToken;
  if (session) {
    session.accessToken = token.appAccessToken;
    session.refreshToken = token.user.refreshToken;
    unstable_update(session).catch((error) => {
      console.error('Error updating session:', error);
    });
  }
  return token;
}
