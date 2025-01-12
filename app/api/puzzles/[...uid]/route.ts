import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';

import { URLS } from '@/app/constants';
import { auth } from '@/auth';

export const runtime = 'edge';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

export async function GET(request: Request, { params }: { params: Promise<{ uid: string[] }> }) {
  const session = (await auth()) as Session & { accessToken: string };
  const { uid } = await params;
  const puzzleUid = uid[0];

  const token = request.headers.get('Authorization') || session.accessToken;
  const url = URLS.fetchPuzzleByUidServer(puzzleUid);
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`,
    },
  });
  return NextResponse.json(await response.json());
}
