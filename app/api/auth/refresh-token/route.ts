import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';

import { refreshTokenApi } from '@/app/_libs/api/auth';
import { auth, unstable_update } from '@/auth';

export const runtime = 'edge';

export async function POST(request: Request) {
  const data: { refreshToken?: string } = await request.json();
  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;
  const refreshToken = data.refreshToken ?? session?.accessToken;
  try {
    const token = await refreshTokenApi(refreshToken || '');
    await unstable_update({
      ...session,
      accessToken: token.appAccessToken,
      refreshToken: token.user.refreshToken,
    });
    return NextResponse.json({
      accessToken: token.appAccessToken,
      refreshToken: token.user.refreshToken,
    });
  } catch (error) {
    await unstable_update({
      ...session,
      accessToken: null,
      refreshToken: null,
    });
    return NextResponse.json({ error: 'Failed to refresh token' }, { status: 401 });
  }
}
