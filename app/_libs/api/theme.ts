import type { IThemeDetail } from '@/app/_types/theme';
import { URLS } from '@/app/constants';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

export async function fetchThemeWithArtworksByUid(themeUid: string): Promise<IThemeDetail> {
  const response = await fetch(`${API_URL}${URLS.fetchThemeWithArtworksByUid(themeUid)}`);
  return response.json() as Promise<IThemeDetail>;
}
