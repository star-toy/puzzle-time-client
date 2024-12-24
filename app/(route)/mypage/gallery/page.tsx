import Image from 'next/image';

import ArtworkBox from './_artwork-box';

import MypageNav from '@/app/_components/_nav/mypage';
import { fetchThemeWithArtworksByUid } from '@/app/_libs/api/theme';

const THEME_UID = '23bcf9f1-a487-11ef-9e7c-0237b5db447b';

export default async function GalleryPage() {
  const theme = await fetchThemeWithArtworksByUid(THEME_UID);

  return (
    <div className="relative w-full h-full">
      <MypageNav activePage="gallery" />
      <ArtworkBox artworks={theme.artworks} />
      <Image src="/assets/mypage/christmas/gallery-shelf.png" alt="" width={1920} height={80} className="absolute bottom-[135px] left-0 z-10" />
    </div>
  );
}
