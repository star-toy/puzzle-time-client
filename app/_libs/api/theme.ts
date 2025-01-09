import { fetchWithAuth } from '@/app/_libs/http-client';
import type { IThemeDetail } from '@/app/_types/theme';
import { URLS } from '@/app/constants';

export async function fetchThemeWithArtworksByUid(themeUid: string): Promise<IThemeDetail> {
  const response = await fetchWithAuth(URLS.fetchThemeWithArtworksByUid(themeUid));
  return response.json() as Promise<IThemeDetail>;
}
