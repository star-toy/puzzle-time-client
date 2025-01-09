import { Buffer } from 'buffer';
import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';

import type { ISavePuzzlePlaysRequest } from '@/app/_libs/api/puzzle';
import { fetchWithAuth } from '@/app/_libs/http-client';
import { URLS } from '@/app/constants';
import { auth } from '@/auth';

export const runtime = 'edge';

async function decryptData(privateKey: string, encryptedData: string): Promise<ISavePuzzlePlaysRequest> {
  const importedKey = await crypto.subtle.importKey(
    'pkcs8',
    Buffer.from(privateKey, 'base64'),
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['decrypt'],
  );

  const decryptedData = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, importedKey, Buffer.from(encryptedData, 'base64'));

  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(decryptedData)) as ISavePuzzlePlaysRequest;
}

export async function POST(request: Request, { params }: { params: Promise<{ uid: string[] }> }) {
  const { uid } = await params;
  const puzzleUid = uid[0];
  const privateKey = process.env.PUZZLE_PRIVATE_KEY;

  if (!privateKey) {
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;
  const url = !session?.accessToken ? URLS.saveGuestPuzzlePlays(puzzleUid) : URLS.saveUserPuzzlePlays(puzzleUid);

  const { encryptedData } = await request.json();

  try {
    const decryptedBody = await decryptData(privateKey, encryptedData as string);
    const result = await fetchWithAuth(url, {
      method: 'POST',
      body: JSON.stringify(decryptedBody),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to save puzzle play:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
