import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';

import type { ISavePuzzlePlaysRequest } from '@/app/_libs/api/puzzle';
import { createHttpClient } from '@/app/_libs/http-client';
import { URLS } from '@/app/constants';
import { auth } from '@/auth';

export const runtime = 'edge';

export async function POST(request: Request, { params }: { params: { uid: string[] } }) {
  const [puzzleUid] = params.uid;

  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;
  const url = !session?.accessToken ? URLS.saveGuestPuzzlePlays(puzzleUid) : URLS.saveUserPuzzlePlays(puzzleUid);

  const body = (await request.json()) as ISavePuzzlePlaysRequest;
  if (!body || body.isCompleted === undefined || body.puzzlePlayData === undefined) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  try {
    const client = await createHttpClient();
    const result = await client.post(url, {
      isCompleted: body.isCompleted,
      puzzlePlayData: body.puzzlePlayData,
      puzzleUid: body.puzzleUid,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to save puzzle play:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
