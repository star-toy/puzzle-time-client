import { createHttpClient } from '../http-client';

import type { IArtwork, IArtworkDetail } from '@/app/_types/artwork';
import { URLS } from '@/app/constants';

export async function fetchArtworkPuzzles(uid: string): Promise<IArtworkDetail> {
  const client = await createHttpClient();
  return client.get<IArtworkDetail>(URLS.fetchArtworkPuzzlesByUid(uid));
}

export async function fetchArtworkCompleted(): Promise<IArtwork[]> {
  const client = await createHttpClient();

  return client.get<IArtwork[]>(URLS.fetchArtworkCompleted());
}
