import { createHttpClient } from '../http-client';

import type { IPuzzle } from '@/app/_types/puzzle';
import { URLS } from '@/app/constants';

export async function fetchPuzzle(uid: string): Promise<IPuzzle> {
  const client = await createHttpClient();
  return client.get<IPuzzle>(URLS.fetchPuzzleByUid(uid));
}

export interface ISavePuzzlePlaysRequest {
  isCompleted: boolean;
  puzzlePlayData: string;
  puzzleUid: string;
}

export async function saveUserPuzzlePlays(puzzlePlayUid: string, data: ISavePuzzlePlaysRequest) {
  const client = await createHttpClient();
  return client.post(URLS.saveUserPuzzlePlays(puzzlePlayUid), data);
}
