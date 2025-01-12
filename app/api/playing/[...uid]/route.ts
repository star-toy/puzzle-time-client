import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';

import { decryptData } from '@/app/_utils/crypto';
import { URLS } from '@/app/constants';
import { auth } from '@/auth';

export const runtime = 'edge';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

export async function POST(request: Request, { params }: { params: Promise<{ uid: string[] }> }) {
  const { uid } = await params;
  const puzzlePlayUid = uid[0];
  const privateKey = process.env.PUZZLE_PRIVATE_KEY;

  if (!privateKey) {
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;

  const encryptedData = await request.json();
  const decryptedData = await decryptData(privateKey, encryptedData as string);
  try {
    const url = `${API_URL}${URLS.saveUserPuzzlePlays(puzzlePlayUid)}`;
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${session?.accessToken}`,
      },
      body: JSON.stringify(decryptedData),
    });

    return NextResponse.json(await result.json());
  } catch (error) {
    console.error('Failed to save puzzle play:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
