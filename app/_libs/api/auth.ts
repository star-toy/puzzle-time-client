import type { Session } from 'next-auth';

import type { IAuthToken } from '@/app/_types/auth';
import { URLS } from '@/app/constants';
import { auth, signOut, unstable_update } from '@/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

export async function refreshToken(): Promise<IAuthToken> {
  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;
  const response = await fetch(`${API_URL}${URLS.refreshToken()}`, {
    method: 'POST',
    headers: {
      Cookie: `token=${session?.accessToken}`,
      // Cookie: `token=${session?.refreshToken}`,
    },
  });
  if (!response.ok) {
    const data: { code: string } = await response.json();
    // if (data.code === 'ERR_TOKEN_REISSUE_REQUIRED') {
    // }
    console.log(333333, data, session);
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
  console.log(444444, token);
  if (session) {
    session.accessToken = token.appAccessToken;
    session.refreshToken = token.user.refreshToken;
    unstable_update(session).catch((error) => {
      console.error('Error updating session:', error);
    });
  }
  return token;
}
