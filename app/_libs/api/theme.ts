import { createHttpClient } from '@/app/_libs/http-client';
import type { IThemeDetail } from '@/app/_types/theme';

export async function fetchThemeWithArtworksByUid(themeUid: string): Promise<IThemeDetail> {
  const client = await createHttpClient();

  return client.get<IThemeDetail>(`/themes/${themeUid}/artworks`);
}
