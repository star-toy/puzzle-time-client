import mockData from '@/app/_mocks/artwork-puzzles.json';

import type { IArtworkDetail } from '@/app/_types/artwork';

// eslint-disable-next-line @typescript-eslint/require-await
export async function getArtwork(uid: string): Promise<IArtworkDetail> {
  console.log('getArtwork', uid);
  // 실제 API 호출로 교체될 부분
  return mockData;
}
