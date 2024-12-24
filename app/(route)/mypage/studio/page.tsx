import Image from 'next/image';
import Link from 'next/link';

import MypageNav from '@/app/_components/_nav/mypage';
import { getTheme } from '@/app/_libs/api/theme';
import type { IArtwork } from '@/app/_types/artwork';
import { URLS } from '@/app/constants';

export default async function StudioPage() {
  const theme = await getTheme('123');
  return (
    <div className="w-full h-full overflow-x-auto">
      <MypageNav activePage="studio" />
      <div className="min-w-max flex flex-row items-end h-[680px]">
        {theme.artworks.map((artwork) => (
          <Easel key={artwork.artworkUid}>
            <ArtworkItem artwork={artwork} />
          </Easel>
        ))}
      </div>
    </div>
  );
}

function Easel({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-[100px] [&:last-child]:pr-[100px]">
      <div className="relative flex-shrink-0 w-[500px] h-[680px]">
        <Image src="/assets/mypage/christmas/easel.png" alt="" width={500} height={680} className="w-[500px] h-[680px]" />

        <div className="absolute top-[87px] left-[50%] -translate-x-1/2 w-[450px] h-[450px]">{children}</div>
      </div>
    </div>
  );
}

function ArtworkItem({ artwork }: { artwork: IArtwork }) {
  return (
    <Link href={URLS.getArtworkPageByUid(artwork.artworkUid)}>
      <Image
        src={artwork.imageUrl}
        alt={artwork.artworkUid}
        width={450}
        height={450}
        className="w-[450px] h-[450px] shadow-[10px_10px_10px_0px_rgba(0,0,0,0.251)]"
      />
    </Link>
  );
}
