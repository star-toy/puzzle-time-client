import artworksData from '@/app/_mocks/artworks.json';

import type { IArtwork } from '@/app/_types/artwork';

// eslint-disable-next-line @typescript-eslint/require-await
export async function getArtwork(uid: string): Promise<IArtwork> {
  // artworks.json에서 해당 uid의 artwork 찾기
  const artwork = artworksData.find((art: IArtwork) => art.artworkUid === uid);

  if (!artwork) {
    throw new Error(`Artwork not found with uid: ${uid}`);
  }

  return {
    ...artwork,
  };
}
