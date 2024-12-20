import Image from 'next/image';

import { getTheme } from '@/app/_libs/api/theme';
import type { IArtwork } from '@/app/_types/artwork';

export default async function MypagePage() {
  const theme = await getTheme('123');
  return (
    <div className="w-full h-full overflow-x-auto">
      <div className="min-w-max flex flex-row items-end space-x-[100px] h-[680px]">
        {theme.artworks.map((artwork) => (
          <Easel key={artwork.artworkUid} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}

function Easel({ artwork }: { artwork: IArtwork }) {
  return (
    <div key={artwork.artworkUid} className="relative flex-shrink-0 w-[500px] h-[680px]">
      <Image src="/assets/mypage/christmas/easel.png" alt={artwork.artworkUid} width={500} height={680} className="w-[500px] h-[680px]" />
      <Image
        src={artwork.imageUrl}
        alt={artwork.artworkUid}
        width={450}
        height={450}
        className="absolute top-[87px] left-[50%] -translate-x-1/2 w-[450px] h-[450px]"
      />
    </div>
  );
}
