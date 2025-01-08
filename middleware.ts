import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';

import { refreshToken } from './app/_libs/api/auth';
import { URLS } from './app/constants';
import { auth, unstable_update } from './auth';

const AUTH_REQUIRED_PATHS = ['/mypage'];

export async function middleware(request: NextRequest) {
  const moveToMainPage = () => NextResponse.redirect(new URL(URLS.getMainPage(), request.url));

  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;

  // 현재 경로가 인증이 필요한 페이지인지 확인
  const isAuthRequired = AUTH_REQUIRED_PATHS.some((path) => request.nextUrl.pathname.startsWith(path));

  if (!isAuthRequired) {
    return NextResponse.next();
  }
  if (!session?.user) {
    return moveToMainPage();
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
    return moveToMainPage();
  }
}

export const config = {
  matcher: ['/mypage/:path*'],
};
