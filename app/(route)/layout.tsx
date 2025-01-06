import ResizeLayout from '../_components/_layouts/resize-layout';
import BGMProvider from '../_components/bgm-provider';
import { fetchThemeWithArtworksByUid } from '../_libs/api/theme';

// 크리스마스 theme 하나만 출시해서 임시로 하드코딩
const THEME_UID = '23bcf9f1-a487-11ef-9e7c-0237b5db447b';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const theme = await fetchThemeWithArtworksByUid(THEME_UID);
  return (
    <ResizeLayout>
      <BGMProvider url={theme.bgm.bgmUrl} />
      {children}
    </ResizeLayout>
  );
}
