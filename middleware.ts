import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';

import { refreshToken } from './app/_libs/api/auth';
import { URLS } from './app/constants';
import { auth, signOut, unstable_update } from './auth';

export async function middleware(request: NextRequest) {
  const moveToMainPage = () => NextResponse.redirect(new URL(URLS.getMainPage(), request.url));

  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;

  if (!session?.user) {
    const response2 = NextResponse.next();
    response2.cookies.delete('token');
    return response2;
  }

  try {
    const data = await refreshToken();

    const response2 = NextResponse.next();
    response2.cookies.set('token', data.appAccessToken);

    if (session) {
      session.accessToken = data.appAccessToken;
      session.refreshToken = data.user.refreshToken;
      await unstable_update(session);
    }

    return response2;
  } catch (error) {
    console.error('Token refresh failed:', error);
    session.accessToken = null;
    session.refreshToken = null;
    await unstable_update(session);
    const response2 = NextResponse.next();
    response2.cookies.delete('token');
    return response2;
  }
}

export const config = {
  matcher: ['/mypage/:path*', '/main', '/playground/:path*', '/artworks/:path*', '/puzzles/:path*'],
};
