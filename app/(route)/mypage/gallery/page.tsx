import Image from 'next/image';

import ArtworkBox from './_artwork-box';

import MypageNav from '@/app/_components/_nav/mypage';
import { getTheme } from '@/app/_libs/api/theme';

export default async function GalleryPage() {
  const theme = await getTheme('123');

  return (
    <div className="relative w-full h-full">
      <MypageNav activePage="gallery" />
      <ArtworkBox artworks={theme.artworks} />
      <Image src="/assets/mypage/christmas/gallery-shelf.png" alt="" width={1920} height={80} className="absolute bottom-[135px] left-0 z-10" />
    </div>
  );
}
