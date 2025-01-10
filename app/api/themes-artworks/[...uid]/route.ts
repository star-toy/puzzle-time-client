import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';

import { refreshTokenApi } from '@/app/_libs/api/auth';
import type { IAuthToken } from '@/app/_types/auth';
import { URLS } from '@/app/constants';
import { auth, unstable_update } from '@/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

export async function GET(request: Request, { params }: { params: Promise<{ uid: string[] }> }) {
  const { uid } = await params;
  const themeUid = uid[0];
  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;

  const fetchThemeWithArtworks = async (accessToken: string) => {
    const url = `${API_URL}${URLS.fetchThemeWithArtworksByUid(themeUid)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Cookie: accessToken ? `token=${accessToken}` : '',
      },
    });
    return response;
  };

  const response = await fetchThemeWithArtworks(session?.accessToken || '');

  if (response.status === 401) {
    let token: IAuthToken | null = null;
    try {
      token = await refreshTokenApi(session?.accessToken || '');
      await unstable_update({
        ...session,
        accessToken: token.appAccessToken,
        refreshToken: token.user.refreshToken,
      });
    } catch (error) {
      console.error('Refresh token failed:', error);
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const response2 = await fetchThemeWithArtworks(token?.appAccessToken || '');
    return NextResponse.json(await response2.json(), { status: response2.status });
  }

  const data = await response.json();
  console.log('data', data);
  return NextResponse.json(data, { status: response.status });
}
