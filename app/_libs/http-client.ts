import type { Session } from 'next-auth';

import type { IAuthToken } from '../_types/auth';
import { URLS } from '../constants';

import { auth, unstable_update } from '@/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;

  const newOptions = {
    ...options,
  };
  if (session?.accessToken) {
    newOptions.headers = {
      ...options.headers,
      Authorization: `Bearer ${session.accessToken}`,
      Cookie: `token=${session.accessToken}`,
    };
  }

  const response = await fetch(`${API_URL}${url}`, newOptions);

  const isAuthApi = url.startsWith('/api/auth/') || url.startsWith('/api/login');

  if (response.status === 401 && !isAuthApi) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const data: { code: string } = await response.json();
    if (data.code === 'ERR_TOKEN_REISSUE_REQUIRED') {
      const res = await fetchWithAuth(URLS.refreshToken());
      if (res.ok) {
        const newToken = (await res.json()) as IAuthToken;
        if (session) {
          session.accessToken = newToken.appAccessToken;
          session.refreshToken = newToken.user.refreshToken;
          unstable_update(session).catch((error) => {
            console.error('Error updating session:', error);
          });
          return fetchWithAuth(url, options);
        }
      } else {
        throw new Error('Failed to refresh token');
      }
    }
    if (session) {
      session.accessToken = null;
      session.refreshToken = null;
      unstable_update(session).catch((error) => {
        console.error('Error updating session:', error);
      });
    }
  } else {
    throw new Error('Session is null');
  }

  return response;
}
