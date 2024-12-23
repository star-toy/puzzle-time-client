import ArtworkBox from './_artwork-box';

import MypageNav from '@/app/_components/_nav/mypage';
import { getTheme } from '@/app/_libs/api/theme';

export default async function GalleryPage() {
  const theme = await getTheme('123');

  return (
    <>
      <MypageNav activePage="gallery" />
      <ArtworkBox artworks={theme.artworks} />
    </>
  );
}
