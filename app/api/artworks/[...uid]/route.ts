import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';

import { URLS } from '@/app/constants';
import { auth } from '@/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

export async function GET(request: Request, { params }: { params: Promise<{ uid: string[] }> }) {
  const token = request.headers.get('Authorization');
  const session = (await auth()) as Session & { accessToken: string };
  const { uid } = await params;
  const artworkUid = uid[0];

  const url = URLS.fetchArtworkPuzzlesByUidServer(artworkUid);
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${token || session.accessToken}`,
    },
  });
  return NextResponse.json(await response.json());
}
