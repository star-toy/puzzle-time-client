import Image from 'next/image';

import { getTheme } from '@/app/_libs/api/theme';
import type { IArtwork } from '@/app/_types/artwork';

export default async function GalleryPage() {
  const theme = await getTheme('123');
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-full overflow-x-auto">
        <div className="min-w-max flex flex-row items-end h-[450px]">
          {theme.artworks.map((artwork) => (
            <ArtworkBox key={artwork.artworkUid} artwork={artwork} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtworkBox({ artwork }: { artwork: IArtwork }) {
  return (
    <div key={artwork.artworkUid} className="relative pl-[100px] [&:last-child]:pr-[100px]">
      <Image src={artwork.imageUrl} alt={artwork.artworkUid} width={450} height={450} className="shadow-[10px_10px_10px_0px_rgba(0,0,0,0.251)]" />
    </div>
  );
}
