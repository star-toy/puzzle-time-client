import { redirect } from 'next/navigation';

import ResizeLayout from '../_components/_layouts/resize-layout';
import BGMProvider from '../_components/bgm-provider';
import { refreshToken as refreshTokenApi } from '../_libs/api/auth';
import { fetchWithAuth } from '../_libs/http-client';
import type { IThemeDetail } from '../_types/theme';
import { URLS } from '../constants';

// 크리스마스 theme 하나만 출시해서 임시로 하드코딩
const THEME_UID = '23bcf9f1-a487-11ef-9e7c-0237b5db447b';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const refreshToken = async () => {
    try {
      await refreshTokenApi();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      redirect(URLS.getRootPage())
    };
  }
  await refreshToken();

  const response = await fetchWithAuth(URLS.fetchThemeWithArtworksByUid(THEME_UID));
  const theme = await response.json() as IThemeDetail;

  return (
    <ResizeLayout>
      {theme && <BGMProvider url={theme.bgm.bgmUrl} />}
      {children}
    </ResizeLayout>
  );
}


