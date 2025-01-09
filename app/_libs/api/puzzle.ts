import { fetchWithAuth } from '../http-client';

import type { IPuzzle, IPuzzlePlay } from '@/app/_types/puzzle';
import { URLS } from '@/app/constants';

export async function fetchPuzzle(uid: string): Promise<IPuzzle> {
  const response = await fetchWithAuth(URLS.fetchPuzzleByUid(uid));
  return response.json() as Promise<IPuzzle>;
}

export interface ISavePuzzlePlaysRequest {
  isCompleted: boolean;
  puzzlePlayData: string;
  puzzleUid: string;
}

export async function saveUserPuzzlePlays(puzzlePlayUid: string, data: ISavePuzzlePlaysRequest) {
  const response = await fetchWithAuth(URLS.saveUserPuzzlePlays(puzzlePlayUid), {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json() as Promise<IPuzzlePlay>;
}
